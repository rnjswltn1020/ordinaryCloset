import styled from 'styled-components';

export default function ProductCard({ data }) {
    const checkGender = gender => {
        if (gender === 'female') {
            return '여성';
        } else if (gender === 'male') {
            return '남성';
        } else {
            return '남녀공용';
        }
    };
    return (
        <ItemWrapper>
            <div
                className="imageWrapper"
                style={{ backgroundImage: `url(${data.image})`, backgroundSize: 'cover' }}
            />
            <div>
                <div>
                    <h2>{data.productName}</h2>
                    <span>{checkGender(data.targetGender)}</span>
                </div>
                <p>{data.productDetail}</p>
                <span>가격 : {data.productPrice}</span>
            </div>
        </ItemWrapper>
    );
}

const ItemWrapper = styled.li`
    width: 400px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    padding-bottom: 1rem;

    & > div.imageWrapper {
        padding-top: calc(400px * 1.2);
        width: 100%;
    }
`;
