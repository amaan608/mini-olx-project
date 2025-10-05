import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Import the corresponding CSS file

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout for a clean user experience
  };

  return (
    <nav className="navbar">
      {/* Left side of the Navbar with the brand logo/name */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          MiniOLX
        </Link>
      </div>

      {/* Right side of the Navbar with conditional links */}
      <div className="navbar-right">
        {user ? (
          // If a user is logged in, show this content
          <>
            <span>Hello, {user.username}</span>
            <Link to="/products/new" className="sell-button-link">
              <button className="sell-button">+ SELL</button>
            </Link>
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </>
        ) : (
          // If no user is logged in, show this content
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;