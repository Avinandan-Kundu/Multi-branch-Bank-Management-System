import React, { useState, useEffect } from "react";
import BranchManagement from "./AdminDashboard/BranchManagement";
import { getTransactions, getBranches, logoutUser } from "../services/BankService";
import { Transaction, Branch, User } from "../types";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      if (user.role !== "admin") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    getBranches().then(setBranches).catch(console.error);
    getTransactions().then(setTransactions).catch(console.error);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ textAlign: "left", marginBottom: "15px" }}>All Transactions</h3>
          {transactions.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                {/* Table content remains the same */}
              </table>
            </div>
          )}
        </div>

        <BranchManagement branches={branches} setBranches={setBranches} />

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

export default AdminDashboard;