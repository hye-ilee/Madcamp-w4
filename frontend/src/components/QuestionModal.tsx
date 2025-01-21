import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface QuestionModalProps {
  description: string;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDelayedVisible, setIsDelayedVisible] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // 모달 표시와 딜레이 처리
  useEffect(() => {
    if (isVisible) {
      if (closeTimeout) clearTimeout(closeTimeout); // 기존 타이머 제거
      setIsDelayedVisible(true); // 모달 표시
    } else {
      const timeout = setTimeout(() => {
        setIsDelayedVisible(false); // 0.5초 후 모달 숨기기
      }, 100);
      setCloseTimeout(timeout); // 타이머 저장
    }

    return () => {
      if (closeTimeout) clearTimeout(closeTimeout); // 컴포넌트 언마운트 시 타이머 제거
    };
  }, [isVisible]);

  return (
    <Container
      onMouseEnter={() => setIsVisible(true)} // 모달 표시
      onMouseLeave={() => setIsVisible(false)} // 모달 숨기기
    >
      <QuestionText>?</QuestionText>
      {isDelayedVisible && (
        <ModalOverlay>
          <ModalContent>{description}</ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default QuestionModal;

// 스타일 컴포넌트
const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const QuestionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 30px; /* ? 아이콘 바로 아래에 모달 표시 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 8px;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  width: 400px; /* 너비를 넓게 설정 */
  max-width: 500px; /* 최대 너비 설정 */
  text-align: left;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  font-size: 14px;
  line-height: 1.5;
`;
