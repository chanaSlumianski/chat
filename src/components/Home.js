import React, { useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const url = new URL('http://localhost:8080/upload_file');
      url.searchParams.append('username', user.username);

      try {
        const response = await fetch(url.toString(), {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`File selected: ${file.name}`);
    } else {
      console.error('No file selected.');
    }
  };

  return (  
    <Container className="all">
       <header className="icons-header">
      <Navigation/>
    </header>
      <h1 className="text-white">Hi {user?.email ?? ''}! 👋</h1>
      <h3 className="text-white">And welcome to chat based on your presentations 🤖</h3>      <Row className="d-flex justify-content-center my-4">
        <Col xs={12} sm={5}>
          <div
            className="ask-container p-3 bg-light rounded shadow text-center d-flex flex-column justify-content-center"
            role="button"
            onClick={() => navigate('/discussion')}
          >
            <h4 >Ask something</h4>
            <i
              className="bi bi-question-circle"
              style={{ fontSize: '2rem' }}
              aria-label="Ask something icon"
            ></i>
          </div>
        </Col>

        <Col xs={12} sm={6} className="p-3">
          <div className="storage-container text-center">
            <Button
              size="lg"
              className="storage-btn w-100 mb-2"
              onClick={() => navigate('/myfiles')}         
            >
              My Storage
            </Button>
          </div>
          <div>
            <Button
              size="lg"
              className="upload-btn w-100"
              onClick={() => fileInputRef.current.click()}
            >
              Upload File
            </Button>
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </Col>
      </Row>
      <div className="file-upload-section mt-4">
        <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>
    </Container>
  );
}

export default Home;
