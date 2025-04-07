export interface User {
  _id: string;
  name: string;
  email: string;
  pass: string; // backend uses `pass` not `password`
  balance: number;
  branchId: string;
  role?: "customer" | "admin";
  transactions?: Transaction[];
}

export interface Transaction {
  type: "deposit" | "withdrawal";
  amount: number;
  date?: string;
  branch?: string;
}

export interface Branch {
  _id: string;
  location: string;
  cash_limit: number;
  balance: number;
}

export interface Account {
  number: string; // unique chequing account number
  balance: number;
}
