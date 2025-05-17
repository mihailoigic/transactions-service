"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Transaction } from "@/types/transaction.interface";
import { appConfig } from "@/config/app.config";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #f4f4f4;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 5px 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: white;

  &.add {
    background-color: #4caf50;
  }

  &.edit {
    background-color: #2196f3;
  }

  &.delete {
    background-color: #f44336;
  }
`;

const ActionBar = styled.div`
  margin-bottom: 1rem;
  text-align: right;
`;

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [categoryFilter, statusFilter, transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        `${appConfig.apiBaseUrl}/transactions`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const filterTransactions = () => {
    let result = [...transactions];
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }
    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }
    setFiltered(result);
  };

  const handleAdd = () => {};

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {};

  const uniqueCategories = Array.from(
    new Set(transactions.map((t) => t.category))
  );

  return (
    <div>
      <ActionBar>
        <Button className="add" onClick={handleAdd}>
          Add Transaction
        </Button>
      </ActionBar>

      <FilterContainer>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
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
          {filtered.map((t) => (
            <Tr key={t.id}>
              <Td>{t.date}</Td>
              <Td>${t.amount.toFixed(2)}</Td>
              <Td>{t.category}</Td>
              <Td>{t.status}</Td>
              <Td>
                <Button className="edit" onClick={() => handleEdit(t.id)}>
                  Edit
                </Button>
                <Button className="delete" onClick={() => handleDelete(t.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
