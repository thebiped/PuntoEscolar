import { useState, useMemo, useCallback, useEffect } from "react";
import { catalogProducts } from "../../CatalogData";
import { getProductos } from "../../../services/productos";
import axios from "axios";

export const useCatalogLogic = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(catalogProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Traer categorías desde backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://localhost:8000/api/productos/categorias/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories([{ id: "todos", nombre: "Todos" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Función para recargar productos desde el backend manualmente
  const refetchProductos = useCallback(() => {
    getProductos()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Error al cargar productos del backend:", err);
      });
  }, []);

  // Cargar productos al inicio
  useEffect(() => {
    refetchProductos();
  }, [refetchProductos]);

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm.trim()) {
      const searchNormalized = normalizeText(searchTerm.trim());
      filtered = filtered.filter((product) => {
        const name = normalizeText(product.name);
        const description = normalizeText(product.description);
        const category = normalizeText(product.category);
        const searchWords = searchNormalized.split(" ");
        return (
          name.includes(searchNormalized) ||
          description.includes(searchNormalized) ||
          category.includes(searchNormalized) ||
          searchWords.some(
            (word) =>
              name.includes(word) ||
              description.includes(word) ||
              category.includes(word)
          )
        );
      });
    }

    if (selectedCategory !== "todos") {
      const categoryName = categories.find(
        (c) => c.id === selectedCategory
      )?.nombre;
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryName?.toLowerCase()
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, categories]);

  const popularProducts = filteredProducts.filter((p) => p.isPopular);
  const newProducts = filteredProducts.filter((p) => p.isNew);
  const allProducts = filteredProducts.filter((p) => !p.isPopular && !p.isNew);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];

    const suggestions = new Set();
    const searchLower = searchTerm.toLowerCase();

    products.forEach((product) => {
      if (product.name.toLowerCase().includes(searchLower))
        suggestions.add(product.name);
      if (product.category.toLowerCase().includes(searchLower))
        suggestions.add(product.category);
    });

    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm, products]);

  const getDisplayedProducts = (products, showAll, defaultCount = 2) =>
    showAll ? products : products.slice(0, defaultCount);

  const handleAddToCart = useCallback(
    (productId) => {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = existingCart.find((item) => item.id === productId);

      let updatedCart;
      if (existingItem) {
        updatedCart = existingCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const product = products.find((p) => p.id === productId);
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      setAddedItems((prev) => new Set(prev).add(productId));
      setTimeout(() => {
        setAddedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 1000);
    },
    [products]
  );

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
    searchTerm,
    selectedCategory,
    showAllPopular,
    showAllNew,
    showAllProducts,
    addedItems,
    searchHistory,
    showSearchSuggestions,
    categories,
    products,
    popularProducts,
    newProducts,
    allProducts,
    filteredProducts,
    searchSuggestions,
    totalResults,
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
    setProducts,
    refetchProductos, // <- aquí puedes usarlo externamente
  };
};
