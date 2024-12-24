import React from 'react';
import { Container } from 'react-bootstrap';
import Chat from './Chat';
function Home() {
  return (
    <Container>
      <h1>Welcome to My App</h1>
      <Chat></Chat>
    </Container>
  );
}

export default Home;
