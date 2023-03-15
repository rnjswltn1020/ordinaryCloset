import styled from 'styled-components';

export default function ShowFileImage({ data, onClickDelete }) {
    const onClickDeleteFun = number => {
        onClickDelete(number);
    };
    return data.map(file => {
        return (
            <PreviewWrapper key={file.title}>
                <CloseBtn onClick={() => onClickDeleteFun(file.number)}>X</CloseBtn>
                <div>
                    <img src={file.thumbnail} alt={file.title} />
                </div>
            </PreviewWrapper>
        );
    });
}

const PreviewWrapper = styled.div`
    position: relative;
    width: 400px;
    border: 1px solid #9b9eac;

    & > div {
        display: flex;
        align-items: center;

        > img {
            width: 100%;
            height: auto;
        }
    }
`;

const CloseBtn = styled.span`
    position: absolute;
    top: -5px;
    right: -10px;
    cursor: pointer;
    background: #000;
    color: #fff;
    font-weight: bold;
    border-radius: 50%;
    padding: 3px 5px;
`;
