import React from "react";
import styled from "styled-components";

interface CommentBlockProps {
  name: string;
  timestamp: string;
  content: string;
  isReply?: boolean;
}

const CommentBlock: React.FC<CommentBlockProps> = ({
  name,
  timestamp,
  content,
  isReply = false,
}) => {
  return (
    <BlockContainer isReply={isReply}>
      <BlockTop>
        <UserIcon>👤</UserIcon>
        <NameText>{name}</NameText>
        <TimestampText>{new Date(timestamp).toISOString().split("T")[0]}</TimestampText>
      </BlockTop>
      <BlockBottom>{content}</BlockBottom>
    </BlockContainer>
  );
};

export default CommentBlock;

const BlockContainer = styled.div<{ isReply: boolean }>`
  display: flex;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  background: ${({ theme, isReply }) =>
    isReply ? theme.colors.orange[300] : theme.colors.white};
`;

const BlockTop = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

const UserIcon = styled.div`
  font-size: 20px;
`;

const NameText = styled.div`
  margin-right: 4px;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  color: ${({ theme }) => theme.colors.black};
`;

const TimestampText = styled.div`
  font-size: ${({ theme }) => theme.typography.T7.fontSize};
  font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const BlockBottom = styled.div`
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
  color: ${({ theme }) => theme.colors.black};
`;
