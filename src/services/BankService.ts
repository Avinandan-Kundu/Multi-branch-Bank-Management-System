import API from './api';
import { User, Transaction, Branch, Account } from '../types';


// const API = axios.create({
//   baseURL: '/api', // ← Changed to relative path
//   withCredentials: true
// });

// Authentication
export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await API.post('/api/auth/login', { email, pass: password });
  return response.data.customer;
};

export const signupUser = async (user: User): Promise<User> => {
  const response = await API.post('/api/customers', user);
  return response.data;
};

// Transactions
export const processTransaction = async (userId: number, branchName: string, transaction: Transaction) => {
  const response = await API.post(`/api/customers/${userId}/${transaction.type}`, {
    amount: transaction.amount,
    branchName
  });
  return response.data;
};

// Branches
export const getBranches = async (): Promise<Branch[]> => {
  const response = await API.get('/branches');
  return response.data;
};

export const replenishBranch = async (branchName: string, amount: number): Promise<Branch> => {
  const response = await API.patch(`/branches/${branchName}/reset`, { amount });
  return response.data;
};

// Transactions History
export const getTransactions = async (userId?: number): Promise<Transaction[]> => {
  const endpoint = userId ? `/transactions?userId=${userId}` : '/transactions';
  const response = await API.get(endpoint);
  return response.data;
};


export const createDefaultAccount = (): Promise<Account> => {
  return new Promise((resolve) => {
    const accountNumber = 'AC' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const newAccount: Account = { number: accountNumber, balance: 0 };
    resolve(newAccount);
  });
};

export const logoutUser = (): void => {
  localStorage.removeItem("user");
};