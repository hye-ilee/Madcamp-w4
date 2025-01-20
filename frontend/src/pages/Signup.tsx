import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const depts = [
  "CH", "CS", "EE", "BS", "MAS", "BCS", "PH", "ME", "ID", 
  "IE", "CE", "AE", "BiS", "NQE", "MS", "CBE", "TS", "BTM"
];

const interests_items =  [
  "화학", "컴퓨터", "전기", "생명", "수학", "뇌", "물리", "기계", "디자인", 
  "시스템", "환경", "우주", "바이오", "핵", "초전도", "에너지", "책", "주식"
];

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
      alert("회원가입이 완료되었습니다. 다시 로그인해주세요.");
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
          <ContentInputContainer>
            {depts.map((major) => (
              <ContentInput key={major}>
                <input
                  type="radio"
                  name="major"
                  value={major}
                  checked={formData.major === major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                />
                {major}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

        {/* Resume */}
        <Content>
          <ContentName>이력서</ContentName>
          <ContentInput>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              placeholder="이력을 입력해주세요"
            />
          </ContentInput>
        </Content>

        {/* Interests */}
        <Content>
          <ContentName>관심사</ContentName>
          <ContentInputContainer>
            {interests_items.map((interest) => (
              <ContentInput key={interest}>
                <input
                  width="100%"
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
    width: 80%;
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
  gap: 0;
  margin: 0 auto 0 0;
`;

const ContentName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  width: 140px;
  text-align: right;
  margin-right: 16px;
  flex-shrink: 0;
`;

const ContentInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  word-break: keep-all; /* 한글 줄바꿈 방지 */

  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-family: pretendard;
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 8px;
  }
  textarea {
    min-width: 100%;
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
