import styled from "styled-components";

export const CardContainer = styled.div`
    display: flex;
    width: 320px;
    height: 480px;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 2px solid ${(props) => props.theme.colors.gray[200]};
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
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