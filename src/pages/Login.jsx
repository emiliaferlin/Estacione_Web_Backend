import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

const Login = () => {
  const { nome, setNome, senha, setsenha, setIsAuthenticated } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (nome && senha) {
      localStorage.setItem("nome", nome);
      localStorage.setItem("senha", senha);
      setIsAuthenticated(true);
      navigate("/privado");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nome");
    localStorage.removeItem("senha");
    setNome("");
    setTelefone("");
    setIsAuthenticated(false);
    navigate("/");
  };

  const isAuth = !!localStorage.getItem("nome");

  return (
    <>
      <div className="dados-container">
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="dados-container">
        <label>Senha: </label>
        <input
          type="text"
          value={senha}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div className="dados-container">
        <button className="todos-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
