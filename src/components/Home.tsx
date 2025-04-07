import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="/bank_logo.png" alt="People's Choice Bank Logo" />
        </div>
        <nav className="nav-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </nav>
      </header>
      <main className="welcome-section">
        <h1>Welcome to People's Choice Bank</h1>
        <p>Your trusted financial partner for modern banking solutions.</p>
      </main>
    </div>
  );
};

export default Home;
