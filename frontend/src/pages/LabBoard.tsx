import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import CommentBlock from "../components/CommentBlock";
import { useParams } from "react-router-dom";
import axios from "axios";
import StatusIcon from "../components/StatusIcon";
import RecruitIcon from "../components/RecruitIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const apiUrl = process.env.REACT_APP_API_URL;

const LabBoard: React.FC = () => {
  const { LabName, Index } = useParams<{ LabName: string; Index: string }>();

  const [boardData, setBoardData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newComment, setNewComment] = useState<string>("");

  const loggedInUser = useSelector((state: RootState) => state.user.userData);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchBoardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/notices/${LabName}/${Index}`
        );
        if (!response.data) {
          setError("No notice found.");
          return;
        }
        setBoardData(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError("Failed to fetch board data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBoardData();
  }, [LabName, Index]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCommentSubmit = async () => {
    if (!loggedInUser || !loggedInUser._id) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:8080/api/notices/${LabName}/${Index}/comments`,
        {
          email: loggedInUser.email, // 실제 유저 ID를 넣으세요.
          name: loggedInUser.name, // 실제 유저 이름을 넣으세요.
          content: newComment,
          isReply: false,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to submit comment.", err);
    }
  };

  const displayedComments = comments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApply = () => {
    alert("지원되었습니다.");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!boardData) return <div>Notice data not found</div>;

  return (
    <GlobalWrapper>
      <Header />
      <MainContainer>
        <Title>{LabName}</Title>
        <BoardTitle>{boardData.title}</BoardTitle>
        <BoardPersonnel>모집 인원 :<div style={{ color: "#FF7B33", marginLeft: "4px" }}>{boardData.personnel}</div>인</BoardPersonnel>
        <BoardStatus>
            <BoardStatusItem>상태 : <div style={{ marginLeft: "6px" }}></div>
              <StatusIcon recruit={boardData.status} /></BoardStatusItem>
            <BoardStatusItem>종류 : <div style={{ marginLeft: "6px" }}></div>
              <RecruitIcon recruit={boardData.information} /></BoardStatusItem>
            <BoardStatusItem>게시일 : {new Date(boardData.uploadDate).toISOString().split("T")[0]}</BoardStatusItem>
            <BoardStatusItem>마감일 : {new Date(boardData.deadlineDate).toISOString().split("T")[0]}</BoardStatusItem>
        </BoardStatus>
        <BoardContent>{boardData.detail}</BoardContent>
        <ButtonWrapper>
          <BackButton onClick={() => window.history.back()}>이전</BackButton>
          <ApplyButton onClick={handleApply}>지원하기</ApplyButton>
        </ButtonWrapper>
        <CommentSection>
          <CommentInputWrapper>
            <CommentInput
              placeholder="내용을 입력해주세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
          </CommentInputWrapper>
          <CommentList>
            {displayedComments.map((comment) => (
              <React.Fragment key={comment._id}>
                <CommentBlock {...comment} />
                {comment.replies &&
                  comment.replies.map((reply: any) => (
                    <CommentBlock key={reply._id} {...reply} isReply={true} />
                  ))}
              </React.Fragment>
            ))}
          </CommentList>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(comments.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
          />
        </CommentSection>
      </MainContainer>
      <Footer />
    </GlobalWrapper>
  );
};

export default LabBoard;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  gap: 64px;
`;

const MainContainer = styled.main`
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
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

const BoardTitle = styled.div`
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;

    font-size: ${({ theme }) => theme.typography.T2.fontSize};
    font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    text-align: center;
`;

const BoardPersonnel = styled.div`
    display: flex;
    justify-content: center;
    flex: 1 0 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.T3.fontSize};
    font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
`;

const BoardStatus = styled.div`
    display: flex;
    padding: 8px 0;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: 36px;
    flex: 1 0 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const BoardStatusItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  color: ${({ theme }) => theme.colors.black};
`

const BoardContent = styled.div`
  display: flex;
  padding: 0px 16px;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  white-space: pre-line;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
`;

const BackButton = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray[400]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  cursor: pointer;
`;

const ApplyButton = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  cursor: pointer;
`;

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-family: pretendard;
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
  resize: none;
`;

const SubmitButton = styled.button`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[600]};
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
