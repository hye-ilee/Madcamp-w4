import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // Form data 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    studentid: "",
    major: "",
    resume: "",
    interests: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxSelect = (value: string) => {
    const currentValues = formData.interests;
    if (currentValues.includes(value)) {
      setFormData({ ...formData, interests: currentValues.filter((v) => v !== value) });
    } else {
      setFormData({ ...formData, interests: [...currentValues, value] });
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ["email", "password", "name", "studentid", "major", "resume", "interests"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData] || (Array.isArray(formData[field as keyof typeof formData]) && formData[field as keyof typeof formData].length === 0)
    );

    if (missingFields.length > 0) {
      alert(`다음 값을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      console.log("Student registered successfully:", response.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("Error registering student:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <GlobalWrapper>
      <Header />
      <Wrapper>
        <Title>학생 회원가입</Title>

        {/* Email */}
        <Content>
          <ContentName>Email</ContentName>
          <ContentInput>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Name */}
        <Content>
          <ContentName>이름</ContentName>
          <ContentInput>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Student ID */}
        <Content>
          <ContentName>학번</ContentName>
          <ContentInput>
            <input
              type="text"
              name="studentid"
              value={formData.studentid}
              onChange={handleInputChange}
              placeholder="학번을 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Major */}
        <Content>
          <ContentName>전공</ContentName>
          <ContentInput>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              placeholder="전공을 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Resume */}
        <Content>
          <ContentName>이력서</ContentName>
          <ContentInput>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              placeholder="이력서를 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Interests */}
        <Content>
          <ContentName>관심사</ContentName>
          <ContentInputContainer>
            {["AI", "Web Development", "Data Science", "Physics", "Chemistry", "Biology"].map((interest) => (
              <ContentInput key={interest}>
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleCheckboxSelect(interest)}
                />
                {interest}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

        {/* Submit Button */}
        <ButtonContainer>
          <Button1 onClick={() => navigate(-1)}>이전</Button1>
          <Button2 onClick={handleSubmit}>회원가입</Button2>
        </ButtonContainer>
      </Wrapper>
      <Footer />
    </GlobalWrapper>
  );
};

export default Signup;

// Styled Components
const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 192px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  margin: 0 auto 0 0;
`;

const ContentName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  width: 140px;
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

const ContentInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  padding: 16px 0;
`;

const Button1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  width: 160px;
  height: 56px;
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
  color: ${({ theme }) => theme.colors.primary};
  width: 160px;
  height: 56px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
