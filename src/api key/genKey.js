// ApiKeyPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../app_modules/apiRoutes';
import axios from 'axios';

const Container = styled.div`
  max-width: 780px;
  margin: 4rem auto;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: #111827;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const BackButton = styled.button`
  padding: 0.55rem 1.1rem;
  background: transparent;
  border: 1.5px solid #4f46e5;
  color: #4f46e5;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: #4f46e5;
    color: #ffffff;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  flex-grow: 1;
  text-align: center;
  margin-left: -3rem;
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #4b5563;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const KeyBox = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
`;

const KeyText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  max-width: 75%;
  word-break: break-word;
`;

const CopyButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4338ca;
    transform: scale(1.05);
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #10b981;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #059669;
    transform: scale(1.03);
  }
`;

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState('generate');
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${API_ROUTES.baseURL}/check-api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.action === 'regenerate') setApiKey(data.key);
        setAction(data.action);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return nav('/sign-up');

      try {
        const res = await axios.post(API_ROUTES.userSessionAut, { token });
        if (!res.data.valid) nav('/sign-up');
      } catch (err) {
        console.error(err);
        nav('/sign-up');
      }
    };

    const timer = setTimeout(validateToken, 500);
    return () => clearTimeout(timer);
  }, [nav]);

  const generateApiKey = () => {
    setIsGenerating(true);
    const token = localStorage.getItem('token');

    fetch(`${API_ROUTES.baseURL}/generate-api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        setApiKey(data.key);
        setAction('regenerate');
        setIsGenerating(false);
      })
      .catch(err => {
        console.error(err);
        setIsGenerating(false);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => nav('/dashboard')}>← Back</BackButton>
        <Title>Manage API Key</Title>
      </Header>

      <Description>
        Your API key is confidential. You can generate it if you don’t have one yet, or regenerate it securely.
      </Description>

      <KeyBox>
        <KeyText>{apiKey || 'No API Key Generated Yet'}</KeyText>
        {apiKey && <CopyButton onClick={copyToClipboard}>Copy</CopyButton>}
      </KeyBox>

      {!isLoading && action === 'generate' && !isGenerating && (
        <GenerateButton onClick={generateApiKey}>
          Generate API Key
        </GenerateButton>
      )}
    </Container>
  );
};

export default ApiKeyPage;
