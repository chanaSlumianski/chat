import React from 'react';
import { Container } from 'react-bootstrap';
import Discussion from './Discussion';
function Home() {
  return (
    <Container>
      <h1>Welcome to My App</h1>
      <Discussion></Discussion>
    </Container>
  );
}

export default Home;
