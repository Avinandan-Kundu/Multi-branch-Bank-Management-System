import React, { useState } from "react";
import { signupUser } from "../services/BankService";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim() === "") {
      return setError("Name cannot be empty.");
    }
    if (!validateEmail(email)) {
      return setError("Invalid email address.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    const newUser: User = { id: 0, name, email, password, role, transactions: [] };
    try {
      await signupUser(newUser);
      navigate("/login");
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role: </label>
          <select value={role} onChange={e => setRole(e.target.value as "customer" | "admin")}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;