import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardNotice from "../components/CardNotice";
import axios from "axios";

const labTextSrc = `/assets/lab_text.png`;
const apiUrl = process.env.REACT_APP_API_URL;

const Home: React.FC = () => {
  const [boardData, setBoardData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const LabName = "Next interface Lab";
  const Index = 16;
  const currentData = boardData ? Array(16).fill(boardData) : [];

  useEffect(() => {
    const fetchBoardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/notices/${LabName}/${Index}`
        );
        if (!response.data) {
          setError("No notice found.");
          return;
        }
        setBoardData(response.data);
      } catch (err) {
        setError("Failed to fetch board data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBoardData();
  }, [LabName, Index]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <GlobalWrapper>
        <Header />
        <MainContainer>
          <Title>모집 중인 <StyledImage src={labTextSrc} alt="Lab Text" /></Title>
          <GridWrapper>
            <SubTitle color="#FA5858">모집 마감 임박!</SubTitle>
            <CardGrid>
              {currentData.length > 0 ? (
                currentData.map((data, index) => <CardNotice key={index} {...data}/>)
              ) : (
                <div>No data found.</div>
              )}
            </CardGrid>
          </GridWrapper>
          <GridWrapper>
            <SubTitle color="#107F4F">모집 중인 Lab</SubTitle>
            <CardGrid>
              {currentData.length > 0 ? (
                currentData.map((data, index) => <CardNotice key={index} {...data}/>)
              ) : (
                <div>No data found.</div>
              )}
            </CardGrid>
          </GridWrapper>
        </MainContainer>
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

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  flex: 1;
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

const SubTitle = styled.div<{ color: string }>`
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: stretch;
  font-size: ${({ theme }) => theme.typography.T2.fontSize};
  font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
  color: ${(props) => props.color};
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 90%;
`;

export const StyledImage = styled.img`
  height: 48px; /* 부모 높이에 맞춤 */
  width: auto; /* 비율 유지 */
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  overflow-x: auto; /* 수평 스크롤 활성화 */
  scroll-behavior: smooth; /* 스크롤 이동 시 부드럽게 애니메이션 */
  padding: 16px; /* 양쪽에 여백 추가 */
`;