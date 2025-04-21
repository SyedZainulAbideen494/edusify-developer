import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fadeSlideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Header = styled.header`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  max-width: 1080px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(220, 220, 220, 0.5);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px 16px;
    width: 90%;
  }
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  font-family: 'SF Pro Display', 'Segoe UI', sans-serif;

  span {
    color: #3b82f6;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(120deg, #e3eeff, #d6e8ff);
  color: #1e40af;
  font-size: 0.83rem;
  padding: 6px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.08);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(120deg, #d8e8ff, #c2dcff);
    transform: translateY(-2px);
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 1.7rem;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    color: #374151;
  }
`;

const MobileMenuIcon = styled(FaBars)`
  display: none;
  font-size: 1.4rem;
  color: #4b5563;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(18px);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${fadeSlideDown} 0.2s ease-out;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Header>
      <LogoGroup>
        <Logo src="https://edusify-download.vercel.app/static/media/1722866972968-removebg-preview.7e58008fdb08fcfb6a92.png" alt="Edusify" />
        <Title>
          Edusify <span>Developer</span>
        </Title>
      </LogoGroup>

      <ButtonGroup>
        <Link to='/api-key'>
        <Button>API Key</Button>
        </Link>
        <Link to='/document/get-started'>
        <Button>Docs</Button>
        </Link>
        <Link to='/billing'>
        <Button>Billing</Button>
        </Link>
      </ButtonGroup>

      <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <Dropdown>
          <Link to='/api-key'>
          <Button style={{ width: '100%' }}>API Key</Button>
          </Link>
          <Link to='/document/get-started'>
          <Button style={{ width: '100%' }}>Docs</Button>
          </Link>
          <Link to='/billing'>
          <Button style={{ width: '100%' }}>Billing</Button>
          </Link>
        </Dropdown>
      )}
    </Header>
  );
};

export default DashboardHeader;
