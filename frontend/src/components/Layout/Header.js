import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
function Header() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/category">
              Category
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    DashBoard
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Nav.Link as={Link} to="/cart">
              Cart (0)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
