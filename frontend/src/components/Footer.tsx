import React from "react";
import {
  FooterContainer,
  FooterLogo,
  FooterNav,
  FooterNavItem,
} from "./Footer.styles";

const Footer = () => {

  const handleGithub = () => {
    window.open("https://github.com/hye-ilee/Madcamp-w4", "_blank");
  };

  const handleDeveloper = () => {
    alert("KAIST 전산학부 박정원\nKAIST 전산학부 이혜리");
  }

  return (
    <FooterContainer>
      <FooterLogo></FooterLogo>
      <FooterNav>
        <FooterNavItem onClick={handleDeveloper}>만든 사람들</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>박정원</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>이혜리</FooterNavItem>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;