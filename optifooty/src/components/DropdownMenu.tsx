import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DropdownMenu.css';

interface DropdownMenuProps {
  closeDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ closeDropdown }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    closeDropdown();
    navigate('/');
  };
  return (
    <div className="dropdown-menu">
      <div className="dropdown-header">
        {user ? user.user_metadata.userName : 'Guest'}
      </div>
      <button onClick={() => { navigate('/settings'); closeDropdown(); }}>Settings</button>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => { navigate('/login'); closeDropdown(); }}>Login</button>
      )}
    </div>
  );
};

export default DropdownMenu;