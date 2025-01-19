import React from "react";
import { useNavigate } from "react-router-dom";
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
interface NoticeData {
  _id: string;
  name: string;
  index: number;
  status: string;
  title: string;
  personnel: number;
  deadlineDate: string;
}

interface RecruitTableProps {
  notices: NoticeData[];
}

const RecruitTable: React.FC<RecruitTableProps> = ({ notices }) => {
  const navigate = useNavigate();

  return (
    <RecruitTableContainer>
      <RecruitTitleContainer>
        <FirstTitle>#</FirstTitle>
        <SecondTitle>상태</SecondTitle>
        <ThirdTitle>게시글 명</ThirdTitle>
        <FourthTitle>모집 인원</FourthTitle>
        <FifthTitle>지원 마감일</FifthTitle>
      </RecruitTitleContainer>

      {notices.map((notice) => (
        <RecruitContentContainer key={notice._id}>
          <FirstContent>{notice.index}</FirstContent>
          <SecondContent>
            <StatusIcon recruit={notice.status} />
          </SecondContent>
          <ThirdContent
            onClick={() => navigate(`/search/labs/${notice.name}/${notice.index}`)}
          >
            {notice.title}
          </ThirdContent>
          <FourthContent>{notice.personnel}명</FourthContent>
          <FifthContent>
            {new Date(notice.deadlineDate).toLocaleDateString()}
          </FifthContent>
        </RecruitContentContainer>
      ))}
    </RecruitTableContainer>
  );
};

export default RecruitTable;
