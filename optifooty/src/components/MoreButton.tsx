import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import './MoreButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MoreButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Assuming useAuth provides user data
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="more-button-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="more-button">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </button>
      {isOpen && <DropdownMenu closeDropdown={closeDropdown} />}
    </div>
  );
};

export default MoreButton;