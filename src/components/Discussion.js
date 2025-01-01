import React from 'react';
import { Container } from 'react-bootstrap';
import './Discussion.css';
import Message from './Message';
import Navigation from './Navigation';

function Discussion() {
  return (
    <Container>
         <header className="icons-header">
      <Navigation/>
    </header>
      <h4>שלום! 👏 אני פה כדי לעזור לך, בא נתחיל 🎉🎉</h4>
      <Message></Message>
    </Container>
  );
}

export default Discussion;
