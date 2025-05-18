import { Category } from "./category.interface";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: Category;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}
