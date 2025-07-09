import { useState, useMemo, useCallback, useEffect } from "react";
import { catalogProducts } from "../../CatalogData";

export const useCatalogLogic = () => {
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "snacks", name: "Snacks" },
    { id: "bebidas", name: "Bebidas" },
    { id: "utiles", name: "Útiles" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = useMemo(() => {
    let filtered = catalogProducts;

    if (searchTerm.trim()) {
      const searchNormalized = normalizeText(searchTerm.trim());
      filtered = filtered.filter((product) => {
        const name = normalizeText(product.name);
        const description = normalizeText(product.description);
        const category = normalizeText(product.category);
        const searchWords = searchNormalized.split(" ");
        const wordMatch = searchWords.some(
          (word) =>
            name.includes(word) ||
            description.includes(word) ||
            category.includes(word)
        );
        return (
          name.includes(searchNormalized) ||
          description.includes(searchNormalized) ||
          category.includes(searchNormalized) ||
          wordMatch
        );
      });
    }

    if (selectedCategory !== "todos") {
      const categoryName = categories.find(
        (c) => c.id === selectedCategory
      )?.name;
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const popularProducts = filteredProducts.filter((p) => p.isPopular);
  const newProducts = filteredProducts.filter((p) => p.isNew);
  const allProducts = filteredProducts.filter((p) => !p.isPopular && !p.isNew);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];

    const suggestions = new Set();
    const searchLower = searchTerm.toLowerCase();

    catalogProducts.forEach((product) => {
      if (product.name.toLowerCase().includes(searchLower))
        suggestions.add(product.name);
      if (product.category.toLowerCase().includes(searchLower))
        suggestions.add(product.category);
    });

    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm]);

  const getDisplayedProducts = (products, showAll, defaultCount = 2) =>
    showAll ? products : products.slice(0, defaultCount);

  const handleAddToCart = useCallback((productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === productId);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const product = catalogProducts.find((p) => p.id === productId);
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // <- 👈 esto es lo importante

    setAddedItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 1000);
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchSuggestions(value.length >= 2);
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        setSearchHistory((prev) => {
          const newHistory = [
            searchTerm.trim(),
            ...prev.filter((item) => item !== searchTerm.trim()),
          ];
          return newHistory.slice(0, 5);
        });
      }
      setShowSearchSuggestions(false);
    },
    [searchTerm]
  );

  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);
    setSearchHistory((prev) => {
      const newHistory = [
        suggestion,
        ...prev.filter((item) => item !== suggestion),
      ];
      return newHistory.slice(0, 5);
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setShowSearchSuggestions(false);
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("todos");
    setShowSearchSuggestions(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowSearchSuggestions(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const totalResults = filteredProducts.length;

  return {
    // estados
    searchTerm,
    selectedCategory,
    showAllPopular,
    showAllNew,
    showAllProducts,
    addedItems,
    searchHistory,
    showSearchSuggestions,
    categories,
    // productos
    popularProducts,
    newProducts,
    allProducts,
    filteredProducts,
    searchSuggestions,
    totalResults,
    // funciones
    setSelectedCategory,
    setShowAllPopular,
    setShowAllNew,
    setShowAllProducts,
    getDisplayedProducts,
    handleAddToCart,
    handleSearchChange,
    handleSearchSubmit,
    handleSuggestionClick,
    clearSearch,
    resetAllFilters,
    setShowSearchSuggestions,
  };
};
