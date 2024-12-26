import React from 'react';
import { Container } from 'react-bootstrap';
// import './Discussion.css';
import Message from './Message';
import Navigation from './Navigation';

function Discussion() {
  return (
    <Container>
      <Navigation></Navigation>
      <h1>Ofer Docs Assistant</h1>
      <h4>Hi! 👏 I'm here to help you, Let's start! 🎉🎉</h4>
      <Message></Message>
    </Container>
  );
}

export default Discussion;
