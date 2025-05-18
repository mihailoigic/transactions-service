"use client";
import React, { useEffect, useState } from "react";
import {
  Transaction,
  TransactionsResponse,
} from "@/types/transaction.interface";
import { Category } from "@/types/category.interface";
import {
  ActionBar,
  Button,
  FilterContainer,
  Select,
  Table,
  Tr,
  Th,
  Td,
  Text,
  Wrapper,
} from "./TransactionsTable.styles";
import TransactionModal from "./TransactionModal";
import axios from "axios";
import { appConfig } from "@/config/app.config";

const TransactionsTable: React.FC<{
  initialTransactions: TransactionsResponse;
  initialCategories: Category[];
}> = ({ initialTransactions, initialCategories }) => {
  const [filtered, setFiltered] = useState<Transaction[]>(
    initialTransactions.data
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    filterTransactions();
  }, [categoryFilter, statusFilter, initialTransactions]);

  const filterTransactions = () => {
    let result = initialTransactions.data;
    if (categoryFilter !== "all") {
      result = result.filter(
        (transaction) => transaction.category.id === categoryFilter
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(
        (transaction) => transaction.status === statusFilter
      );
    }
    setFiltered(result);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {};

  const handleDelete = async (id: string) => {
    console.log("id", id);
    try {
      await axios.delete(`${appConfig.apiBaseUrl}/transactions/${id}`);
      window.location.reload();
    } catch {
      alert("Deletion of transaction failed");
    }
  };

  return (
    <Wrapper>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={initialCategories}
      />
      <ActionBar>
        <Button className="add" onClick={handleAdd}>
          +
        </Button>

        <FilterContainer>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {initialCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
        </FilterContainer>
      </ActionBar>

      <Table>
        <thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {filtered.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>${transaction.amount}</Td>
              <Td>{transaction.category.name}</Td>
              <Td>{transaction.status}</Td>
              <Td>
                <Button
                  className="edit"
                  onClick={() => handleEdit(transaction.id)}
                >
                  Edit
                </Button>
                <Button
                  className="delete"
                  onClick={() => handleDelete(transaction.id)}
                >
                  -
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {filtered.length === 0 && (
        <Text>No transactions found for the selected filters.</Text>
      )}
    </Wrapper>
  );
};

export default TransactionsTable;
