import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecruitTable from "../components/RecruitTable";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

const ITEMS_PER_PAGE = 10;

const LabInfo: React.FC = () => {
  const { LabName } = useParams<{ LabName: string }>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recruitData, setRecruitData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [labInfo, setLabInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchLabData = async () => {
      setLoading(true);
      setError(null);
      try {
        const noticesResponse = await axios.get(`http://localhost:8080/api/notices/${LabName}`);
        const labResponse = await axios.get(`http://localhost:8080/api/labs/${LabName}`);
        setRecruitData(noticesResponse.data || []);
        setLabInfo(labResponse.data || null);
      } catch (err) {
        setError("Failed to fetch lab data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, [LabName]);

  const totalPages = Math.ceil(recruitData.length / ITEMS_PER_PAGE);
  const displayedNotices = [...recruitData]
  .sort((a, b) => b.index - a.index) // Sort in descending order by index
  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <GlobalWrapper>
      <Header />
      <MainContainer>
        <Title>{LabName}</Title>
        <InfoContainer>
          {labInfo && (
            <Card
              name={labInfo.name}
              major={labInfo.major}
              thumbnail={labInfo.thumbnail}
              email={labInfo.email}
              description={labInfo.description}
              LabPI={labInfo.LabPI}
              LabKeywords={labInfo.LabKeywords}
              recruitInfo={labInfo.recruitInfo}
            />
          )}
            {recruitData.length > 0 ? (
              <InfoRight>
                <RecruitTable notices={displayedNotices} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </InfoRight>
            ) : (
              <InfoRight>
                <NoNotice>No Notice Found.</NoNotice>
              </InfoRight>
            )}
        </InfoContainer>
      </MainContainer>
      <Footer />
    </GlobalWrapper>
  );
};

export default LabInfo;

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
  justify-content: center;
  gap: 32px;
  flex: 1;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoContainer = styled.div`
  display: flex;
  width: 80%;
  align-items: flex-start;
  justify-content: center;
  gap: 64px;
  align-self: center;
`;

const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1 0 0;
`;

const NoNotice = styled.div`
  font-size: ${({ theme }) => theme.typography.T2.fontSize};
  font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
  color: ${({ theme }) => theme.colors.gray[400]};
`;
