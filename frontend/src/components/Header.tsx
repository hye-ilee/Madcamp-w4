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

    const handleLogout = () => {
        dispatch(clearData());
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login");
        // navigate("/");
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
        {accountType ? (
            <UserSection>
                <UserName onClick={() => navigate("/mypage")}>{String(data?.name ?? "not found")}</UserName>
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