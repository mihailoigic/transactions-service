import { TransactionsResponse } from "@/types/transaction.interface";
import { Category } from "@/types/category.interface";
import { appConfig } from "@/config/app.config";
import TransactionsTable from "@/components/TransactionsTable";

async function fetchTransactions(): Promise<TransactionsResponse> {
  const res = await fetch(`${appConfig.apiBaseUrl}/transactions`, {
    cache: "no-store",
  });
  return res.json();
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${appConfig.apiBaseUrl}/categories`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function TransactionsTableWrapper() {
  const transactions = await fetchTransactions();
  const categories = await fetchCategories();

  return (
    <TransactionsTable
      initialTransactions={transactions}
      initialCategories={categories}
    />
  );
}
