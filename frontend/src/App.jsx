import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./welcome/Welcome";

// (Si no tienes Login y Register aún, comenta o borra estas líneas)
// import Login from "./pages/Login";
// import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* Comenta estas rutas si aún no existen */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/registro" element={<Register />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
