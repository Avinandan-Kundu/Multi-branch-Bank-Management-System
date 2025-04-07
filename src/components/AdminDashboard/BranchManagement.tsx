import React from "react";
import { Branch } from "../../types";
import { resetBranchBalance } from "../../services/BankService";

// ✅ Define props interface
interface BranchManagementProps {
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

// ✅ Use props properly
const BranchManagement: React.FC<BranchManagementProps> = ({ branches, setBranches }) => {
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (branches.length > 0) {
      setSelectedBranchId(branches[0]._id);
    }
  }, [branches]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!selectedBranchId) return;

    try {
      const result = await resetBranchBalance(selectedBranchId);
      const updated = branches.map((b) =>
        b._id === selectedBranchId ? result.branch : b
      );
      setBranches(updated);
      setMessage(
        `Branch "${result.branch.location}" reset to cash limit: $${result.branch.cash_limit}`
      );
    } catch (err: any) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Failed to reset branch.");
      }
    }
  };

  return (
    <div>
      <h3>Branch Cash Reset</h3>
      <form onSubmit={handleReset}>
        <label>Select Branch: </label>
        <select
          value={selectedBranchId}
          onChange={(e) => setSelectedBranchId(e.target.value)}
        >
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.location}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Reset Branch Balance</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default BranchManagement;
