import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="app-container">
      <div className="background-image"></div>
      
      <div className="home-container">
        <main className="hero-content">
          <h1 className="welcome-title">Welcome to People's Choice Bank</h1>
          <p className="welcome-subtitle">Your trusted financial partner for modern banking solutions</p>
          
          <img 
            src="/bank_logo.jpg" 
            alt="People's Choice Bank Logo" 
            className="home-logo"
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
