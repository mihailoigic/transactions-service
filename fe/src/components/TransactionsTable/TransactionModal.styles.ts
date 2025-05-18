import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: "white";
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  opacity: 1;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: "#333333";
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: "#666666";
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid "#e0e0e0";
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: "#2563eb";
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid "#e0e0e0";
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;
  color: black;

  &:focus {
    border-color: "#2563eb";
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const CancelButton = styled(Button)`
  background-color: gray200;
  color: "#333333";
  border: none;

  &:hover {
    background-color: "#d1d5db";
  }
`;

export const SubmitButton = styled(Button)`
  background-color: "#2563eb";
  color: white;
  border: none;

  &:hover {
    background-color: "#1d4ed8";
  }
`;
