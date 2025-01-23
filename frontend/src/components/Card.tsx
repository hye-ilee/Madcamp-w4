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
import QuestionModal from "./QuestionModal";

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
    graduates: number;
  };
}

// 랜덤 값 생성 함수
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = () => {
  const start = new Date();
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // End of next month
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toLocaleDateString(); // Format: YYYY-MM-DD
};

const Card: React.FC<CardProps> = ({
  name,
  major,
  thumbnail,
  email,
  description,
  LabPI,
  LabKeywords = [],
}) => {
  const navigate = useNavigate();

  const recruitInfo = {
    research: getRandomNumber(1, 4),
    interns: getRandomNumber(1, 4),
    graduates: 0,
  };

  const recruitPeriods = {
    research: `~${getRandomDate()}`,
    interns: `~${getRandomDate()}`,
    graduates: `~${getRandomDate()}`,
  };

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
          <QuestionModal description={description} />
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
          <RecruitText>{recruitPeriods.research}</RecruitText>
        </RecruitContainer>
        <RecruitContainer>
          <RecruitLeft>
            <RecruitIcon recruit="랩인턴" />
            <RecruitText>{recruitInfo.interns}명</RecruitText>
          </RecruitLeft>
          <RecruitText>{recruitPeriods.interns}</RecruitText>
        </RecruitContainer>
        <RecruitContainer>
          <RecruitLeft>
            <RecruitIcon recruit="졸업연구" />
            <RecruitText>{recruitInfo.graduates}명</RecruitText>
          </RecruitLeft>
          <RecruitText>상시 모집 중</RecruitText>
        </RecruitContainer>
      </KeywordContainer>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
