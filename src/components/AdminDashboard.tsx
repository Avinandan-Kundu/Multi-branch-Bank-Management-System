import React, { useState, useEffect } from "react";
import BranchManagement from "./AdminDashboard/BranchManagement";
import { getBranches } from "../services/BankService";
import { Branch, User } from "../types";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      setUser(userData);
      if (userData.role !== "admin") navigate("/login");
    } else {
      navigate("/login");
    }
    getBranches().then(setBranches).catch(console.error);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="app-container">
      <Navbar user={user} />
      <div className="dashboard-container">
        <h2 className="dashboard-welcome">Welcome, {user.name}!</h2>
        
        <div className="admin-actions">
          <button 
            className="transaction-button"
            onClick={() => navigate("/admin/transactions")}
          >
            View All Transactions
          </button>
        </div>

        <BranchManagement branches={branches} setBranches={setBranches} />
      </div>
    </div>
  );
};

export default AdminDashboard;
