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
    
    try {
      const res = await processTransaction(userId, branch, {
        type: 'withdrawal', // Changed from 'withdraw' to 'withdrawal'
        amount,
        date: new Date().toISOString(),
        branch
      });
      
      setSuccess(`Withdrawal successful! New branch balance: $${res.branch.balance}`);
      setAmount(0);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Withdrawal failed');
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
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label>Branch: </label>
          <select 
            value={branch} 
            onChange={e => setBranch(e.target.value)}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            <option value="Downtown Toronto">Downtown Toronto</option>
            <option value="East York">East York</option>
            <option value="Scarborough">Scarborough</option>
            <option value="North York">North York</option>
            <option value="Etobicoke">Etobicoke</option>
          </select>
        </div>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
        <button 
          type="submit"
          style={{ 
            marginTop: "15px",
            padding: "8px 20px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdrawal;