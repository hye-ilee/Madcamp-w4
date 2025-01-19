import styled from "styled-components";

export const RecruitTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    width: 100%;
`;

export const RecruitTitleContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

export const FirstTitle = styled.div`
    display: flex;
    width: 80px;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px 0px 0px 0px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size: ${(props) => props.theme.typography.T4.fontSize};
    font-weight: ${(props) => props.theme.typography.T4.fontWeight};
`;

export const SecondTitle = styled.div`
    display: flex;
    width: 120px;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size: ${(props) => props.theme.typography.T4.fontSize};
    font-weight: ${(props) => props.theme.typography.T4.fontWeight};
`;

export const ThirdTitle = styled.div`
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size: ${(props) => props.theme.typography.T4.fontSize};
    font-weight: ${(props) => props.theme.typography.T4.fontWeight};
`;

export const FourthTitle = styled.div`
    display: flex;
    width: 80px;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size: ${(props) => props.theme.typography.T4.fontSize};
    font-weight: ${(props) => props.theme.typography.T4.fontWeight};
`;

export const FifthTitle = styled.div`
    display: flex;
    width: 140px;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 0px 10px 0px 0px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size: ${(props) => props.theme.typography.T4.fontSize};
    font-weight: ${(props) => props.theme.typography.T4.fontWeight};
`;

export const RecruitContentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    border-right: 1px solid ${(props) => props.theme.colors.orange[300]};
    border-bottom: 1px solid ${(props) => props.theme.colors.orange[300]};
    border-left: 1px solid ${(props) => props.theme.colors.orange[300]};
    background: ${(props) => props.theme.colors.white};
`;

export const FirstContent = styled.div`
    display: flex;
    width: 80px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.typography.T5.fontSize};
    font-weight: ${(props) => props.theme.typography.T5.fontWeight};
`;

export const SecondContent = styled.div`
    display: flex;
    width: 120px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.typography.T5.fontSize};
    font-weight: ${(props) => props.theme.typography.T5.fontWeight};
`;

export const ThirdContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    text-align: center;
    color: ${(props) => props.theme.colors.blue[600]};
    font-size: ${(props) => props.theme.typography.T5.fontSize};
    font-weight: ${(props) => props.theme.typography.T5.fontWeight};
    cursor: pointer;
`;

export const FourthContent = styled.div`
    display: flex;
    width: 80px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.typography.T5.fontSize};
    font-weight: ${(props) => props.theme.typography.T5.fontWeight};
`;

export const FifthContent = styled.div`
    display: flex;
    width: 140px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.typography.T5.fontSize};
    font-weight: ${(props) => props.theme.typography.T5.fontWeight};
`;

