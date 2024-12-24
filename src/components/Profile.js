import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user } = useAuth();

  return (
    <Container className='all'>
      <h1>Hi {user.email?? ''}!👋</h1>
      <h3>We've a few updates for you</h3>
    </Container>
  );
}

export default Profile;
