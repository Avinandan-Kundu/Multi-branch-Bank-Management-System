import React, { useState } from "react";
import { Branch } from "../../types";
import { replenishBranch } from "../../services/BankService";

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
    if (amount <= 0) {
      return setMessage("Replenishment amount must be positive.");
    }
    try {
      const updatedBranch = await replenishBranch(selectedBranch, amount);
      const updatedBranches = branches.map(b => b.name === updatedBranch.name ? updatedBranch : b);
      setBranches(updatedBranches);
      setMessage(`Branch ${updatedBranch.name} replenished successfully. New cash limit: $${updatedBranch.cashLimit}`);
    } catch (err) {
      setMessage(err as string);
    }
  };

  return (
    <div>
      <h3>Branch Management</h3>
      <form onSubmit={handleReplenish}>
        <div>
          <label>Select Branch: </label>
          <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
            {branches.map((branch, index) => (
              <option key={index} value={branch.name}>
                {branch.name} (Cash Limit: ${branch.cashLimit})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Replenish Amount ($): </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Replenish</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BranchManagement;
