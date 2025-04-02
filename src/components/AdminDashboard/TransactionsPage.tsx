import React, { useEffect, useState } from "react";
import { getTransactions } from "../../services/BankService";
import { Transaction } from "../../types";
import Navbar from "../Navbar";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error);
  }, []);

  return (
    <div className="app-container">
        <Navbar />
      <div className="dashboard-container">
        <h2>All Transactions</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>{t.userEmail}</td>
                  <td>{t.type}</td>
                  <td>${t.amount.toFixed(2)}</td>
                  <td>${t.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
