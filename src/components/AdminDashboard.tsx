import React, { useState, useEffect } from "react";
import BranchManagement from "./AdminDashboard/BranchManagement";
import { getTransactions, getBranches } from "../services/BankService";
import { Transaction, Branch, User } from "../types";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount ($)</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>{new Date(t.date).toLocaleString()}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <BranchManagement branches={branches} setBranches={setBranches} />
    </div>
  );
};

export default AdminDashboard;
