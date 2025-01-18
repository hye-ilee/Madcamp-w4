import styled from "styled-components";

// 헤더 컨테이너
export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  z-index: 1000;
  position: relative;
`;

// 로고와 네비게이션 묶음
export const LogoAndNav = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

// 로고
export const Logo = styled.div`
  width: 150px;
  height: 60px;
  background-image: url('assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

// 네비게이션 컨테이너
export const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 32px;
`;

// 네비게이션 아이템
export const NavItem = styled.div`
  font-size: ${({ theme }) => theme.typography.T3.fontSize};
  font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// 인증 섹션
export const AuthSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

// 유저 섹션 (로그인 상태)
export const UserSection = styled(AuthSection)`
  font-size: ${({ theme }) => theme.typography.T3.fontSize};
  font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
  color: ${({ theme }) => theme.colors.black};
`;

// 사용자 이름
export const UserName = styled.div`
  cursor: pointer;
`;

// 인증 버튼
export const AuthButton = styled.button`
    display: flex;
    width: 128px;
    height: 48px;
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.typography.T3.fontSize};
    font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 24px;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }
`;