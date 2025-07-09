import { useEffect, useState, useMemo } from "react";

export const usePedidosLogic = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("pedidos");
    const parsed = stored ? JSON.parse(stored) : [];
    setPedidos(parsed);
  }, []); // se ejecuta al montar

  const totalGastado = useMemo(() => {
    return pedidos.reduce((sum, p) => sum + (p.total || 0), 0);
  }, [pedidos]);

  return { pedidos, totalGastado };
};
