import styled from "styled-components";

const c1 = "#BBBBBB";
const c2 = "#EEEEEE";

export const CardContainer = styled.div`
    display: flex;
    width: 320px;
    height: 480px;
    padding: 0;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    border: 6px solid transparent;
    border-radius: 16px;
    background-image: linear-gradient(#fff, #fff),
        linear-gradient(-45deg, ${c1} 0%, ${c2} 10%, ${c1} 20%, ${c2} 30%, ${c1} 40%, ${c2} 50%, ${c1} 60%, ${c2} 70%, ${c1} 80%, ${c2} 90%, ${c1} 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    margin-bottom: 16px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    overflow: hidden;
    box-sizing: border-box;
`;

export const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    width: 100%;
`;

export const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    width: 100%;
`;

export const TopName = styled.div`
    font-size: ${({ theme }) => theme.typography.T3.fontSize};
    font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const TopFlagLocFrame = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 4px;
`;

export const TopFlag = styled.div`
    height: 19px;
    color: ${({ theme }) => theme.colors.black};
`;

export const TopLoc = styled.div`
    text-align: right;
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const TopLab = styled.div`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
`;

export const CenterFrame = styled.div<{ img_url: string }>`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.gray[200]};

    background-color: ${({ theme }) => theme.colors.white};
    background-image: url(${(props) => props.img_url});
    background-position: center; /* 이미지를 가운데 정렬 */
    background-repeat: no-repeat; /* 이미지를 반복하지 않음 */
    background-size: contain;
    color: ${({ theme }) => theme.colors.black};
`;

export const CenterText = styled.div`
    display: flex;
    flex-shrink: 0;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.T3.fontSize};
    font-weight: ${({ theme }) => theme.typography.T3.fontWeight};

    line-height: 1.2;
    white-space: normal;
    overflow: hidden;
`;

export const BottomTitle = styled.div`
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const BottomText = styled.div`
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    text-align: left;

    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    color: ${({ theme }) => theme.colors.black};

    overflow: hidden; /* 넘치는 내용 숨김 */
    text-overflow: ellipsis; /* 말 줄임표 추가 */
    white-space: normal; /* 여러 줄 허용 */
    line-height: 1.5;
    max-height: 100%;
`;

export const EmailContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`;

export const QuestionText = styled.div`
    display: flex;
    width: 14px;
    height: 14px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};

    &:hover {
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
`;

export const KeywordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`;

export const KeywordTitle = styled.div`
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const KeywordList = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 4px;
    align-self: stretch;
    flex-wrap: wrap;
`;

export const KeywordText = styled.div`
    font-size: ${({ theme }) => theme.typography.T7.fontSize}; 
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const RecruitContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

export const RecruitLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const RecruitText = styled.div`
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;