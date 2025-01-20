import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userInput, setuserInput] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setuserInput({ ...userInput, [name]: value });
    };

    const handleLogin = async () => {
        const requiredFields = ["email", "password"];
        const missingFields = requiredFields.filter(
          (field) => !userInput[field as keyof typeof userInput] || (Array.isArray(userInput[field as keyof typeof userInput]) && userInput[field as keyof typeof userInput].length === 0)
        );
    
        if (missingFields.length > 0) {
          alert(`다음 값을 입력해주세요: ${missingFields.join(", ")}`);
          return;
        }
    
        try {
          const response = await axios.post("http://localhost:5000/api/login", userInput);
          console.log("Student registered successfully:", response.data);
          alert("로그인되었습니다.");
          navigate("/");
        } catch (error: any) {
          console.error("Error registering student:", error);
          alert(error.response?.data?.message || "이메일 또는 비밀번호가 잘못되었습니다.");
        }
    };
    
    return (
    <GlobalWrapper>
        <Header />
        <Wrapper>
            <Title>로그인</Title>

            {/* Email */}
            <Content>
                <ContentName>Email</ContentName>
                <ContentInput>
                <input
                    type="email"
                    name="email"
                    value={userInput.email}
                    onChange={handleInputChange}
                    placeholder="Email을 입력해주세요"
                />
                </ContentInput>
            </Content>

            {/* Password */}
            <Content>
                <ContentName>비밀번호</ContentName>
                <ContentInput>
                <input
                    type="password"
                    name="password"
                    value={userInput.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력해주세요"
                />
                </ContentInput>
            </Content>

            {/* Login Button */}
            <ButtonContainer>
                <Button1 onClick={() => navigate(-1)}>이전</Button1>
                <Button2 onClick={handleLogin}>로그인</Button2>
            </ButtonContainer>
        </Wrapper>
        <Footer />
    </GlobalWrapper>
    );
};

export default Login;

// Styled Components
const GlobalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 64px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.orange[100]};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    width: 272px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  font-size: ${({ theme }) => theme.typography.T1.fontSize};
  font-weight: ${({ theme }) => theme.typography.T1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const ContentName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    width: 72px;
    text-align: right;
    white-space: nowrap;
    margin-right: 16px;
    flex-shrink: 0;
`;

const ContentInput = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;

    input,
    textarea {
    width: 100%;
    padding: 10px;
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 8px;
    }

    textarea {
    resize: none;
    height: 100px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: center;
    padding: 16px 0;
`;

const Button1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    width: 100px;
    height: 40px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray[400]};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`;

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    width: 100px;
    height: 40px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`;
