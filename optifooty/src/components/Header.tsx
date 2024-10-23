import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';
import MoreButton from './MoreButton';
import './DropdownMenu.css';

const Header: React.FC = () => {
    return (
        <nav className="header">
            <div className="header-logo">
                <NavLink to="/">
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
            <div className="header-links">
                <NavLink to="/your-team" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Your Team
                </NavLink>
                <NavLink to="/optimiser" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Optimiser
                </NavLink>
                <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Stats
                </NavLink>
                <MoreButton />
            </div>
        </nav>
    );
};

export default Header;