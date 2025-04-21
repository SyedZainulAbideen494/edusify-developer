import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { API_ROUTES } from "../app_modules/apiRoutes";

// Styled Components
const PageWrapper = styled.div`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  padding: 10px 15px;
  background: transparent;
  border: 2px solid #000;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: white;
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AmountInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 220px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #000;
    outline: none;
    box-shadow: 0 0 0 2px #00000011;
  }
`;

const PayButton = styled.button`
  padding: 10px 20px;
  background: #000;
  color: white;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
`;

const TableHead = styled.thead`
  background-color: #f9f9f9;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.95rem;
  white-space: nowrap;
  border-bottom: 1px solid #eee;
`;

const TdEllipsis = styled(Td)`
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 1.5rem;
    color: #999;
  }
`;

export default function BillingPage() {
  const [amount, setAmount] = useState("");
  const [logs, setLogs] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(true);  // State for loading
  const navigate = useNavigate();  // Using useNavigate for back navigation

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const fetchLogs = async () => {
    setLoading(true);  // Show loading spinner
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.post(`${API_ROUTES.baseURL}/get-billing-logs`, { token });

      if (Array.isArray(data.logs)) {
        setLogs(data.logs);
      } else if (data.logs && typeof data.logs === "object") {
        setLogs([data.logs]);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch billing logs:", err);
      setLogs([]);
    } finally {
      setLoading(false);  // Hide loading spinner once the data is fetched
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handlePayment = async () => {
    const amt = parseInt(amount);
    if (!razorpayLoaded) return alert("Razorpay is still loading...");
    if (isNaN(amt) || amt < 50 || amt > 10000) {
      return alert("Amount must be between ₹50 and ₹10,000.");
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in first.");

      const { data } = await axios.post(`${API_ROUTES.baseURL}/create-order/api`, {
        amount: amt,
        token,
      });

      const options = {
        key: "rzp_live_jPX6SxetQbApHC",
        amount: data.order.amount,
        currency: "INR",
        name: "Edusify API Billing",
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post(`${API_ROUTES.baseURL}/verify-order/api`, {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            token,
            amount: amt,
          });
          alert("Credits added!");
          fetchLogs();
        },
        theme: { color: "#000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again.");
    }
  };
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
  
  
      // If no token, redirect to login
      if (!token) {
        console.log('No token found, redirecting to sign-up.');
        navigate('/sign-up');
        return;
      }
  
      try {
        const response = await axios.post(API_ROUTES.userSessionAut, { token });
  
        if (!response.data.valid) {
          console.log('Invalid token, redirecting to sign-up.');
          navigate('/sign-up');
        }
      } catch (error) {
        console.error('Error during token validation:', error);
        navigate('/sign-up');
      }
    };
  
    // Delay the validation by 5 seconds
    const timeoutId = setTimeout(() => {
      validateToken();
    }, 500);
  
    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  
  return (
    <PageWrapper>
      {/* Header with Back Button */}
      <Header>
        <BackButton onClick={() => navigate('/')}>Back</BackButton>
        <Title>Add Credits</Title>
      </Header>

      {/* Loader */}
      {loading && <LoadingSpinner />}

      {/* Input Row for Payment */}
      <InputRow>
        <AmountInput
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (₹)"
        />
        <PayButton onClick={handlePayment}>Add Credit</PayButton>
      </InputRow>

      {/* Billing History Section */}
      <SectionTitle>Billing History</SectionTitle>
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <tr>
              <Th>#</Th>
              <Th>Amount (₹)</Th>
              <Th>Payment ID</Th>
              <Th>Order ID</Th>
              <Th>Date</Th>
            </tr>
          </TableHead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <tr key={log.id || idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{log.amount}</Td>
                  <TdEllipsis>{log.payment_id}</TdEllipsis>
                  <TdEllipsis>{log.order_id}</TdEllipsis>
                  <Td>{new Date(log.created_at).toLocaleString()}</Td>
                </tr>
              ))
            ) : (
              <EmptyRow>
                <td colSpan="6">No billing logs found.</td>
              </EmptyRow>
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
}
