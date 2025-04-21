import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DashboardHeader from './DashboardHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../app_modules/apiRoutes';
import { formatDistanceToNow } from 'date-fns';


const Section = styled.div`
  margin-bottom: 2.5rem;
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


const Tr = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
`;


const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem 1rem 5rem 1rem;
  font-family: 'Inter', sans-serif;
  margin-top: 80px;
  color: #111;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #0f172a;
  letter-spacing: -0.01em;
`;

const CreditCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const CreditInfo = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AddCreditBtn = styled.button`
  padding: 0.55rem 1.4rem;
  background: linear-gradient(135deg, #6366f1, #4338ca);
  color: white;
  font-weight: 500;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  margin-left: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const KeyContainer = styled.div`
  background: #f9fafb;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const KeyBox = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #334155;
  word-break: break-all;
  background: #fff;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #e5e7eb;
  flex: 1;
`;

const CopyBtn = styled(AddCreditBtn)`
  padding: 0.5rem 1.1rem;
  background: #e0e7ff;
  color: #3730a3;
  font-size: 0.85rem;
  font-weight: 600;
  
  &:hover {
    background: #c7d2fe;
    transform: scale(1.03);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #f9fafb;
  color: #334155;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
`;

const Status = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => (props.code === 200 ? '#ecfdf5' : '#fef2f2')};
  color: ${props => (props.code === 200 ? '#059669' : '#dc2626')};
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
      fetch(`${API_ROUTES.baseURL}/api/get-usage-logs`, {
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
        const response = await axios.post(`${API_ROUTES.baseURL}/get-credit`, {
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
  
    fetch(`${API_ROUTES.baseURL}/get-api-key`, {
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

  
  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
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
<Td>{formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}</Td>
<Td>{entry.endpoint}</Td>
                <Td><Status code={entry.status}>{entry.status}</Status></Td>
                <Td>₹{entry.cost}</Td>
                <Td>{(entry.response_time / 1000).toFixed(2)} sec</Td>
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
