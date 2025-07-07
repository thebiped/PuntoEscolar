import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  Plus,
  ShoppingCart,
  Filter,
  X,
  Zap,
  Star,
  User,
  Mail,
  MapPin,
  Package,
  Popcorn,
  CupSoda,
  Backpack,
  House,
  Hamburger,
} from "lucide-react";
import { catalogProducts } from "../../../components/CatalogData";
import "./Catalogo.css";

const Catalogo = () => {
  const categories = [
    { id: "todos", name: "Todos", icon: Package },
    { id: "snacks", name: "Snacks", icon: Popcorn },
    { id: "bebidas", name: "Bebidas", icon: CupSoda },
    { id: "utiles", name: "Útiles", icon: Backpack },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Filtrar productos basado en búsqueda y categoría con mejor algoritmo
  const filteredProducts = useMemo(() => {
    const normalizeText = (text) =>
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    let filtered = catalogProducts;

    // Aplicar búsqueda si hay término
    if (searchTerm.trim()) {
      const searchNormalized = normalizeText(searchTerm.trim());

      filtered = filtered.filter((product) => {
        const name = normalizeText(product.name);
        const description = normalizeText(product.description);
        const category = normalizeText(product.category);

        const nameMatch = name.includes(searchNormalized);
        const descriptionMatch = description.includes(searchNormalized);
        const categoryMatch = category.includes(searchNormalized);

        // Separar por palabras y verificar coincidencia parcial
        const searchWords = searchNormalized.split(" ");
        const wordMatch = searchWords.some(
          (word) =>
            name.includes(word) ||
            description.includes(word) ||
            category.includes(word)
        );

        return nameMatch || descriptionMatch || categoryMatch || wordMatch;
      });
    }

    // Filtrar por categoría
    if (selectedCategory !== "todos") {
      const categoryName = categories.find(
        (cat) => cat.id === selectedCategory
      )?.name;
      if (categoryName) {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() === categoryName.toLowerCase()
        );
      }
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Separar productos por tipo
  const popularProducts = filteredProducts.filter(
    (product) => product.isPopular
  );
  const newProducts = filteredProducts.filter((product) => product.isNew);
  const allProducts = filteredProducts.filter(
    (product) => !product.isPopular && !product.isNew
  );

  // Sugerencias de búsqueda
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];

    const suggestions = new Set();
    const searchLower = searchTerm.toLowerCase();

    catalogProducts.forEach((product) => {
      // Sugerir nombres de productos
      if (product.name.toLowerCase().includes(searchLower)) {
        suggestions.add(product.name);
      }
      // Sugerir categorías
      if (product.category.toLowerCase().includes(searchLower)) {
        suggestions.add(product.category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm]);

  // Determinar cuántos productos mostrar
  const getDisplayedProducts = (products, showAll, defaultCount = 2) => {
    return showAll ? products : products.slice(0, defaultCount);
  };

  const handleAddToCart = useCallback((productId) => {
    console.log("Agregado al carrito:", productId);

    // Efecto visual de agregado
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
        // Agregar a historial de búsqueda
        setSearchHistory((prev) => {
          const newHistory = [
            searchTerm.trim(),
            ...prev.filter((item) => item !== searchTerm.trim()),
          ];
          return newHistory.slice(0, 5); // Mantener solo las últimas 5 búsquedas
        });
      }
      setShowSearchSuggestions(false);
    },
    [searchTerm]
  );

  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);

    // Agregar a historial
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

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setShowSearchSuggestions(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const hasResults =
    popularProducts.length > 0 ||
    newProducts.length > 0 ||
    allProducts.length > 0;
  const totalResults = filteredProducts.length;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Sesión cerrada exitosamente");
    window.location.href = "/"; // o usar navigate() si usás react-router
  };

  return (
    <div className="catalog-container">
      {/* Header */}
      <header className="navbar">
        <div className="logo"><img src="/assets/logo.png" alt="" /></div>
        <nav className="nav">
          <a href="/inicio"><House />Inicio</a>
          <a href="/catalogo" className="active"><Hamburger />Catálogo</a>
          <a href="/carrito"><ShoppingCart />Carrito</a>
          <a href="/pedidos"><Package />Mis pedidos</a>
        </nav>
        <div className="user-info">
          <User size={20} />
          <a href="/cuenta">Hola, Usuario</a>
        </div>
      </header>
      <div className="catalog-header">
        <div className="catalog-header-content">
          <div className="catalog-header-icon">
            <ShoppingCart size={38} />
          </div>
          <div className="catalog-header-text">
            <h1>Catálogo de productos</h1>
            <p>Explora y encuentra lo que necesites para la escuela</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="catalog-content">
        {/* Buscador mejorado con sugerencias */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-container-enhanced">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar productos escolares... (ej: coca cola, snacks, útiles)"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSearchSuggestions(searchTerm.length >= 2)}
              className="search-input-enhanced"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-search-button"
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}

            {/* Sugerencias de búsqueda */}
            {showSearchSuggestions &&
              (searchSuggestions.length > 0 || searchHistory.length > 0) && (
                <div className="search-suggestions">
                  {searchSuggestions.length > 0 && (
                    <div className="suggestions-section">
                      <div className="suggestions-header">
                        <Search size={14} />
                        <span>Sugerencias</span>
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-item"
                        >
                          <span className="suggestion-text">{suggestion}</span>
                          <Zap size={12} className="suggestion-icon" />
                        </button>
                      ))}
                    </div>
                  )}

                  {searchHistory.length > 0 && !searchTerm && (
                    <div className="suggestions-section">
                      <div className="suggestions-header">
                        <Star size={14} />
                        <span>Búsquedas recientes</span>
                      </div>
                      {searchHistory.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(item)}
                          className="suggestion-item recent"
                        >
                          <span className="suggestion-text">{item}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>
        </form>

        {/* Indicador de búsqueda activa mejorado */}
        {(searchTerm || selectedCategory !== "todos") && (
          <div className="search-indicator-enhanced">
            <div className="search-status">
              <Filter size={16} />
              <span>
                {totalResults} resultado{totalResults !== 1 ? "s" : ""}{" "}
                encontrado{totalResults !== 1 ? "s" : ""}
                {searchTerm && ` para "${searchTerm}"`}
                {selectedCategory !== "todos" &&
                  ` en ${
                    categories.find((c) => c.id === selectedCategory)?.name
                  }`}
              </span>
            </div>
            <button
              onClick={resetAllFilters}
              className="clear-all-filters-button"
            >
              <X size={14} />
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Categorías funcionales mejoradas */}
        <div className="categories-container-enhanced">
          {categories.map((category) => {
            const categoryProducts =
              category.id === "todos"
                ? filteredProducts.length
                : filteredProducts.filter((p) => {
                    const categoryName = categories.find(
                      (c) => c.id === category.id
                    )?.name;
                    return (
                      categoryName &&
                      p.category.toLowerCase() === categoryName.toLowerCase()
                    );
                  }).length;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button-enhanced ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                <span className="category-icon">
                  {category.icon &&
                    React.createElement(category.icon, { size: 18 })}
                </span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">({categoryProducts})</span>
              </button>
            );
          })}
        </div>

        {/* Mensaje de no resultados mejorado */}
        {!hasResults && (searchTerm || selectedCategory !== "todos") && (
          <div className="no-results-enhanced">
            <div className="no-results-icon">
              <Search size={48} />
            </div>
            <h3>No se encontraron productos</h3>
            <p>
              {searchTerm
                ? `No hay productos que coincidan con "${searchTerm}"`
                : `No hay productos en la categoría "${
                    categories.find((c) => c.id === selectedCategory)?.name
                  }"`}
            </p>
            <div className="no-results-actions">
              <button
                onClick={resetAllFilters}
                className="reset-filters-button"
              >
                Ver todos los productos
              </button>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="clear-search-only-button"
                >
                  Solo limpiar búsqueda
                </button>
              )}
            </div>
          </div>
        )}

        {/* Productos Populares */}
        {popularProducts.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                Productos Populares
                <span className="results-count">
                  ({popularProducts.length})
                </span>
              </h2>
              {popularProducts.length > 2 && (
                <button
                  onClick={() => setShowAllPopular(!showAllPopular)}
                  className="section-link"
                >
                  {showAllPopular
                    ? "Ver menos"
                    : `Ver todos (${popularProducts.length})`}
                </button>
              )}
            </div>

            <div className="popular-container">
              {getDisplayedProducts(popularProducts, showAllPopular).map(
                (product) => (
                  <div key={product.id} className="popular-card">
                    <div className="popular-card-content">
                      <div className="popular-image-container">
                        <div className="popular-image-bg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="popular-image"
                          />
                        </div>
                        <div className="popular-badge">
                          <span className="badge-dot"></span>
                          Popular
                        </div>
                      </div>

                      <div className="popular-info">
                        <span className="category-tag">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="product-footer">
                          <span className="product-price">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className={`add-button ${
                              addedItems.has(product.id) ? "added" : ""
                            }`}
                            aria-label="Agregar al carrito"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Botón para mostrar más en móvil */}
            {popularProducts.length > 2 && !showAllPopular && (
              <div className="show-more-mobile">
                <button
                  onClick={() => setShowAllPopular(true)}
                  className="show-more-button"
                >
                  Ver {popularProducts.length - 2} productos más
                </button>
              </div>
            )}
          </section>
        )}

        {/* Nuevos Productos */}
        {newProducts.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                Nuevos Productos
                <span className="results-count">({newProducts.length})</span>
              </h2>
              {newProducts.length > 1 && (
                <button
                  onClick={() => setShowAllNew(!showAllNew)}
                  className="section-link"
                >
                  {showAllNew
                    ? "Ver menos"
                    : `Ver todos (${newProducts.length})`}
                </button>
              )}
            </div>

            {getDisplayedProducts(newProducts, showAllNew, 1).map((product) => (
              <div key={product.id} className="featured-card">
                <div className="featured-content">
                  <div className="featured-info">
                    {product.isBestOption && (
                      <div className="best-option-badge">
                        <span className="badge-dot"></span>
                        MEJOR OPCIÓN
                      </div>
                    )}
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="featured-price">
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`featured-button ${
                        addedItems.has(product.id) ? "added" : ""
                      }`}
                    >
                      <ShoppingCart size={20} />
                      <span>Agregar al carrito</span>
                    </button>
                  </div>

                  <div className="featured-image-container">
                    <div className="featured-image-bg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="featured-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Todos los Productos */}
        {allProducts.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                Todos los Productos
                <span className="results-count">({allProducts.length})</span>
              </h2>
              {allProducts.length > 6 && (
                <button
                  onClick={() => setShowAllProducts(!showAllProducts)}
                  className="section-link"
                >
                  {showAllProducts
                    ? "Ver menos"
                    : `Ver todos (${allProducts.length})`}
                </button>
              )}
            </div>

            <div className="products-container">
              {getDisplayedProducts(allProducts, showAllProducts, 6).map(
                (product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image-full"
                      />
                    </div>

                    <div className="product-card-body">
                      <span className="category-tag">{product.category}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description line-clamp-2">
                        {product.description}
                      </p>
                      <div className="product-card-footer">
                        <span className="product-price">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className={`add-button ${
                            addedItems.has(product.id) ? "added" : ""
                          }`}
                          aria-label="Agregar al carrito"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Botón para mostrar más en móvil */}
            {allProducts.length > 6 && !showAllProducts && (
              <div className="show-more-mobile">
                <button
                  onClick={() => setShowAllProducts(true)}
                  className="show-more-button"
                >
                  Ver {allProducts.length - 6} productos más
                </button>
              </div>
            )}
          </section>
        )}

        {/* Resumen de resultados mejorado */}
        {hasResults && (searchTerm || selectedCategory !== "todos") && (
          <div className="results-summary-enhanced">
            <div className="summary-content">
              <div className="summary-stats">
                <span className="total-results">{totalResults}</span>
                <span className="results-text">
                  producto{totalResults !== 1 ? "s" : ""} encontrado
                  {totalResults !== 1 ? "s" : ""}
                </span>
              </div>
              {searchTerm && (
                <div className="search-terms">
                  para "<strong>{searchTerm}</strong>"
                </div>
              )}
              {selectedCategory !== "todos" && (
                <div className="category-filter">
                  en{" "}
                  <strong>
                    {categories.find((c) => c.id === selectedCategory)?.name}
                  </strong>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2 className="footer-logo">El Punto Escolar</h2>
            <p>Tu tienda escolar siempre disponible</p>
          </div>
          <div className="footer-column">
            <h4>Enlaces rápidos</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Catálogo</a>
              </li>
              <li>
                <a href="#">Carrito</a>
              </li>
              <li>
                <a href="#">Mis Pedidos</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contactos</h4>
            <div className="footer-contact">
              <div className="contact-link">
                <div className="icon">
                  <Mail size={18} />
                </div>
                <p>contacto@mikiosco.edu</p>
              </div>
              <div className="contact-link">
                <div className="icon">
                  <MapPin size={18} />
                </div>
                <p>no existe la calle 231</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 Mi Kiosco Escolar. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Catalogo;
