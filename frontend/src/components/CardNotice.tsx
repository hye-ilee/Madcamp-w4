import React from "react";
import {
  CardContainer,
  TopContent,
  TopLab,
  CenterText,
  BottomTitle,
  BottomText,
  DetailText,
  EmailContainer,
  KeywordContainer,
  RecruitLeft,
  CardContent,
} from "./Card.styles";
import RecruitIcon from "./RecruitIcon";
import StatusIcon from "./StatusIcon";
import { useNavigate } from "react-router-dom";
import QuestionModal from "./QuestionModal";

// 데이터 타입 정의
interface CardNoticeProps {
  name: string,
  index: number,
  title: string,
  personnel: number,
  information: string,
  status: string,
  uploadDate: Date,
  deadlineDate: Date,
  detail: string,
}

const CardNotice: React.FC<CardNoticeProps> = ({
  name,
  index,
  title,
  personnel,
  information,
  status,
  uploadDate,
  deadlineDate,
  detail,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/search/labs/${name}/${index}`);
  }

  return (
    <CardContainer onClick={handleCardClick}>
      <CardContent>
        {/* 상단 정보 */}
        <TopContent>
          <TopLab>{name}</TopLab>
          <StatusIcon recruit={status} />
        </TopContent>

        {/* 이미지 중앙 영역 */}
        <CenterText>
          {title}
        </CenterText>

        {/* 모집 정보 */}
        <EmailContainer>
          <RecruitLeft>
            <RecruitIcon recruit={information} />
            <BottomTitle>{personnel}명</BottomTitle>
          </RecruitLeft>
        </EmailContainer> 

        <KeywordContainer>
          <EmailContainer>
            <BottomTitle>게시일</BottomTitle>
            <BottomText>{new Date(uploadDate).toISOString().split("T")[0]}</BottomText>
          </EmailContainer>
          <EmailContainer>
            <BottomTitle>마감일</BottomTitle>
            <BottomText>{new Date(deadlineDate).toISOString().split("T")[0]}</BottomText>
          </EmailContainer>
        </KeywordContainer>

        <KeywordContainer>
          <EmailContainer>
            <BottomTitle>상세 내용</BottomTitle>
            <QuestionModal description={detail} />
          </EmailContainer>
          <DetailText>{detail}</DetailText>
        </KeywordContainer>

      </CardContent>
    </CardContainer>
  );
};

export default CardNotice;
