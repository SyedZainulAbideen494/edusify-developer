import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
const QuizFromTextDocs = () => {
  return (
    <Wrapper>
      <Title>Edusify API — Generate Quiz from Plain Text</Title>

      <Paragraph>
        This API endpoint allows you to generate a set of 15 high-quality multiple-choice questions from any plain English text input.
        Ideal for creating quizzes from paragraphs, articles, explanations, or handwritten transcriptions.
      </Paragraph>

      <Section>
        <SubTitle>Pricing</SubTitle>
        <Paragraph>
          Each API call costs ₹1.5. Charges only apply when the API is successfully called. No subscriptions or hidden fees.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Endpoint</SubTitle>
        <CodeBlock>POST https://srv594954.hstgr.cloud/api/quiz-from-text</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Authentication</SubTitle>
        <Paragraph>
          Use your Edusify developer <InlineCode>apiKey</InlineCode> in the request body to authenticate.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Request Body</SubTitle>
        <CodeBlock>{`{
  "apiKey": "your-api-key-here",
  "text": "Photosynthesis is a process used by plants to convert light energy into chemical energy..."
}`}</CodeBlock>
        <List>
          <ListItem><strong>apiKey</strong>: Your unique Edusify API key (required)</ListItem>
          <ListItem><strong>text</strong>: Raw input text to generate quiz from (required)</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Example Response</SubTitle>
        <CodeBlock>{`{
  "success": true,
  "quiz": [
    {
      "question": "What is the primary purpose of photosynthesis?",
      "options": ["To absorb water", "To produce light", "To store proteins", "To produce energy-rich glucose"],
      "correct_answer": "To produce energy-rich glucose"
    },
    {
      "question": "Which organelle is responsible for photosynthesis?",
      "options": ["Mitochondria", "Ribosome", "Chloroplast", "Nucleus"],
      "correct_answer": "Chloroplast"
    }
    // Total: 15 questions
  ]
}`}</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Error Response</SubTitle>
        <CodeBlock>{`{
  "error": "Failed to generate quiz"
}`}</CodeBlock>
        <Paragraph>
          This error may occur due to an invalid API key, insufficient credits, or temporary server failure.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Example — React Code</SubTitle>
        <CodeBlock>{`const generateQuiz = async () => {
  const response = await fetch('https://srv594954.hstgr.cloud/api/quiz-from-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'your-api-key-here',
      text: 'Your educational content or explanation goes here...',
    }),
  });

  const data = await response.json();
  if (data.success) {
    console.log('Quiz:', data.quiz);
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
              <Td>Failed to generate quiz</Td>
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
          <ListItem>Use plain language for better question relevance.</ListItem>
          <ListItem>Ideal for blogs, educational notes, or handwritten transcriptions.</ListItem>
          <ListItem>Combine with PDF-to-text tools to build powerful learning flows.</ListItem>
          <ListItem>Monitor usage and manage credits via the Edusify Developer Dashboard.</ListItem>
        </List>
      </Section>
    </Wrapper>
  );
};

export default QuizFromTextDocs;
