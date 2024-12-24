// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';


// function Navigation() {
//   const { user, logout } = useAuth();

//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/home">Home</Nav.Link>
//             <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
//             {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
//           </Nav>
//           <Nav>
//             {user ? (
//               <Nav.Link onClick={logout}>Logout</Nav.Link>
//             ) : (
//               <Nav.Link as={Link} to="/login">Login</Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navigation;
import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';

function Navigation() {
  const { user, logout } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home" onClick={() => handleOptionClick("home")}>Home</Nav.Link>
              {user && <Nav.Link as={Link} to="/profile" onClick={() => handleOptionClick("profile")}>Profile</Nav.Link>}
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {selectedOption === "home" && <Home />}
        {selectedOption === "profile" && <Profile />}
        {selectedOption === "login" && <Login />}
      </Container>
    </div>
  );
}

export default Navigation;
