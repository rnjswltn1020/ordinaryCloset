import styled from 'styled-components';

export default function Product({ data }) {
    return (
        <ItemWrapper>
            <div
                className="imageWrapper"
                style={{ backgroundImage: `url(${data.image})`, backgroundSize: 'cover' }}
            />
            <div>
                <h2>{data.productName}</h2>
                <p>{data.productDetail}</p>
                <span>가격 : {data.productPrice}</span>
            </div>
        </ItemWrapper>
    );
}

const ItemWrapper = styled.li`
    width: 400px;
    background: #eeeeee;

    & > div.imageWrapper {
        padding-top: calc(400px * 1.2);
    }
`;
