export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  transactions?: Transaction[];
}

export interface Transaction {
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  branch: string;
}

export interface Branch {
  name: string;
  cashLimit: number;
}

export interface Account {
  number: string; // unique chequing account number
  balance: number;
}
