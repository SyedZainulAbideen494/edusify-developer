import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../app_modules/apiRoutes';
import axios, { Axios } from 'axios';

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  color: #111827;
  background: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #4f46e5;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #374151;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const KeyBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const KeyText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  word-break: break-word;
  max-width: 75%;
`;

const CopyButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #4f46e5;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #4338ca;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const GenerateButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #10b981;
  color: white;
  border-radius: 0.75rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  display: block;
  width: 100%;
  margin-top: 2rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #059669;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [action, setAction] = useState('generate');
  const nav = useNavigate();

  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem('token');

    // Check if the API key exists by calling the backend
    fetch(`${API_ROUTES.baseURL}/check-api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.action === 'regenerate') {
          setApiKey(data.key);
        }
        setAction(data.action);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const generateApiKey = () => {
    setIsGenerating(true);
    const token = localStorage.getItem('token');

    fetch(`${API_ROUTES.baseURL}/generate-api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiKey(data.key);
        setAction('regenerate');
        setIsGenerating(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsGenerating(false);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
  };
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
  
  
      // If no token, redirect to login
      if (!token) {
        console.log('No token found, redirecting to sign-up.');
        nav('/sign-up');
        return;
      }
  
      try {
        const response = await axios.post(API_ROUTES.userSessionAut, { token });
  
        if (!response.data.valid) {
          console.log('Invalid token, redirecting to sign-up.');
          nav('/sign-up');
        }
      } catch (error) {
        console.error('Error during token validation:', error);
        nav('/sign-up');
      }
    };
  
    // Delay the validation by 5 seconds
    const timeoutId = setTimeout(() => {
      validateToken();
    }, 500);
  
    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [nav]);
  
  return (
    <Container>
      <Header>
        <BackButton onClick={() => nav('/dashboard')}>Back</BackButton>
        <Title>Manage API Key</Title>
      </Header>
      <Description>
        Your API key is unique. You can generate it if you don't have one yet, or regenerate it if necessary.
      </Description>
      <KeyBox>
        <KeyText>{apiKey || 'No API Key Generated Yet'}</KeyText>
        <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
      </KeyBox>
      {action === 'generate' && (
        <GenerateButton onClick={generateApiKey} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate API Key'}
        </GenerateButton>
      )}
    </Container>
  );
};

export default ApiKeyPage;
