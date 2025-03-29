import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="home-container">
        <header className="navbar">
          <div className="logo">
            <img 
              src="/bank_logo.jpg" 
              alt="People's Choice Bank Logo" 
              className="logo-image"
            />
          </div>
          <nav className="nav-buttons">
            <button 
              className="nav-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </nav>
        </header>
        <main className="welcome-section">
          <h1 className="welcome-title">Welcome to People's Choice Bank</h1>
          <p className="welcome-subtitle">Your trusted financial partner for modern banking solutions.</p>
        </main>
      </div>
    </div>
  );
};

export default Home;