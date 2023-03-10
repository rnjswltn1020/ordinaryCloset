import styled from 'styled-components';

export default function NotFound() {
    return (
        <ErrorWrapper style={{}}>
            <ErrorHeaderMsg>페이지가 존재하지 않습니다😅</ErrorHeaderMsg>
            <ErrorDescription>
                링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다.
            </ErrorDescription>
        </ErrorWrapper>
    );
}

const ErrorWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    fontsize: 16px;
`;

const ErrorHeaderMsg = styled.h1`
    font-weight: bold;
    font-size: 20px;
    color: #b41e51;
`;

const ErrorDescription = styled.p`
    font-size: 18px;
`;
