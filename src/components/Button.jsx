import styled from 'styled-components';

export default function Button({ text, type, onClick }) {
    const btnType = type || 'button';
    return (
        <CommonButton type={btnType} onClick={onClick}>
            {text}
        </CommonButton>
    );
}

const CommonButton = styled.button`
    min-width: 60px;
    padding: 1rem 0.5rem;
    font-size: 12px;
    font-weight: 600;
    background-color: #3c696c;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #3a7172;
        color: #ddd;
    }
`;
