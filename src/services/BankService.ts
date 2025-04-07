import axios from "axios";
import { User } from "../types";

const API_BASE = "http://localhost:5005/api";

// 🔐 Login
export const loginUser = async (email: string, pass: string): Promise<User> => {
  const response = await axios.post(`${API_BASE}/auth/login`, { email, pass });
  return response.data.customer;
};

// 🧾 Signup (creates new user)
export const signupUser = async (user: {
  name: string;
  email: string;
  pass: string;
  balance: number;
  branchId: string;
}): Promise<User> => {
  const response = await axios.post(`${API_BASE}/customers`, user);
  return response.data;
};

// 💰 Deposit
export const depositToAccount = async (customerId: string, amount: number) => {
  const response = await axios.post(`${API_BASE}/customers/${customerId}/deposit`, { amount });
  return response.data;
};

// 💸 Withdraw
export const withdrawFromAccount = async (customerId: string, amount: number) => {
  const response = await axios.post(`${API_BASE}/customers/${customerId}/withdraw`, { amount });
  return response.data;
};

// 🏦 Get all branches (for display or dropdown)
export const getAllBranches = async () => {
  const response = await axios.get(`${API_BASE}/branches`);
  return response.data;
};

// ⚠️ Get branches with low cash
export const getLowCashBranches = async () => {
  const response = await axios.get(`${API_BASE}/branches/warnings/low-cash`);
  return response.data;
};

// 🧯 Reset a branch balance to max
export const resetBranchBalance = async (branchId: string) => {
  const response = await axios.patch(`${API_BASE}/branches/${branchId}/reset`);
  return response.data;
};
export const logoutUser = () => {
  localStorage.removeItem("user");
};
