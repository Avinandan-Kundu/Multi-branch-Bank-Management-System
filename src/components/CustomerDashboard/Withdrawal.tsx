import React, { useState } from "react";
import { withdrawFromAccount } from "../../services/BankService";

interface WithdrawalProps {
  userId: string;
}

const Withdrawal: React.FC<WithdrawalProps> = ({ userId }) => {
  const [amount, setAmount] = useState<number>(0);
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
      const res = await withdrawFromAccount(userId, amount);
      setSuccess(
        `Withdrawal successful. New balance: $${res.customer.balance}, Branch balance: $${res.branch.balance}`
      );
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <h3>Withdrawal</h3>
      <form onSubmit={handleWithdrawal}>
        <div>
          <label>Amount ($): </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
};

export default Withdrawal;
