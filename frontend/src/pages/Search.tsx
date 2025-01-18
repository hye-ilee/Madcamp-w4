import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const departments = [
  { id: "chem", name: "화학과", image: "bg_chem.png" },
  { id: "cs", name: "전산학부", image: "bg_cs.png" },
  { id: "ee", name: "전기및전자공학부", image: "bg_ee.png" },
  { id: "bio", name: "생명과학과", image: "bg_bio.png" },
  { id: "math", name: "수리과학과", image: "bg_math.png" },
  { id: "brain", name: "뇌인지과학과", image: "bg_brain.png" },
  { id: "phy", name: "물리학과", image: "bg_phy.png" },
  { id: "ms", name: "기계공학과", image: "bg_ms.png" },
  { id: "id", name: "산업디자인학과", image: "bg_id.png" },
  { id: "ise", name: "산업및시스템공학과", image: "bg_ise.png" },
  { id: "cee", name: "건설및환경공학과", image: "bg_cee.png" },
  { id: "ae", name: "항공우주공학과", image: "bg_ae.png" },
  { id: "bbe", name: "바이오및뇌공학과", image: "bg_bbe.png" },
  { id: "nqe", name: "원자력및양자공학과", image: "bg_nqe.png" },
  { id: "mse", name: "신소재공학과", image: "bg_mse.png" },
  { id: "bcs", name: "생명화학공학과", image: "bg_bcs.png" },
  { id: "mix", name: "융합인재학부", image: "bg_mix.png" },
  { id: "sse", name: "반도체시스템공학과", image: "bg_sse.png" },
];

const Search: React.FC = () => {
  const [shuffledDepartments, setShuffledDepartments] = useState<
    typeof departments
  >([]);
  const [selectedDepartment, setSelectedDepartment] = useState<
    typeof departments[0] | null
  >(null);

  useEffect(() => {
    // 학과 리스트 무작위로 섞기
    setShuffledDepartments(departments.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (department: typeof departments[0]) => {
    setSelectedDepartment(department);
  };

  return (
    <GlobalWrapper>
        <Header />
        <Container>
        <DepartmentGrid>
            {shuffledDepartments.map((dept) => (
            <DepartmentCard
                key={dept.id}
                onClick={() => handleClick(dept)}
            >
                {dept.name}
            </DepartmentCard>
            ))}
        </DepartmentGrid>
        <RightPanel>
            {selectedDepartment && (
            <DepartmentImage
                src={`/assets/${selectedDepartment.image}`}
                alt={selectedDepartment.name}
                key={selectedDepartment.id} // key를 활용해 애니메이션 적용
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
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.primary};
`;

const DepartmentGrid = styled.div`
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const DepartmentCard = styled.div`
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

  &:hover {
    transform: scale(1.05);
  }
`;

const RightPanel = styled.div`
  flex: 1;
  position: relative;
  background: linear-gradient(90deg, #ff7b33 0%, #ffad33 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DepartmentImage = styled.img`
  height: 100%;
  object-fit: contain;
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
