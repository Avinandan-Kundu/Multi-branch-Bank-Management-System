import React, { useState, useEffect } from "react";
import { signupUser, getAllBranches } from "../services/BankService";
import { Branch, User } from "../types";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBranches().then(setBranches).catch(() => {
      setError("Failed to load branches");
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !pass || !branchId) {
      return setError("All fields are required.");
    }

    try {
      const user: User = await signupUser({
        name,
        email,
        pass,
        balance: 0, // Default balance
        branchId,
      });

      localStorage.setItem("user", JSON.stringify(user));

      // Optional: redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "Signup failed.";
      setError(msg);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />

        <label>Branch:</label>
        <select value={branchId} onChange={(e) => setBranchId(e.target.value)} required>
          <option value="">Select a branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.location}
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
