import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #111827;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  line-height: 1.75;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  font-size: 1rem;
  margin-top: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Highlight = styled.span`
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
  font-weight: 500;
  font-size: 0.95rem;
`;

const ApiKeyDocs = () => {
  return (
    <Wrapper>
      <Title>Edusify API — Getting Started & Overview</Title>

      <Section>
        <Paragraph>
          Welcome to the Edusify API ecosystem. Use your API key to access powerful AI tools like quiz generation, flashcard creation, PDF conversion, and more — all tailored for students, educators, and edtech platforms.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>🚀 What You Can Do with Edusify API</SubTitle>
        <List>
          <ListItem><strong>PDF to Quiz & Flashcards:</strong> Instantly turn any PDF into a full study set.</ListItem>
          <ListItem><strong>Plain Text to Quiz or Flashcards:</strong> Paste any text and generate quiz questions or flashcards.</ListItem>
          <ListItem><strong>Topic to Quiz & Flashcards:</strong> Input any topic (like "Newton’s Laws") and generate everything you need.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>🧠 Where You Need an API Key</SubTitle>
        <Paragraph>
          Your API key is required whenever you make a request to Edusify's developer tools. It uniquely identifies you, tracks your credit usage, and allows access to premium AI services.
        </Paragraph>
        <Paragraph>
          To generate your API key, go to the <StyledLink to="/api-key">API Key Page</StyledLink>. Keep it secret, keep it safe.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>💳 Managing Billing & Credits</SubTitle>
        <Paragraph>
          Edusify uses a simple pay-per-call credit model. No subscriptions, no hidden fees. Just buy credits and use them however you want.
        </Paragraph>
        <Paragraph>
          Head to the <StyledLink to="/billing">Billing Page</StyledLink> to top up your credits. The minimum is ₹50, and all your transactions will be logged for transparency.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>📦 Quickstart Guide</SubTitle>
        <List>
          <ListItem><strong>Step 1:</strong> Visit the <StyledLink to="/api-key">API Key Page</StyledLink> and generate your key.</ListItem>
          <ListItem><strong>Step 2:</strong> Go to the <StyledLink to="/billing">Billing Page</StyledLink> and add credits (₹50 minimum).</ListItem>
          <ListItem><strong>Step 3:</strong> Start using the APIs — pass your key in each request body.</ListItem>
          <ListItem><strong>Step 4:</strong> Track your usage and manage billing easily from your dashboard.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>🔒 API Key Tips</SubTitle>
        <List>
          <ListItem>Never share your API key publicly (e.g., GitHub, frontend code).</ListItem>
          <ListItem>Rotate keys regularly if building large-scale integrations.</ListItem>
          <ListItem>Use a backend proxy to protect your key in public apps.</ListItem>
        </List>
      </Section>
      <Section>
        <SubTitle>📚 API Documentation Links</SubTitle>
        <List>
          <ListItem>
            <StyledLink to="/document/api/quiz-topic">Quiz from Topic</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/quiz-exam">Quiz from Competitive Exam</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/pdf-to-quiz">PDF to Quiz</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/pdf-to-flashcard">PDF to Flashcards</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/quiz-from-text">Text to Quiz</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/flashcards-from-topic">Topic to Flashcards</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/document/api/flashcards-from-text">Text to Flashcards</StyledLink>
          </ListItem>
        </List>
      </Section>
      <Section>
        <SubTitle>Need Help?</SubTitle>
        <Paragraph>
          Our team is here for you. Email us at <Highlight>edusyfy@gmail.com</Highlight> or join the developer Discord for help, ideas, or collaboration.
        </Paragraph>
      </Section>
    </Wrapper>
  );
};

export default ApiKeyDocs;
