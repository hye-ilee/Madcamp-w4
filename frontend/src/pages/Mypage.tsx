import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Mypage: React.FC = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.user);
  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  let user;
  if (userData) {
    if ('studentid' in userData) {
      user = {
          email: String(userData.email),
          name: String(userData.name),
          studentid: String(userData.studentid),
          major: String(userData.major),
          resume: String(userData.resume),
          interests: (userData.interests as unknown as string[]).map((interest: string) => String(interest)),
      };
    }
  }
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalWrapper>
      <Header />
      
      <WholeFrame>
        <Title>My Page</Title>
        <TopFrame>
          <ImageFrame imageUrl="/assets/boy.png" />
          <ContentWrapper>
            
              <Content>
                <ContentName>이메일</ContentName>
                <ContentInput>{user.email}</ContentInput>
              </Content>
              <Content>
                <ContentName>이름</ContentName>
                <ContentInput>{user.name}</ContentInput>
              </Content>
            
            
              <Content>
                <ContentName>학번</ContentName>
                <ContentInput>{user.studentid}</ContentInput>
              </Content>
              <Content>
                <ContentName>전공</ContentName>
                <ContentInput>{user.major}</ContentInput>
              </Content>
              
              <Content>
                <ContentName>관심 분야</ContentName>
                <ContentInput>{user.interests.join(', ')}</ContentInput>
              </Content>
              <Content>
                <ContentName>이력</ContentName>
                <ContentInput>{user.resume}</ContentInput>
              </Content>
            
          </ContentWrapper>
        </TopFrame>
      </WholeFrame>
      <Footer />
    </GlobalWrapper>
  );
};

export default Mypage;

// Styled Components
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

const ImageFrame = styled.div<{ imageUrl: string }>`
  width: 200px;
  height: 200px;
  border-radius: 32px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  background: url(${({ imageUrl }) => imageUrl}) center / cover no-repeat;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentName = styled.div`
  width: 120px;
  min-height: 70px;
  height: 100%;
  font-size: ${({ theme }) => theme.typography.T3.fontSize};
  font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
`;

const ContentInput = styled.div`
  flex: 1;
  min-height: 70px;
  height: 100%;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  border-radius: 0 8px 8px 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  box-sizing: border-box;
  padding: 0 16px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 16px;
`;

const TopFrame = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
`;

const WholeFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;
