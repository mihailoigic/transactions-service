"use client";
import TransactionsTable from "@/components/TransactionsTable";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
`;

export default function App() {
  return (
    <div>
      <Title>Transactions</Title>
      <TransactionsTable />
    </div>
  );
}
