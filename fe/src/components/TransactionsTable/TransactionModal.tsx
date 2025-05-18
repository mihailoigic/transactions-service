"use client";

import React from "react";
import { Category } from "@/types/category.interface";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from "./TransactionModal.styles";
import { appConfig } from "@/config/app.config";
import axios from "axios";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const [formData, setFormData] = React.useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    categoryId: categories[0]?.id || "",
    status: "pending",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      categoryId: categories.find((c) => c.id === formData.categoryId)!.id,
      status: formData.status as "pending" | "completed",
    };

    try {
      await axios.post(`${appConfig.apiBaseUrl}/transactions`, {
        ...transaction,
      });
      window.location.reload();
    } catch {
      alert("Addition of transaction failed");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Add New Transaction</ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Amount</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">Add Transaction</SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TransactionModal;
