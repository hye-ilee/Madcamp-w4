import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const departments = [
  { id: "CH", name: "화학과", image: "bg_chem.png" },
  { id: "CS", name: "전산학부", image: "bg_cs.png" },
  { id: "EE", name: "전기및전자공학부", image: "bg_ee.png" },
  { id: "BS", name: "생명과학과", image: "bg_bio.png" },
  { id: "MAS", name: "수리과학과", image: "bg_math.png" },
  { id: "BCS", name: "뇌인지과학과", image: "bg_brain.png" },
  { id: "PH", name: "물리학과", image: "bg_phy.png" },
  { id: "ME", name: "기계공학과", image: "bg_ms.png" },
  { id: "ID", name: "산업디자인학과", image: "bg_id.png" },
  { id: "IE", name: "산업및시스템공학과", image: "bg_ise.png" },
  { id: "CE", name: "건설및환경공학과", image: "bg_cee.png" },
  { id: "AE", name: "항공우주공학과", image: "bg_ae.png" },
  { id: "BiS", name: "바이오및뇌공학과", image: "bg_bbe.png" },
  { id: "NQE", name: "원자력및양자공학과", image: "bg_nqe.png" },
  { id: "MS", name: "신소재공학과", image: "bg_mse.png" },
  { id: "CBE", name: "생명화학공학과", image: "bg_bcs.png" },
  { id: "TS", name: "융합인재학부", image: "bg_mix.png" },
  { id: "BTM", name: "기술경영학부", image: "bg_btm.png" },
];

const Search: React.FC = () => {
  const navigate = useNavigate();

  const [shuffledDepartments, setShuffledDepartments] = useState<
    typeof departments
  >([]);
  const [hoveredDepartment, setHoveredDepartment] = useState<
    typeof departments[0] | null
  >(null);

  const handleDepartmentClick = (dept: typeof departments[0]) => {
    navigate(`/search/${dept.id}`);
  };

  useEffect(() => {
    // 학과 리스트 무작위로 섞기
    setShuffledDepartments(departments.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <GlobalWrapper>
      <Header />
      <Container>
        <DepartmentGrid>
          {shuffledDepartments.map((dept, index) => (
            <DepartmentCard
              key={dept.id}
              onMouseEnter={() => setHoveredDepartment(dept)} // Hover 이벤트
              onMouseLeave={() => setHoveredDepartment(null)} // Hover 해제
              onClick={() => handleDepartmentClick(dept)} // 클릭 이벤트
              delay={index * 0.1} // 0.1초 간격으로 지연
            >
              {dept.name}
            </DepartmentCard>
          ))}
        </DepartmentGrid>
        <RightPanel>
          {hoveredDepartment && (
            <HoverImage
              src={`/assets/${hoveredDepartment.image}`}
              alt={hoveredDepartment.name}
              key={hoveredDepartment.id}
            />
          )}
        </RightPanel>
      </Container>
      <Footer />
    </GlobalWrapper>
  );
};

export default Search;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.orange[100]};
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh - 120px); /* Header/Footer 높이 감안 */
  background-color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DepartmentGrid = styled.div`
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* 세로 스크롤 가능하게 */

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.orange[300]};
    border-radius: 10px;
  }
`;

const DepartmentCard = styled.div<{ delay: number }>`
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  /* Fade-in 애니메이션 */
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${({ delay }) => `${delay}s`};
  animation-fill-mode: both;

  &:hover {
    transform: scale(1.05) !important;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RightPanel = styled.div`
  width: 30%;
  background: linear-gradient(90deg, #ff7b33 0%, #ffad33 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HoverImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
