import React, { useState } from "react";
import { Branch } from "../../types";
import API from "../../services/api";

interface BranchManagementProps {
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

const BranchManagement: React.FC<BranchManagementProps> = ({ branches, setBranches }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>(branches[0]?.name || "");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleReplenish = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const response = await API.patch(`/branches/${selectedBranch}/reset`, { amount });
      const updatedBranch = response.data;
      
      const updatedBranches = branches.map(b => 
        b.name === updatedBranch.name ? updatedBranch : b
      );
      setBranches(updatedBranches);
      setMessage(`Branch ${updatedBranch.name} replenished. New balance: $${updatedBranch.balance}`);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Replenishment failed');
    }
  };

  return (
    <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>Branch Management</h3>
      <form onSubmit={handleReplenish} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "5px" }}>Select Branch:</label>
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            {branches.map((branch, index) => (
              <option key={index} value={branch.name}>
                {branch.name} (Cash Limit: ${branch.cashLimit})
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "5px" }}>Replenish Amount ($):</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button 
            type="submit"
            style={{ 
              padding: "10px 20px",
              marginTop: "10px"
            }}
          >
            Replenish
          </button>
        </div>
      </form>
      {message && (
        <p style={{ 
          marginTop: "15px",
          color: message.includes("successfully") ? "green" : "red",
          textAlign: "center"
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default BranchManagement;