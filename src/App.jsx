import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContext from "./AppContext";
import Home from "./components/Home";
import MenuPrivado from "./components/MenuPrivado";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [nome, setNome] = useState(localStorage.getItem("nome") || "");
  const [senha, setSenha] = useState(localStorage.getItem("senha") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("nome")
  );

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/privado",
      element: isAuthenticated ? <MenuPrivado /> : <Login />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "calculo",
          element: <Calculo />,
        },
        {
          path: "resultado",
          element: <Resultado />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        nome,
        setNome,
        senha,
        setSenha,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
