import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../app_modules/apiRoutes";

// Styled Components for Refined, Professional Look

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px; // Shrink the page width
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif; // Clean and professional font
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 1px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 0 20px;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    color: #000;
  }
`;

const AmountInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px; // Limit input container width for balance
  margin-bottom: 30px;
`;

const AmountInput = styled.input`
  padding: 15px;
  font-size: 1.2rem;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 12px;
  outline: none;
  background-color: #f9f9f9;
  transition: 0.3s ease;
  
  &:focus {
    border-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const PayButton = styled.button`
  padding: 15px;
  background-color: #333;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    background-color: #444;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  color: #333;
  margin-top: 30px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const TableHead = styled.thead`
  background-color: #f7f7f7;
`;

const Th = styled.th`
  padding: 18px;
  text-align: left;
  color: #333;
  font-weight: 700;
`;

const Td = styled.td`
  padding: 18px;
  color: #666;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
`;

const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 1.5rem;
    color: #999;
  }
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
`;

const BillingPage = () => {
  const [amount, setAmount] = useState("");
  const [logs, setLogs] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
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
      setLoading(false);
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
        theme: { color: "#333" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <PageWrapper>
      <BackButtonContainer>
        <BackButton onClick={() => navigate("/")}>← Back</BackButton>
      </BackButtonContainer>
      
      <Title>Add Credits</Title>

      {loading && <div>Loading...</div>}

      <AmountInputContainer>
        <AmountInput
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (₹)"
        />
        <PayButton onClick={handlePayment}>Add Credit</PayButton>
      </AmountInputContainer>

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
                  <Td>{log.payment_id}</Td>
                  <Td>{log.order_id}</Td>
                  <Td>{new Date(log.created_at).toLocaleString()}</Td>
                </tr>
              ))
            ) : (
              <EmptyRow>
                <td colSpan="5">No billing logs found.</td>
              </EmptyRow>
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default BillingPage;
