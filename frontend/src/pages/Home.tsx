import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <GlobalWrapper>
      <Header />
      <Content>
        <ChatBubble align="left" delay={0}>
          어느 교수님께 개별 연구를 신청해야 할지 모르겠어 ㅠㅠ
        </ChatBubble>
        <ChatBubble align="right" delay={0.5}>
          지금 어느 랩이 인턴 모집 중이지??
        </ChatBubble>
        <ChatBubble align="left" delay={1}>
          이제는 진짜 졸업연구 해야 졸업할 수 있는데...
        </ChatBubble>
      </Content>
      <MiddleSection>
        <Title delay={1.5}>이런 쪼랩 학부생들을 위한 플랫폼!</Title>
        <LogoWrapper delay={2}>
          <Logo />
        </LogoWrapper>
      </MiddleSection>
      <Footer />
    </GlobalWrapper>
  );
};

export default Home;

// Keyframes for slide-in animation
const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.orange[100]};
`;

const Content = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 10%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ChatBubble = styled.div<{ align: "left" | "right"; delay: number }>`
  position: relative;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  text-align: ${({ align }) => (align === "left" ? "left" : "right")};
  align-self: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  margin: 10px 0;
  border-radius: ${({ align }) =>
    align === "left" ? "20px 20px 20px 0" : "20px 20px 0 20px"};

  /* Animation */
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${({ delay }) => `${delay}s`};
  animation-fill-mode: both; /* Animation 이후 상태 유지 */
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  gap: 20px;
  padding: 40px 0;
`;

const Title = styled.div<{ delay: number }>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 72px;
  font-weight: 900;
  text-align: center;

  /* Animation */
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${({ delay }) => `${delay}s`};
  animation-fill-mode: both;
`;

const LogoWrapper = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Animation */
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${({ delay }) => `${delay}s`};
  animation-fill-mode: both;
`;

const Logo = styled.div`
  width: 500px;
  height: 200px;
  background-image: url("/assets/logo.png"); /* 로고 이미지 경로 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
