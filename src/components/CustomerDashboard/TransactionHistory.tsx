import React from "react";
import { Transaction } from "../../types";
import "./TransactionHistory.css";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tx.type}</td>
                <td>{tx.amount.toFixed(2)}</td>
                {/* <td>{new Date(tx.date).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
