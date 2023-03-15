import styled from 'styled-components';

export default function Main() {
    return <MainBanner />;
}

const MainBanner = styled.section`
    background-image: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80');
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    min-height: 300px;
    max-height: 400px;
`;
