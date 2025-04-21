import React from 'react';
import styled from 'styled-components';
import NavBarDoc from './NavBarDoc';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #111827;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
  font-weight: 500;
`;

const WhyEdusifyAPI = () => {
  return (
    <Wrapper>
      <NavBarDoc />
      <Title>Why Edusify API?</Title>

      <Paragraph>
        Edusify API is powered by our proprietary education intelligence engine — built from the ground up to understand, transform, and generate academic content with unmatched precision. It's not a wrapper or a prompt layer — it's a full-stack AI built exclusively for the world of education.
      </Paragraph>

      <SubTitle>🎯 1. Built for Education, Not Adapted for It</SubTitle>
      <Paragraph>
        General-purpose AI models weren't trained to deeply understand academic subjects, exam formats, or student psychology. Edusify was. Every output is aligned with real student needs — whether you're generating <Highlight>quizzes, flashcards, assignments, or notes</Highlight>.
      </Paragraph>

      <SubTitle>⚡ 2. Instant, Clean, and Structured Results</SubTitle>
      <Paragraph>
        No prompt tweaking, no formatting logic, no trial and error. Edusify delivers ready-to-use content that's already structured and student-friendly:
        <ul>
          <li>📒 Notes → HTML with headings, subtopics, key points</li>
          <li>❓ Quizzes → well-formed MCQs with answers & difficulty</li>
          <li>💡 Flashcards → concept-by-concept explanations</li>
        </ul>
      </Paragraph>

      <SubTitle>💸 3. Designed to Scale — Without Scaling Your Costs</SubTitle>
      <Paragraph>
        Edusify uses its own optimized language engine designed to operate cost-efficiently at scale. Our pricing starts as low as <Highlight>₹1.5 per call</Highlight> — enabling you to build high-volume education apps without burning your budget.
      </Paragraph>

      <SubTitle>🚀 4. 10x Faster to Integrate</SubTitle>
      <Paragraph>
        No AI background required. Just hit our endpoints with a topic or a PDF, and you get back beautiful, structured academic content. You save weeks of dev time that would otherwise go into prompt tuning, output parsing, and edge case handling.
      </Paragraph>

      <SubTitle>🏗️ 5. More Than a Model — It's an Education Engine</SubTitle>
      <Paragraph>
        Edusify isn't just smart — it's specialized. Our system is constantly learning from real student usage to improve accuracy, depth, and relevance. The intelligence powering it isn't general AI — it's education-native AI that understands how students learn and what content truly helps them.
      </Paragraph>

      <SubTitle>🎯 Who’s It For?</SubTitle>
      <Paragraph>
        <ul>
          <li>✅ Edtech startups building smarter platforms</li>
          <li>✅ Coaching centers going digital</li>
          <li>✅ Developers creating self-study tools</li>
          <li>✅ AI products targeting students & parents</li>
        </ul>
      </Paragraph>

      <SubTitle>💡 TL;DR</SubTitle>
      <Paragraph>
        <strong>Edusify API is the fastest way to turn any input — topic or PDF — into intelligent, student-ready content.</strong> It's not a tool you build on top of — it's the foundation you build with.
      </Paragraph>
    </Wrapper>
  );
};

export default WhyEdusifyAPI;
