import React, { useState, useEffect } from "react";
import Deposit from "./CustomerDashboard/Deposit";
import Withdrawal from "./CustomerDashboard/Withdrawal";
import TransactionHistory from "./CustomerDashboard/TransactionHistory";
import { User, Transaction, Account } from "../types";
import { getTransactions, createDefaultAccount, logoutUser } from "../services/BankService";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const CustomerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("deposit");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const navigate = useNavigate();

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5005');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'BALANCE_UPDATE') {
        setAccount(prev => {
          if (!prev) return prev;
          return { ...prev, balance: data.balance };
        });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Existing data fetching useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      createDefaultAccount()
        .then((acc: Account) => {
          setAccount(acc);
        })
        .catch(console.error);

      getTransactions(parsedUser.id)
        .then((t: Transaction[]) => setTransactions(t))
        .catch(console.error);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="dashboard-container">
        {/* Existing JSX remains unchanged */}
        {user && (
          <header className="dashboard-header">
            <h2>Welcome, {user.name}!</h2>
            {account && (
              <div className="account-info">
                <p>
                  Chequing Account Number: <strong>{account.number}</strong>
                </p>
                <p>
                  Balance: <strong>${account.balance?.toFixed(2)}</strong>
                </p>
              </div>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </header>
        )}

        <div className="dashboard-nav">
          {/* Navigation buttons remain unchanged */}
          <button
            className={`nav-button ${activeTab === "deposit" ? "active" : ""}`}
            onClick={() => setActiveTab("deposit")}
          >
            Deposit
          </button>
          <button
            className={`nav-button ${activeTab === "withdrawal" ? "active" : ""}`}
            onClick={() => setActiveTab("withdrawal")}
          >
            Withdrawal
          </button>
          <button
            className={`nav-button ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Transaction History
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "deposit" && <Deposit userId={user?.id!} />}
          {activeTab === "withdrawal" && <Withdrawal userId={user?.id!} />}
          {activeTab === "history" && <TransactionHistory transactions={transactions} />}
        </div>

        {/* Bank logo section remains unchanged */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <img 
            src="/bank_logo.jpg" 
            alt="People's Choice Bank Logo" 
            style={{ width: "500px", maxWidth: "100%" }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;