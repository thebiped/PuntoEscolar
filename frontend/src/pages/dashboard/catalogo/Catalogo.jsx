import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
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
  Menu,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCatalogLogic } from "../../../components/dashboard/catalogo/useCatalogLogic";
import { useCartCount } from "../../../components/hooks/useCartCount";
import DashboardNavbar from "../DashboardNavbar";
import "./Catalogo.css";


const Catalogo = () => {
  const {
    searchTerm,
    selectedCategory,
    totalResults,
    showAllPopular,
    showAllNew,
    showAllProducts,
    addedItems,
    searchHistory,
    showSearchSuggestions,
    categories,
    popularProducts,
    newProducts,
    allProducts,
    filteredProducts,
    searchSuggestions,
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
  } = useCatalogLogic();
  const hasResults =
    popularProducts.length > 0 ||
    newProducts.length > 0 ||
    allProducts.length > 0;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productoId = queryParams.get("producto");

  const [searchParams] = useSearchParams();
  const categoriaFromURL = searchParams.get("categoria");

  useEffect(() => {
    if (categoriaFromURL) {
      const categoriaId = categories.find(
        (c) => c.name.toLowerCase() === categoriaFromURL.toLowerCase()
      )?.id;
      if (categoriaId) setSelectedCategory(categoriaId);
    }
  }, [categoriaFromURL, categories, setSelectedCategory]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const cartCount = useCartCount();

  const filteredByProductoId = productoId
    ? allProducts.filter((p) => p.id === productoId)
    : null;

  const [menuOpen, setMenuOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [pendingProductId, setPendingProductId] = useState(null);

  const handleAddToCartWithConfirm = (productId) => {
    setPendingProductId(productId);
    setModalVisible(true);
  };

  const confirmAddToCart = () => {
    handleAddToCart(pendingProductId);
    setModalVisible(false);
    setPendingProductId(null);
  };

  const cancelAddToCart = () => {
    setModalVisible(false);
    setPendingProductId(null);
  };
  return (
    <div className="catalog-container">
      {/* Header */}
      <DashboardNavbar activePage="catalogo" />

      <div className="catalog-header" data-aos="fade-right">
        <div
          className="catalog-header-content"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="catalog-header-icon">
            <ShoppingCart size={38} />
          </div>
          <div className="catalog-header-text">
            <h1 data-aos="fade-up" data-aos-delay="300">
              Catálogo de productos
            </h1>
            <p data-aos="fade-up" data-aos-delay="400">
              Explora y encuentra lo que necesites para la escuela
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="catalog-content">
        {/* Buscador mejorado con sugerencias */}
        <form
          onSubmit={handleSearchSubmit}
          className="search-form"
          data-aos="fade-down"
        >
          <div
            className="search-container-enhanced"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar productos escolares... (ej: coca cola, snacks, útiles)"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSearchSuggestions(searchTerm.length >= 2)}
              className="search-input-enhanced"
              data-aos="fade-up"
              data-aos-delay="100"
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
                data-aos="flip-left"
                data-aos-delay="100"
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
          <div
            className="no-results-enhanced"
            data-aos="fade-up"
            data-aos-delay="100"
          >
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
                (product, index) => (
                  <div
                    key={product.id}
                    className="popular-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
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
                            onClick={() =>
                              handleAddToCartWithConfirm(product.id)
                            }
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

            {getDisplayedProducts(newProducts, showAllNew, 1).map(
              (product, index) => (
                <div
                  key={product.id}
                  className="featured-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 150}
                >
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
                        onClick={() => handleAddToCartWithConfirm(product.id)}
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
              )
            )}
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

            {productoId && filteredByProductoId?.length > 0 ? (
              <div className="products-container" data-aos="zoom-in-up">
                {filteredByProductoId.map((product) => (
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
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="products-container">
                {getDisplayedProducts(allProducts, showAllProducts, 6).map(
                  (product, index) => (
                    <div
                      key={product.id}
                      className="product-card"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>
                      <div className="product-card-body">
                        <span className="category-tag">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="product-card-footer">
                          <span className="product-price">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              handleAddToCartWithConfirm(product.id)
                            }
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
            )}

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
      <footer className="footer" data-aos="fade-up">
        <div className="footer-content">
          <div
            className="footer-column"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h2 className="footer-logo">El Punto Escolar</h2>
            <p>Tu tienda escolar siempre disponible</p>
          </div>
          <div
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="200"
          >
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
          <div
            className="footer-column"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h4>Contactos</h4>
            <div className="footer-contact">
              <div className="contact-link">
                <div className="icon">
                  <Mail size={18} />
                </div>
                <p>puntoescolar@gmail.com</p>
              </div>
              <div className="contact-link">
                <div className="icon">
                  <MapPin size={18} />
                </div>
                <p>battipede y gúemes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 Mi Kiosco Escolar. Todos los derechos reservados.
        </div>
      </footer>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <h3>¿Agregar al carrito?</h3>
            <p>¿Querés guardar este producto en el carrito?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmAddToCart}>
                Sí, agregar
              </button>
              <button className="cancel-btn" onClick={cancelAddToCart}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
