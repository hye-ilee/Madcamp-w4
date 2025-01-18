import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// Props 정의
interface RecruitIconProps {
  recruit: string; // recruit 상태
}

// colorMapping 정의
const colorMapping: Record<string, keyof typeof theme.colors> = {
  개별연구: "green",
  랩인턴: "turkey",
  졸업연구: "blue",
  모집X: "red",
};

const RecruitIcon: React.FC<RecruitIconProps> = ({ recruit }) => {
  // 색상 매핑
  const colorKey = colorMapping[recruit];
    const color = (theme.colors[colorKey] as { 600: string })?.[600];

  return (
    <RecruitWrapper color={color}>
      <Text>{recruit}</Text>
    </RecruitWrapper>
  );
};

export default RecruitIcon;

// 스타일 정의
const RecruitWrapper = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  width: 60px;
  padding: 2px 6px;
  border-radius: 16px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
  text-align: center;
`;
