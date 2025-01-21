import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import axios from "axios";

const ITEMS_PER_PAGE = 12;
const labTextSrc = `/assets/lab_text.png`;

const SearchLabs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [labsData, setLabsData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRecruitment, setSelectedRecruitment] = useState<string[]>([]);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching labs data...");
        const response = await axios.get("http://localhost:8080/api/labs");
        console.log("Labs data fetched:", response.data);
        setLabsData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to fetch labs data.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  useEffect(() => {
    let updatedData = labsData;
  
    // 이름 또는 LabPI 검색
    if (searchQuery) {
      updatedData = updatedData.filter(
        (lab) =>
          lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lab.LabPI.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // 학과 필터링
    if (selectedDepartments.length > 0) {
      updatedData = updatedData.filter((lab) =>
        selectedDepartments.includes(lab.major)
      );
    }
  
    // 모집 여부 필터링
    if (selectedRecruitment.length > 0) {
      updatedData = updatedData.filter((lab) =>
        selectedRecruitment.some((type) =>
          lab.recruitInfo ? lab.recruitInfo[type] > 0 : false
        )
      );
    }
  
    // 필터링된 데이터 저장
    setFilteredData(updatedData);
    setCurrentPage(1);
  }, [searchQuery, selectedDepartments, selectedRecruitment, labsData]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: {
    departments: string[];
    recruitment: string[];
  }) => {
    setSelectedDepartments(filters.departments);
    setSelectedRecruitment(filters.recruitment);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <GlobalWrapper>
      <Header />
      <MainContainer>
        <Title><StyledImage src={labTextSrc} alt="Lab Text" /> 둘러보기</Title>
        <SearchTabWrapper>
          <SearchTab
            showDepartments={true}
            showRecruitment={false}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </SearchTabWrapper>
        <CardGrid>
          {currentData.length > 0 ? (
            currentData.map((data, index) => <Card key={index} {...data}/>)
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

export default SearchLabs;

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

const SearchTabWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
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

export const StyledImage = styled.img`
  height: 48px; /* 부모 높이에 맞춤 */
  width: auto; /* 비율 유지 */
`;