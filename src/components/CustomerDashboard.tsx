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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      // Create default chequing account if not exists
      createDefaultAccount(parsedUser.id)
        .then((acc: Account) => {
          setAccount(acc);
        })
        .catch(console.error);

      // Fetch transaction history
      getTransactions(parsedUser.id)
        .then((t: Transaction[]) => setTransactions(t))
        .catch(console.error);
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
          <h2>Welcome, {user.name}</h2>
          {account && (
            <div className="account-info">
              <p>
                Chequing Account Number: <strong>{account.number}</strong>
              </p>
              <p>
                Balance: <strong>${account.balance.toFixed(2)}</strong>
              </p>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </header>
      )}

      <div className="dashboard-nav">
        <button onClick={() => setActiveTab("deposit")}>Deposit</button>
        <button onClick={() => setActiveTab("withdrawal")}>Withdrawal</button>
        <button onClick={() => setActiveTab("history")}>Transaction History</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "deposit" && <Deposit userId={user?.id!} />}
        {activeTab === "withdrawal" && <Withdrawal userId={user?.id!} />}
        {activeTab === "history" && <TransactionHistory transactions={transactions} />}
      </div>
    </div>
  );
};

export default CustomerDashboard;
