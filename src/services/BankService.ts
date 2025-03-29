import { User, Transaction, Branch, Account } from "../types";

let users: User[] = [];
let branches: Branch[] = [
  { name: "Downtown Toronto", cashLimit: 1000000 },
  { name: "East York", cashLimit: 750000 },
  { name: "Scarborough", cashLimit: 500000 },
  { name: "North York", cashLimit: 800000 },
  { name: "Etobicoke", cashLimit: 600000 },
];

// Simulate user signup
export const signupUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Check if email already exists
    if (users.find(u => u.email === user.email)) {
      return reject("Email already in use.");
    }
    user.id = users.length + 1;
    user.transactions = [];
    users.push(user);
    resolve(user);
  });
};

// Simulate login
export const loginUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      resolve(user);
    } else {
      reject("Invalid email or password.");
    }
  });
};

// Simulate deposit/withdrawal and update branch cash
export const processTransaction = (
  userId: number,
  branchName: string,
  transaction: Transaction
): Promise<{ user: User; branch: Branch }> => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === userId);
    const branch = branches.find(b => b.name === branchName);
    if (!user || !branch) {
      return reject("User or branch not found.");
    }
    if (transaction.type === "withdrawal") {
      if (transaction.amount > branch.cashLimit) {
        return reject(`Withdrawal amount exceeds branch limit. Please choose a branch with sufficient funds.`);
      }
      branch.cashLimit -= transaction.amount;
    } else {
      branch.cashLimit += transaction.amount; // For deposits, add cash (if needed)
    }
    user.transactions?.push({ ...transaction, date: new Date().toISOString() });
    resolve({ user, branch });
  });
};

// Simulate admin replenishing branch cash
export const replenishBranch = (branchName: string, amount: number): Promise<Branch> => {
  return new Promise((resolve, reject) => {
    const branch = branches.find(b => b.name === branchName);
    if (!branch) {
      return reject("Branch not found.");
    }
    branch.cashLimit += amount;
    resolve(branch);
  });
};

// Fetch branches data
export const getBranches = (): Promise<Branch[]> => {
  return Promise.resolve(branches);
};

// Fetch transactions for a user or all (admin)
export const getTransactions = (userId?: number): Promise<Transaction[]> => {
  if (userId) {
    const user = users.find(u => u.id === userId);
    return Promise.resolve(user?.transactions || []);
  } else {
    // For admin: combine all transactions
    const allTransactions = users.reduce<Transaction[]>((acc, curr) => {
      return acc.concat(curr.transactions || []);
    }, []);
    return Promise.resolve(allTransactions);
  }
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