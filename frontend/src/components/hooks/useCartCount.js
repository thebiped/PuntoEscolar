// components/hooks/useCartCount.js
import { useEffect, useState } from "react";

export const useCartCount = () => {
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCount(totalQuantity > 99 ? 99 : totalQuantity);
  };

  useEffect(() => {
    updateCartCount();

    // Escuchar evento personalizado y cambios en el localStorage
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return count;
};
