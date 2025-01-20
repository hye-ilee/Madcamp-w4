import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const labTextSrc = `/assets/lab_text.png`;

const Home: React.FC = () => {
  return (
    <GlobalWrapper>
        <Header />
        <Title>모집 중인 <StyledImage src={labTextSrc} alt="Lab Text" /></Title>
        <Footer />
    </GlobalWrapper>
  );
};

export default Home;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  gap: 64px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledImage = styled.img`
  height: 48px; /* 부모 높이에 맞춤 */
  width: auto; /* 비율 유지 */
`;