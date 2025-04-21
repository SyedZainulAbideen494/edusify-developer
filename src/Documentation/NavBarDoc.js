import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const links = [
  {
    group: 'Get Started',
    items: [
      { name: 'Introduction', path: '/document/get-started' },
      { name: 'API Key', path: '/api-key' },
      { name: 'Billing', path: '/billing' },
    ],
  },
  {
    group: 'Quiz APIs',
    items: [
      { name: 'Quiz from Topic', path: '/document/api/quiz-topic' },
      { name: 'Quiz from Exam', path: '/document/api/quiz-exam' },
      { name: 'Quiz from PDF', path: '/document/api/pdf-to-quiz' },
      { name: 'Quiz from Text', path: '/document/api/quiz-from-text' },
    ],
  },
  {
    group: 'Flashcard APIs',
    items: [
      { name: 'Flashcards from Topic', path: '/document/api/flashcards-from-topic' },
      { name: 'Flashcards from Text', path: '/document/api/flashcards-from-text' },
      { name: 'Flashcards from PDF', path: '/document/api/pdf-to-flashcard' },
    ],
  },
  {
    group: 'More',
    items: [
      { name: 'Dashboard', path: '/' },
    ],
  },
];

// Styled Components (same as before)

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 1100px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  padding: 0.5rem 2rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

const Burger = styled.div`
  font-size: 1.35rem;
  color: #1a1a1a;
  cursor: pointer;
  z-index: 1001;
  transition: opacity 0.3s;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 14px);
  right: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: ${({ open }) => (open ? '1.2rem 1.5rem' : '0')};
  max-height: ${({ open }) => (open ? '320px' : '0')};
  overflow-y: ${({ open }) => (open ? 'auto' : 'hidden')};
  overflow-x: hidden;
  width: 250px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  /* Custom Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;


const GroupTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  margin: 1rem 0 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DropdownLink = styled.div`
  padding: 6px 0 6px 10px;
  font-size: 0.93rem;
  color: #1a1a1a;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const NavBarDoc = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <NavbarWrapper>
      <Logo>Edusify Dev</Logo>

      <Burger onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </Burger>

      <Dropdown open={open} ref={dropdownRef}>
        {links.map((group, i) => (
          <div key={i}>
            <GroupTitle>{group.group}</GroupTitle>
            {group.items.map((item, j) => (
              <DropdownLink key={j} onClick={() => handleNavigation(item.path)}>
                {item.name}
              </DropdownLink>
            ))}
          </div>
        ))}
      </Dropdown>
    </NavbarWrapper>
  );
};

export default NavBarDoc;
