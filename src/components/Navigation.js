import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { faFileAlt, faComments, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navigation.css';

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <Navbar bg="light" expand="lg" >
        <Container>
            <Nav className="icon-container">
               <Link to="/home" className="icon-link" title="Home">
                <FontAwesomeIcon icon={faHome} className="icon" />
              </Link>
              <Link to="/myfiles" className="icon-link" title="My Storage">
                <FontAwesomeIcon icon={faFileAlt} className="icon" />
              </Link>
              <Link to="/discussion" className="icon-link" title="Discussion">
                <FontAwesomeIcon icon={faComments} className="icon" />
              </Link>
          </Nav>
          <Nav className="icon-container">
              {user ? (
                <Nav.Link onClick={logout} as={Link} to="/login">
                  <FontAwesomeIcon icon={faSignOutAlt} className="icon" title="logout"/> 
                </Nav.Link>
              ) : (
                null
              )}
            </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
