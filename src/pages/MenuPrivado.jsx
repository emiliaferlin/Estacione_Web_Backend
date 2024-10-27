import { NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const MenuPrivado = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <NavLink exact="true" to="/privado" className="navbar-brand">
            Página Inicial
          </NavLink>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink exact="true" to="/privado/calculo" className="nav-link">
                Cadastro Vaga
              </NavLink>
              <NavLink
                exact="true"
                to="/privado/resultado"
                className="nav-link"
              >
                Cadastro Veículo
              </NavLink>
              <NavLink
                exact="true"
                to="/privado/resultado"
                className="nav-link"
              >
                Histórico
              </NavLink>
              <NavLink exact="true" to="/" className="nav-link">
                Sair
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MenuPrivado;
