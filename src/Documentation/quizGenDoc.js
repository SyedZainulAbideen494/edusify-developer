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

const QuizApiDocs = () => {
  return (
    <Wrapper>
      <NavBarDoc/>
<Title>Edusify API — Generate Quiz from Topic & Subject</Title>

<Paragraph>
  The Edusify Quiz Generator API lets you generate 15 multiple-choice questions based on a specific subject and topic. Perfect for educational apps, learning platforms, or personal study tools.
</Paragraph>


      <Section>
        <SubTitle>Pricing</SubTitle>
        <Paragraph>
          Each API call costs ₹1.5. You are only charged when the API is used. There are no hidden fees.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Endpoint</SubTitle>
        <CodeBlock>POST https://srv594954.hstgr.cloud/api/quiz-from-topic-subject</CodeBlock>
      </Section>

      <Section>
        <SubTitle>Authentication</SubTitle>
        <Paragraph>
          Authentication is done via an API key. Include your <InlineCode>apiKey</InlineCode> in the request body.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Request Body</SubTitle>
        <CodeBlock>{`{
  "apiKey": "your-api-key-here",
  "subject": "Biology",
  "topic": "Photosynthesis"
}`}</CodeBlock>
        <List>
          <ListItem><strong>apiKey</strong>: Your unique Edusify developer API key (required)</ListItem>
          <ListItem><strong>subject</strong>: Example values include "Physics", "Biology", "Maths"</ListItem>
          <ListItem><strong>topic</strong>: Example topics include "Kinematics", "Trigonometry", "Photosynthesis"</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Example Response</SubTitle>
        <CodeBlock>{`{
  "success": true,
  "quiz": [
    {
      "question": "What is the main product of photosynthesis?",
      "options": ["Oxygen", "Carbon dioxide", "Glucose", "Water"],
      "correct_answer": "Glucose"
    },
    {
      "question": "Which pigment absorbs sunlight in plants?",
      "options": ["Chlorophyll", "Xylem", "Phloem", "Mitochondria"],
      "correct_answer": "Chlorophyll"
    },
    {
      "question": "Where does photosynthesis occur in a plant cell?",
      "options": ["Chloroplast", "Nucleus", "Mitochondria", "Cytoplasm"],
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
          This response is returned when the API key is invalid or if there is an error during processing after retries.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Example — React Code</SubTitle>
        <CodeBlock>{`const generateQuiz = async () => {
  const response = await fetch('https://srv594954.hstgr.cloud/api/quiz-from-topic-subject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'your-api-key-here',
      subject: 'Biology',
      topic: 'Photosynthesis',
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
        <SubTitle>Coming Soon — Multi-language Examples</SubTitle>
        <Paragraph>
          We are in the process of adding support for additional languages. Upcoming examples include:
        </Paragraph>
        <List>
          <ListItem>Python (requests)</ListItem>
          <ListItem>cURL</ListItem>
          <ListItem>Node.js (fetch or axios)</ListItem>
        </List>
      </Section>
      <Section>
  <SubTitle>Error Codes Reference</SubTitle>
  <Paragraph>
    Below is a list of possible error codes returned by the API and their meanings.
  </Paragraph>
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
        <Td>400</Td>
        <Td>Bad Request — Missing or invalid fields</Td>
        <Td>Missing apiKey, subject, or topic</Td>
      </Tr>
      <Tr>
        <Td>401</Td>
        <Td>Unauthorized — Invalid API Key</Td>
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
          <ListItem>Directly integrate the quiz data into your app’s UI or database.</ListItem>
          <ListItem>The API will return exactly 15 questions per call.</ListItem>
          <ListItem>This API can be used in combination with Edusify's other features, such as the PDF generator or AI assistant tools.</ListItem>
          <ListItem>Ensure your API key is kept secure, and monitor usage via the Edusify dashboard.</ListItem>
        </List>
      </Section>
    </Wrapper>
  );
};

export default QuizApiDocs;

