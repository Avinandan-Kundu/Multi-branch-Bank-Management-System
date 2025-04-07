import React, { useState, useEffect } from "react";
import Deposit from "./CustomerDashboard/Deposit";
import Withdrawal from "./CustomerDashboard/Withdrawal";

import { User } from "../types";
// import { Transaction } from "../types";
import { logoutUser } from "../services/BankService";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const CustomerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("deposit");
  // const [transactions] = useState<Transaction[]>([]); // Placeholder
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {user && (
        <header className="dashboard-header">
          <h2 style={{ textTransform: 'capitalize' }}>Welcome, {user.name}!</h2>
          <p>Balance: ${user.balance.toFixed(2)}</p>
          <button onClick={handleLogout}>Logout</button>
        </header>
      )}

      <div className="dashboard-nav">
        <button onClick={() => setActiveTab("deposit")}>Deposit</button>
        <button onClick={() => setActiveTab("withdrawal")}>Withdrawal</button>
        <button onClick={() => setActiveTab("history")}>Transaction History</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "deposit" && <Deposit userId={user?._id!} />}
        {activeTab === "withdrawal" && <Withdrawal userId={user?._id!} />}
        
      </div>
    </div>
  );
};

export default CustomerDashboard;
