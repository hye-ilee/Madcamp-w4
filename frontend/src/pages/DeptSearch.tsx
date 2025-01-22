import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import axios from "axios";

const ITEMS_PER_PAGE = 12;
const apiUrl = process.env.REACT_APP_API_URL;

const DeptSearch: React.FC = () => {
  const { major } = useParams<{ major: string }>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [labsData, setLabsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/api/labs`, {
          params: { major }, // major를 쿼리 파라미터로 전달
        });
        setLabsData(response.data);
      } catch (err) {
        setError("Failed to fetch labs data.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, [major]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = labsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(labsData.length / ITEMS_PER_PAGE);

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
        <Title>All {labsData.length} {major} Labs</Title>
        <CardGrid>
          {currentData.length > 0 ? (
            currentData.map((data, index) => <Card key={index} {...data} />)
          ) : (
            <div>No data found.</div>
          )}
        </CardGrid>
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationWrapper>
      </MainContainer>
      <Footer />
    </GlobalWrapper>
  );
};

export default DeptSearch;

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
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

const CardGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 90%;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
`;
