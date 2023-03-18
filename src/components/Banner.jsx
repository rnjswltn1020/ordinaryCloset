import styled from 'styled-components';

export default function Banner() {
    return (
        <MainBanner>
            <DescriptionBox>
                <h2>Ordinary closet</h2>
                <p>Best Products, High Quality, </p>
            </DescriptionBox>
        </MainBanner>
    );
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
    position: relative;
    margin-bottom: 1rem;
`;

const DescriptionBox = styled.div`
    position: absolute;
    bottom: 40px;
    left: 20px;
    background-color: rgb(238 238 238 / 44%);
    padding: 1rem;
    border-radius: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    & > h2 {
        color: #fff;
        font-weight: 600;
        text-transform: capitalize;
        font-size: 30px;
    }

    & > p {
        color: rgb(124 51 23 / 79%);
        font-size: 15px;
        font-weight: 900;
    }
`;
