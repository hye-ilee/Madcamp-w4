import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import RecruitIcon from '../components/RecruitIcon';
import StatusIcon from '../components/StatusIcon';
import RecruitTable from '../components/RecruitTable';
import Card from '../components/Card';
import styled from 'styled-components';

const Tester: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 관리
    const totalPages = 10; // 총 페이지 수 (예시로 10페이지로 설정)

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤 이동
    };

    return (
        <GlobalWrapper>
            <Header />
            <RecruitTable />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <RecruitIcon recruit="개별연구" />
            <StatusIcon recruit="모집완료" />
            <Card
                name="Wonder Lab"
                lab="Interaction Design Research Lab"
                thumbnail="https://id.kaist.ac.kr/static/media/wonderlab.8ca2a879500159552472.png"
                email="woohun.lee@kaist.ac.kr"
                description="We humanize technology and create delightful user experiences through interaction design."
                keywords={["Interaction Design", "UX Design", "New Media Design"]}
                recruitInfo={{
                    research: 0,
                    interns: 4,
                    graduates: "모집 X",
                }}
            />
            <Footer />
        </GlobalWrapper>
    );
};

export default Tester;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;