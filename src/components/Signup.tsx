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
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #95e6a9 0%, #709df0 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "auto",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "400px", 
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#003366" }}>Sign Up</h2>
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "5px", color: "#003366" }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "10px", 
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "5px", color: "#003366" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "10px", 
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "5px", color: "#003366" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "10px", 
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "5px", color: "#003366" }}>Role:</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as "customer" | "admin")}
              style={{ 
                width: "100%", 
                padding: "10px", 
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p style={{ color: "red", margin: "5px 0 0 0" }}>{error}</p>}
          <button 
            type="submit"
            style={{ 
              padding: "12px",
              marginTop: "15px",
              backgroundColor: "#003366",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.3s"
            }}
          >
            Sign Up
          </button>
        </form>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <img 
            src="/bank_logo.jpg" 
            alt="People's Choice Bank Logo" 
            style={{ width: "500px", maxWidth: "100%" }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;