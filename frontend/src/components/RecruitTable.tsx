import React from "react";
import {
  RecruitTableContainer,
  RecruitTitleContainer,
  FirstTitle,
  SecondTitle,
  ThirdTitle,
  FourthTitle,
  FifthTitle,
  RecruitContentContainer,
  FirstContent,
  SecondContent,
  ThirdContent,
  FourthContent,
  FifthContent,
} from "./RecruitTable.styles";
import StatusIcon from "./StatusIcon";

// Recruit 데이터 타입 정의
interface RecruitData {
  id: number; // 순번
  status: string; // 상태
  title: string; // 게시글 명
  recruitCount: string; // 모집 인원
  deadline: string; // 지원 마감일
}

// 예시 데이터 (실제 데이터는 props로 전달받을 수도 있음)
const recruitData: RecruitData[] = [
  { id: 25, status: "모집중", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2025.01.28" },
  { id: 24, status: "모집중", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2025.01.28" },
  { id: 23, status: "마감임박", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2025.01.19" },
  { id: 22, status: "지원마감", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2025.01.01" },
  { id: 21, status: "지원마감", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2025.01.01" },
  { id: 20, status: "모집완료", title: "NH투자증권 X Next Interface Lab 단기 디자이너 인턴 구인", recruitCount: "4인", deadline: "2024.12.18" },
];

// RecruitTable 컴포넌트
const RecruitTable: React.FC = () => {
  // 최신 순 정렬
  const sortedData = [...recruitData].sort((a, b) => b.id - a.id);

  return (
    <RecruitTableContainer>
      {/* 제목 부분 */}
      <RecruitTitleContainer>
        <FirstTitle>#</FirstTitle>
        <SecondTitle>상태</SecondTitle>
        <ThirdTitle>게시글 명</ThirdTitle>
        <FourthTitle>모집 인원</FourthTitle>
        <FifthTitle>지원 마감일</FifthTitle>
      </RecruitTitleContainer>

      {/* 내용 부분 */}
      {sortedData.map((recruit) => (
        <RecruitContentContainer key={recruit.id}>
          <FirstContent>{recruit.id}</FirstContent>
          <SecondContent>
            <StatusIcon recruit={recruit.status} />
          </SecondContent>
          <ThirdContent>{recruit.title}</ThirdContent>
          <FourthContent>{recruit.recruitCount}</FourthContent>
          <FifthContent>{recruit.deadline}</FifthContent>
        </RecruitContentContainer>
      ))}
    </RecruitTableContainer>
  );
};

export default RecruitTable;
