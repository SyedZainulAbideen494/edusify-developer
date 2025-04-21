import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DashboardHeader from './DashboardHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  margin-top: 70px;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CreditCard = styled.div`
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 1px #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CreditInfo = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    justify-content: center;
  }
`;


const CreditProgress = styled.div`
  width: 50%;
  background: #e5e7eb;
  height: 8px;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 1rem;

  @media (max-width: 768px) {
    width: 80%;
    margin-left: 0;
  }
`;

const CreditFill = styled.div`
  height: 100%;
  width: ${props => props.percent || 0}%;
  background: #4f46e5;
  transition: width 0.3s ease;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #f9fafb;
  color: #374151;
  font-size: 0.95rem;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.95rem;
  color: #374151;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
`;

const Status = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => (props.code === 200 ? '#d1fae5' : '#fee2e2')};
  color: ${props => (props.code === 200 ? '#065f46' : '#991b1b')};
`;

const KeyContainer = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const KeyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 500;
  word-break: break-all;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const CopyBtn = styled.button`
  padding: 0.4rem 0.9rem;
  background: #e0e7ff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #3730a3;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #c7d2fe;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddCreditBtn = styled.button`
  padding: 0.5rem 1.2rem;
  background: #4f46e5;
  color: white;
  font-size: 0.9rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #4338ca;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DevDashboard = () => {
  const [apiKey, setApiKey] = useState('');
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate()
  useEffect(() => {
    // Fetch token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Call the backend API to fetch usage logs
      fetch('http://localhost:8080/api/get-usage-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUsageData(data.logs);
          } else {
            console.error('Error fetching logs:', data.error);
          }
        })
        .catch(error => console.error('Error fetching usage logs:', error))
        .finally(() => setLoading(false));
    }
  }, []);
  const [error, setError] = useState('');
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    const fetchCredit = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('Token is missing');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:8080/get-credit', {
          token, // send token in the request body
        });
  
        setCredit(response.data.credit);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching credit:', err);
        setError('Failed to fetch credit. Please try again.');
        setLoading(false);
      }
    };
  
    fetchCredit();
  }, []);
  
  const creditLeft = credit;
  const maxCredit = 100;

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:8080/get-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          setApiKey(data.key);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch API key:', err);
      });
  }, []);

const userApiKey = apiKey
  
  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      alert('API key copied to clipboard!');
    } else {
      alert('No API key to copy!');
    }
  };
  


  return (
    <Container>
      <DashboardHeader/>
      <Section>
        <Title>Credit Summary</Title>
        <CreditCard>
  <CreditInfo>
    💳 <strong style={{ fontSize: '1.5rem' }}>{creditLeft}</strong> credits
  </CreditInfo>
  <AddCreditBtn onClick={() => nav('/billing')}>
    + Add More
  </AddCreditBtn>
</CreditCard>

      </Section>
      <Section>
        <Title>Recent API Activity</Title>
        <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>Timestamp</Th>
            <Th>Endpoint</Th>
            <Th>Status</Th>
            <Th>Cost</Th>
            <Th>Response Time</Th>
          </Tr>
        </thead>
        <tbody>
          {loading ? (
            <Tr><Td colSpan="5">Loading...</Td></Tr>
          ) : (
            usageData.map((entry, idx) => (
              <Tr key={idx}>
                <Td>{entry.timestamp}</Td>
                <Td>{entry.endpoint}</Td>
                <Td><Status code={entry.status}>{entry.status}</Status></Td>
                <Td>{entry.cost}</Td>
                <Td>{entry.response_time}</Td>
              </Tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrapper>
      </Section>
      <Section>
        <Title>Your API Key</Title>
        <KeyContainer>
          <KeyBox>
            {userApiKey}
          </KeyBox>
          <AddCreditBtn  onClick={handleCopy}>
          Copy
           </AddCreditBtn>
        </KeyContainer>
      </Section>
    </Container>
  );
};

export default DevDashboard;
