import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// Props 정의
interface RecruitIconProps {
  recruit: string; // recruit 상태
}

// colorMapping 정의
const colorMapping: Record<string, keyof typeof theme.colors> = {
  모집중: "green",
  모집완료: "red",
  마감임박: "orange",
  지원마감: "blue",
};

const RecruitIcon: React.FC<RecruitIconProps> = ({ recruit }) => {
  // 색상 매핑
  const colorKey = colorMapping[recruit];
    const color = (theme.colors[colorKey] as { 600: string })?.[600];
    const bgcolor = (theme.colors[colorKey] as { 300: string })?.[300];

  return (
    <RecruitWrapper bgcolor={bgcolor}>
      <Text color={color}>{recruit}</Text>
    </RecruitWrapper>
  );
};

export default RecruitIcon;

// 스타일 정의
const RecruitWrapper = styled.div<{ bgcolor: string }>`
    display: flex;
    width: 60px;
    height: 24px;
    padding: 0px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    background: ${({ bgcolor }) => bgcolor};
`;

const Text = styled.div`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  text-align: center;
  word-break: keep-all;
`;
