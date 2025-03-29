import React, { useState } from "react";
import { processTransaction } from "../../services/BankService";

interface WithdrawalProps {
  userId: number;
}

const Withdrawal: React.FC<WithdrawalProps> = ({ userId }) => {
  const [amount, setAmount] = useState<number>(0);
  const [branch, setBranch] = useState<string>("Downtown Toronto");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (amount <= 0) {
      return setError("Withdrawal amount must be positive.");
    }
    try {
      const res = await processTransaction(userId, branch, { type: "withdrawal", amount, date: "", branch });
      setSuccess(`Withdrawal successful! Branch ${branch} new cash limit: $${res.branch.cashLimit}`);
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div>
      <h3>Cash Withdrawal</h3>
      <form onSubmit={handleWithdrawal}>
        <div>
          <label>Amount ($): </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Branch: </label>
          <select value={branch} onChange={e => setBranch(e.target.value)}>
            <option value="Downtown Toronto">Downtown Toronto</option>
            <option value="East York">East York</option>
            <option value="Scarborough">Scarborough</option>
            <option value="North York">North York</option>
            <option value="Etobicoke">Etobicoke</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
};

export default Withdrawal;
