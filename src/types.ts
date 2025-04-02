export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  account?: Account;
  transactions?: Transaction[];
}

export interface Transaction {
  id?: number;
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  balance: number;
  userEmail: string;
  branchName?: string;
}

export interface Branch {
  name: string;
  cashLimit: number;
}

export interface Account {
  number: string; // unique chequing account number
  balance: number;
}
