import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBarDoc from './NavBarDoc';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SubTitle = styled.h2`
  font-size: 1.65rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
`;

const CodeBlock = styled.pre`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #111827;
`;

const InlineCode = styled.code`
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.95rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.4rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  font-size: 0.95rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f9fafb;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;
const StyledLink = styled(Link)`
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const FlashcardsFromTextDocs = () => {
  return (
    <Wrapper>
      <NavBarDoc/>
      <Title>Edusify API — Generate Flashcards from Plain Text</Title>

      <Paragraph>
        This API endpoint allows you to generate flashcards based on any plain text input. Perfect for turning study notes, explanations, or articles into a set of useful flashcards.
      </Paragraph>

      <Section>
        <SubTitle>Pricing</SubTitle>
        <Paragraph>
          Each API call costs ₹1.5. Charges are applied only when the API call is successfully executed. There are no hidden fees or subscriptions.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Endpoint</SubTitle>
        <CodeBlock>POST https://srv594954.hstgr.cloud/api/flashcards-from-text</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Authentication</SubTitle>
        <Paragraph>
          Authenticate your request by providing your unique Edusify <InlineCode>apiKey</InlineCode> in the request body.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Request Body</SubTitle>
        <CodeBlock>{`{
  "apiKey": "your-api-key-here",
  "text": "The human body consists of several systems including the circulatory system, respiratory system, etc."
}`}</CodeBlock>
        <List>
          <ListItem><strong>apiKey</strong>: Your unique Edusify API key (required)</ListItem>
          <ListItem><strong>text</strong>: Raw input text from which flashcards will be generated (required)</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Example Response</SubTitle>
        <CodeBlock>{`{
  "success": true,
  "flashcards": [
    {
      "question": "What does the circulatory system do?",
      "answer": "It circulates blood throughout the body."
    },
    {
      "question": "What is the primary function of the respiratory system?",
      "answer": "It enables the exchange of oxygen and carbon dioxide in the body."
    }
    // Total: N flashcards
  ]
}`}</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Error Response</SubTitle>
        <CodeBlock>{`{
  "error": "Failed to generate flashcards"
}`}</CodeBlock>
        <Paragraph>
          This error might occur if your API key is invalid, if you have insufficient credits, or due to a temporary server issue.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Example — React Code</SubTitle>
        <CodeBlock>{`const generateFlashcards = async () => {
  const response = await fetch('https://srv594954.hstgr.cloud/api/flashcards-from-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'your-api-key-here',
      text: 'Study notes or educational content goes here...',
    }),
  });

  const data = await response.json();
  if (data.success) {
    console.log('Flashcards:', data.flashcards);
  } else {
    console.error('Error:', data.error);
  }
};`}</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Error Codes Reference</SubTitle>
        <Table>
          <thead>
            <Tr>
              <Th>Status Code</Th>
              <Th>Meaning</Th>
              <Th>Example Message</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>401</Td>
              <Td>Unauthorized — Invalid API key</Td>
              <Td>Invalid API key</Td>
            </Tr>
            <Tr>
              <Td>402</Td>
              <Td>Payment Required — Insufficient credits</Td>
              <Td>Insufficient credits. Top up to continue.</Td>
            </Tr>
            <Tr>
              <Td>500</Td>
              <Td>Internal Server Error — Processing failed</Td>
              <Td>Failed to generate flashcards</Td>
            </Tr>
          </tbody>
        </Table>
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
        <SubTitle>Pro Tips</SubTitle>
        <List>
          <ListItem>Ensure the input text is clear and structured for better flashcard relevance.</ListItem>
          <ListItem>This is perfect for turning study material, notes, or articles into flashcards.</ListItem>
          <ListItem>Monitor API usage and credits via your Edusify Developer Dashboard.</ListItem>
        </List>
      </Section>
    </Wrapper>
  );
};

export default FlashcardsFromTextDocs;
