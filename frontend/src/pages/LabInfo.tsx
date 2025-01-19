import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import RecruitTable from "../components/RecruitTable";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 12;
const NoticeData = 25;

const LabInfo: React.FC = () => {
    const { LabName } = useParams<{ LabName: string }>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [labData, setLabData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLab = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching lab data...");
                const response = await axios.get(`http://localhost:5000/api/labs/${LabName}`);
                console.log("Lab data fetched:", response.data);
                setLabData(response.data);
            } catch (err) {
                setError("Failed to fetch lab data.");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLab();
    }, [LabName]);

    const totalPages = Math.ceil(NoticeData / ITEMS_PER_PAGE);

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤 이동
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <GlobalWrapper>
            <Header />
            <MainContainer>
                <Title>{labData.name}</Title>
                <InfoContainer>
                    <Card {...labData} />
                    <InfoRight>
                        <RecruitTable />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </InfoRight>                            
                </InfoContainer>
            </MainContainer>
            <Footer />
        </GlobalWrapper>        
    );
}

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
    gap: 32px;
    flex: 1 0 0;
`;