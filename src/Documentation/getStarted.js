import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import NavBarDoc from './NavBarDoc';

// Simulate auth (replace with real check)
const isAuthenticated = () => {
  return !!localStorage.getItem('edusifyUser'); // mock check
};

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 1.5rem 3rem;
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  margin-top:80px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: #111827;
  letter-spacing: -0.03em;
`;

const Section = styled.section`
  margin-bottom: 3.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: #374151;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  font-size: 1.05rem;
  color: #374151;
`;

const ListItem = styled.li`
  margin-bottom: 0.6rem;
`;

const StyledLink = styled(Link)`
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;
  }
`;

const Highlight = styled.span`
  background: #f3f4f6;
  padding: 0.3rem 0.55rem;
  border-radius: 0.4rem;
  font-weight: 500;
  font-size: 0.95rem;
`;

const Notice = styled.div`
  background-color: #fef3c7;
  padding: 1rem 1.5rem;
  border-left: 4px solid #facc15;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  color: #92400e;
`;

const ApiKeyDocs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      // redirect logic or allow them to read, up to you
    }
  }, []);

  return (
    <Wrapper>
      <NavBarDoc />

      {!isAuthenticated() && (
        <Notice>
          You need an Edusify account to use our APIs.{' '}
          <StyledLink to="/sign-up">Create your free account here →</StyledLink> <br />
          (Edusify App and Developer accounts are the same!)
        </Notice>
      )}

      <Title>Edusify API — Getting Started</Title>

      <Section>
        <Paragraph>
          Build on top of Edusify’s powerful AI infrastructure. From automatic quiz and flashcard generation to full PDF conversion — our API is made for edtechs, student tools, and developers who want to stand out.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>🚀 What You Can Do</SubTitle>
        <List>
          <ListItem><strong>PDF → Study Kit:</strong> Convert full PDFs into quizzes and flashcards instantly.</ListItem>
          <ListItem><strong>Text → Smart Tools:</strong> Paste raw text and generate structured study aids.</ListItem>
          <ListItem><strong>Topic → Resources:</strong> Get quizzes and flashcards on any topic — instantly.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>🔑 Where API Keys Are Needed</SubTitle>
        <Paragraph>
          Your unique API key authenticates you, tracks your usage, and gives access to premium features.
        </Paragraph>
        <Paragraph>
          Generate your key on the <StyledLink to="/api-key">API Key Page</StyledLink>. Never share it publicly.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>💳 Billing & Credits</SubTitle>
        <Paragraph>
          Edusify follows a pay-as-you-go model — no subscriptions, just pure flexibility.
        </Paragraph>
        <Paragraph>
          Add credits (₹50 minimum) from the <StyledLink to="/billing">Billing Page</StyledLink>. All charges are transparently logged.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>📦 Quickstart</SubTitle>
        <List>
          <ListItem><strong>1.</strong> Generate your API key.</ListItem>
          <ListItem><strong>2.</strong> Add credits to unlock the endpoints.</ListItem>
          <ListItem><strong>3.</strong> Start sending requests. Simple.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>🔒 Pro Tips</SubTitle>
        <List>
          <ListItem>Never expose your key in client-side code.</ListItem>
          <ListItem>Rotate keys regularly if you're scaling up.</ListItem>
          <ListItem>Use backend proxies for key safety in public apps.</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>📚 API Endpoint Docs</SubTitle>
        <List>
          <ListItem><StyledLink to="/document/api/quiz-topic">Quiz from Topic</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/quiz-exam">Quiz from Competitive Exam</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/pdf-to-quiz">PDF to Quiz</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/pdf-to-flashcard">PDF to Flashcards</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/quiz-from-text">Text to Quiz</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/flashcards-from-topic">Topic to Flashcards</StyledLink></ListItem>
          <ListItem><StyledLink to="/document/api/flashcards-from-text">Text to Flashcards</StyledLink></ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>🤝 Need Help?</SubTitle>
        <Paragraph>
          We’ve got you. Email <Highlight>edusyfy@gmail.com</Highlight> or join our dev Discord for assistance, ideas, or just to vibe with the team.
        </Paragraph>
      </Section>
    </Wrapper>
  );
};

export default ApiKeyDocs;
