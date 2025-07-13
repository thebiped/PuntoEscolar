import api from "./api";


export async function login(email, password) {
  const response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Error al iniciar sesión");
  }

  // Guarda ambos tokens
  localStorage.setItem("token", result.access);
  localStorage.setItem("refresh", result.refresh);
  localStorage.setItem("user", JSON.stringify(result.user));
  localStorage.setItem("auth", "true");

  return result;
}

export async function register(formData) {
  const response = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al registrar");
  }

  return await response.json();
}

export const logout = async () => {
  try {
    await api.post("/usuarios/logout/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
