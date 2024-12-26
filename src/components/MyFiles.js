import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MyFiles = ({ username }) => {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
        const url = new URL('http://localhost:8080/get_files');
        url.searchParams.append('username', user.username);

        try {
            const response = await fetch(url.toString(), {
              method: 'GET',
            });
    
            if (!response.ok) {
              throw new Error('Cant get files');
            }

        const [fileNames, fileLinks] = response.data;
        setFiles(fileNames);
        setLinks(fileLinks);
        setLoading(false);

      } catch (err) {
        setError('Failed to load files.');
        setLoading(false);
      }
    };

    fetchFiles();
  }, [username]);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {files.map((file, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>
          <span style={{ marginRight: '10px' }}>{file}</span>
          <a
            href={links[index].trim()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '5px 10px',
              backgroundColor: '#007BFF',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Download
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MyFiles;
