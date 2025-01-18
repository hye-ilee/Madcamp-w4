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
  } from "./Header.styles";
  import { useNavigate } from "react-router-dom";

  const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accountType, data } = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(clearData());
        navigate("/");
    }

    const handleLogin = () => {
        //navigate("/login");
        navigate("/");
    }

    return (
      <HeaderContainer>
        <LogoAndNav>
          <Logo onClick={() => navigate("/")}></Logo>
          <Nav>
            <NavItem onClick={() => navigate("/search")}>학과별 Lab</NavItem>
            <NavItem onClick={() => navigate("/search")}>모집중 Lab</NavItem>
            <NavItem onClick={() => navigate("/tester")}>FAQ</NavItem>
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

        