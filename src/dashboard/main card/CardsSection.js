import React, { useState } from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  padding: 0 16px; // ✅ Ensures spacing on small screens

  @media (max-width: 768px) {
    width: 92%;
  }
`;

const CardsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 32px 0;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px 24px;
  min-height: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
    min-height: 180px;
  }
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #888;
  margin-bottom: 12px;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6; /* Accent color on hover */
  }
`;

const Stat = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardsSection = () => {
  const [filter, setFilter] = useState('today');

  return (
    <OuterWrapper>
      <CardsWrapper>
        <Card>
          <Title>My Credit</Title>
          <Stat>₹ 12,500</Stat>
        </Card>

        <Card>
          <Title>
            API Calls ({filter === 'today' ? 'Today' : filter === '7d' ? 'Last 7 Days' : 'Last 30 Days'})
          </Title>
          <Stat>35</Stat>
        </Card>

        <Card>
          <Title>Other Info</Title>
          <Stat>Coming Soon</Stat>
        </Card>
      </CardsWrapper>
    </OuterWrapper>
  );
};

export default CardsSection;
