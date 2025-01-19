import React from "react";
import {
  CardContainer,
  TopContainer,
  TopContent,
  TopName,
  TopFlagLocFrame,
  TopFlag,
  TopLoc,
  TopLab,
  CenterFrame,
  BottomTitle,
  BottomText,
  EmailContainer,
  QuestionText,
  KeywordContainer,
  KeywordTitle,
  KeywordList,
  KeywordText,
  RecruitContainer,
  RecruitLeft,
  RecruitText,
  CardContent,
} from "./Card.styles";
import RecruitIcon from "./RecruitIcon";
import { useNavigate } from "react-router-dom";

// 데이터 타입 정의
interface CardProps {
  name: string;
  major: string;
  thumbnail: string;
  email: string;
  description: string;
  LabPI: string;
  LabKeywords: string[];
  recruitInfo: {
    research: number;
    interns: number;
    graduates: string;
  };
}

const Card: React.FC<CardProps> = ({
  name,
  major,
  thumbnail,
  email,
  description,
  LabPI,
  LabKeywords = [],
  recruitInfo = { research: 0, interns: 0, graduates: "N/A" },
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/search/labs/${name}`);
  }

  return (
    <CardContainer onClick={handleCardClick}>
      <CardContent>
        {/* 상단 정보 */}
        <TopContainer>
          <TopContent>
            <TopName>{LabPI}</TopName>
            <TopFlagLocFrame>
              <TopFlag>🎓</TopFlag>
              <TopLoc>{major}</TopLoc>
            </TopFlagLocFrame>
          </TopContent>
          <TopLab>{name}</TopLab>
        </TopContainer>

        {/* 이미지 중앙 영역 */}
        <CenterFrame img_url={thumbnail}>
          {/* 이미지 위 텍스트 */}
        </CenterFrame>

        {/* 이메일 및 설명 */}
        <EmailContainer>
          <BottomTitle>E-mail</BottomTitle>
          <BottomText>{email}</BottomText>
        </EmailContainer>

        <EmailContainer>
          <BottomTitle>연구실 설명</BottomTitle>
          <QuestionText>?</QuestionText>
        </EmailContainer>

        {/* 키워드 */}
        <KeywordContainer>
          <KeywordTitle>Lab 키워드</KeywordTitle>
          <KeywordList>
            {LabKeywords.map((keyword, index) => (
              <KeywordText key={index}>#{keyword}</KeywordText>
            ))}
          </KeywordList>
        </KeywordContainer>

        {/* 모집 정보 */}
        <KeywordContainer>
        <BottomTitle>모집 정보</BottomTitle>
        <RecruitContainer>
          <RecruitLeft>
            <RecruitIcon recruit="개별연구" />
            <RecruitText>{recruitInfo.research}명</RecruitText>
          </RecruitLeft>
          <RecruitText>상시 모집 중</RecruitText>
        </RecruitContainer>
        <RecruitContainer>
          <RecruitLeft>
            <RecruitIcon recruit="랩인턴" />
            <RecruitText>{recruitInfo.interns}명</RecruitText>
          </RecruitLeft>
          <RecruitText>~2025.01.31.</RecruitText>
        </RecruitContainer>
        <RecruitContainer>
          <RecruitLeft>
            <RecruitIcon recruit="졸업연구" />
            <RecruitText>{recruitInfo.graduates}</RecruitText>
          </RecruitLeft>
          <RecruitText></RecruitText>
        </RecruitContainer>
      </KeywordContainer>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
