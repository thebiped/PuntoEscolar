// src/components/dashboard/useCarritoLogic.js
import { useState, useMemo } from "react";
import { catalogProducts } from "../../CatalogData";

export const useCarritoLogic = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("domicilio");
  const [address, setAddress] = useState("Av. Principal 123, Ciudad");

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart
      .map((item) => {
        const product = catalogProducts.find((p) => p.id === item.id);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  });

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map(({ id, quantity }) => ({ id, quantity })))
    );
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map(({ id, quantity }) => ({ id, quantity })))
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const confirmarPedido = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const nuevoPedido = {
      id: `ORD-${Date.now()}`,
      direccion: deliveryMethod === "domicilio" ? address : selectedSchool,
      total: subtotal,
      productos: cartItems.length,
      items: cartItems.map((item) => ({
        nombre: item.name,
        categoria: item.category,
        cantidad: item.quantity,
        precio: item.price,
        subtotal: item.price * item.quantity,
        imagen: item.image,
      })),
    };

    const pedidosPrevios = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosActualizados = [nuevoPedido, ...pedidosPrevios];
    localStorage.setItem("pedidos", JSON.stringify(pedidosActualizados));

    alert("¡Pedido confirmado!");
    setCartItems([]);
    localStorage.setItem("cart", "[]");
  };

  return {
    selectedSchool,
    setSelectedSchool,
    deliveryMethod,
    setDeliveryMethod,
    address,
    setAddress,
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    subtotal,
    confirmarPedido,
  };
};
