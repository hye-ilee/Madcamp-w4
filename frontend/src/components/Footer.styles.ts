import styled from "styled-components";

// Footer 컨테이너
export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  background-color: ${(props) => props.theme.colors.white};
  border-top: 2px solid ${(props) => props.theme.colors.gray[400]};
  padding: 8px 24px;
  box-sizing: border-box;
  margin-top: auto;
`;

// 로고 스타일
export const FooterLogo = styled.div`
  background-image: url('/assets/logo.png');
  width: 75px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

// Footer 네비게이션
export const FooterNav = styled.nav`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0px 30px;
  align-items: flex-start;
  gap: 24px;
`;

// Footer 네비게이션 아이템
export const FooterNavItem = styled.div`
  font-size: ${(props) => props.theme.typography.T5.fontSize};
  font-weight: ${(props) => props.theme.typography.T5.fontWeight};
  color: ${(props) => props.theme.colors.gray[400]};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.black}; /* Hover 시 색상 변경 */
  }
`;