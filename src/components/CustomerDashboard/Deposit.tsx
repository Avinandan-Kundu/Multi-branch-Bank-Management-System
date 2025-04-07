import React, { useState } from "react";
import { depositToAccount } from "../../services/BankService";

interface DepositProps {
  userId: string;
}

const Deposit: React.FC<DepositProps> = ({ userId }) => {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return setError("Deposit amount must be a positive number.");
    }

    try {
      const res = await depositToAccount(userId, parsedAmount);
      setSuccess(
        `Deposit successful. New balance: $${res.customer.balance}, Branch balance: $${res.branch.balance}`
      );
      setAmount(""); // clear input
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
      <h3>Deposit</h3>
      <form onSubmit={handleDeposit}>
        <div>
          <label>Amount ($): </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};

export default Deposit;
