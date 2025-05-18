import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 3rem auto;
  max-width: calc(100% - 6rem);
  overflow-x: auto;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;

  @media (max-width: 768px) {
    margin: 0;
    border-left: none;
    border-right: none;
    border-radius: 0;
    max-width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  font-size: 0.95rem;
  color: #333;
`;

export const Th = styled.th`
  background: #f5f5f5;
  color: #444;
  padding: 12px 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
  word-break: break-word;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }

  &:hover {
    background-color: #f0f8ff;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  margin: 0.5rem 1rem;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem;
  gap: 1rem;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  transition: background-color 0.2s ease;

  &.add {
    background-color: #388e3c;

    @media (max-width: 768px) {
      width: 90%;
    }

    &:hover {
      background-color: #2e7d32;
    }
  }

  &.edit {
    background-color: #grey;

    &:hover {
      background-color: #grey;
    }
  }

  &.delete {
    background-color: #d32f2f;

    &:hover {
      background-color: #c62828;
    }
  }
`;

export const Text = styled.p`
  text-align: center;
  margin: 30px 0 30px 0;
  font-style: italic;
  color: #888;
`;
