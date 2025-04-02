import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

const Navbar: React.FC<{ user?: User }> = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="global-nav">
      <a href="/" className="nav-logo-link">
        <img src="/bank_icon.jpg" alt="Bank Logo" className="nav-logo" />
      </a>
      
      <div className="nav-items">
        {user ? (
          <div className="user-menu-container">
            <button 
              className="user-menu-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                src="/user_account.jpg" 
                alt="Account" 
                className="user-avatar"
              />
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => navigate(user.role === "admin" ? "/admin" : "/customer")}
                >
                  Account Info
                </button>
                <button
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="nav-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
