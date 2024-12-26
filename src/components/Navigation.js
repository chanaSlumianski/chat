import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { faArrowDown, faFileAlt, faComments, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navigation.css';

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <div className='try'>
      <Navbar bg="light" expand="lg" >
        <Container>
            <Nav className="icon-container">
              <FontAwesomeIcon icon={faArrowDown} className="icon" title="Download Icon" />
              <FontAwesomeIcon icon={faFileAlt} className="icon" title="my storage" />
              <FontAwesomeIcon icon={faComments} className="icon" title="discussion" />
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
