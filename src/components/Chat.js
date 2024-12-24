import React from 'react';
import { Container } from 'react-bootstrap';
import './Chat.css';
import Message from './Message';

function Chat() {
  return (
    <Container>
      <h1>Ofer Docs Assistant</h1>
      <h4>Hi! 👏 I'm here to help you fly higher 🤝 🚁 Let's start! 🎉🎉</h4>
      <Message></Message>
    </Container>
  );
}

export default Chat;
