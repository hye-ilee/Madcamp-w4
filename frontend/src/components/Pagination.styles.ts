import styled from "styled-components";

export const PaginationButton = styled.button<{ filled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: ${({ filled, theme }) =>
    filled ? theme.colors.primary : theme.colors.white};
  color: ${({ filled, theme }) =>
    filled ? theme.colors.white : theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.T3.fontSize};
  font-weight: ${({ theme }) => theme.typography.T3.fontWeight};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.5;
  }
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 0px;
  padding: 8px;
  border-radius: 8px;
`;