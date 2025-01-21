import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearData } from "../redux/slices/userSlice";
import {
    HeaderContainer,
    LogoAndNav,
    Logo,
    Nav,
    NavItem,
    AuthSection,
    AuthButton,
    UserSection,
    UserName,
    StyledImage,
  } from "./Header.styles";
  import { useNavigate } from "react-router-dom";

  const labTextSrc = `/assets/lab_text.png`;

  const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accountType, data } = useSelector((state: RootState) => state.user);
    const userName = String(data?.name);

    const handleLogout = () => {
        dispatch(clearData());
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login");
    }

    return (
      <HeaderContainer>
        <LogoAndNav>
          <Logo onClick={() => navigate("/")}></Logo>
          <Nav>
            <NavItem onClick={() => navigate("/search")}>
              학과별 <StyledImage src={labTextSrc} alt="Lab Text" />
            </NavItem>
            <NavItem onClick={() => navigate("/recruiting")}>
              모집중 <StyledImage src={labTextSrc} alt="Lab Text" />
            </NavItem>
            <NavItem onClick={() => navigate("/search/labs")}>
              <StyledImage src={labTextSrc} alt="Lab Text" /> 둘러보기
            </NavItem>
          </Nav>
        </LogoAndNav>
        {accountType != null && data ? (
            <UserSection>
                <UserName onClick={() => navigate("/mypage")}>{userName} 님</UserName>
                <AuthButton onClick={handleLogout}>Log Out</AuthButton>
            </UserSection>
        ) : (
            <AuthSection>
                <AuthButton onClick={() => navigate("/signup")}>Sign Up</AuthButton>
                <AuthButton onClick={handleLogin}>Log In</AuthButton>
            </AuthSection>
        )}
        </HeaderContainer>
    );
}

export default Header;