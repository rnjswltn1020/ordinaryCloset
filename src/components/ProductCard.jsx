import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
    data,
    data: { id, image, productName, targetGender, productDetail, productPrice },
}) {
    const navigate = useNavigate();
    const checkGender = gender => {
        if (gender === 'female') {
            return '여성';
        } else if (gender === 'male') {
            return '남성';
        } else {
            return '남녀공용';
        }
    };

    const handleClick = () => {
        navigate(`/products/${id}`, { state: data });
    };
    return (
        <ItemWrapper onClick={handleClick}>
            <div
                className="imageWrapper"
                style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
            />
            <div>
                <div>
                    <h2>{productName}</h2>
                    <span>{checkGender(targetGender)}</span>
                </div>
                <p>{productDetail}</p>
                <span>가격 : {productPrice}</span>
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
    cursor: pointer;
    transform: scale(0.9888);
    transition: 0.3s;

    &:hover {
        transform: scale(1.0005);
    }

    & > div.imageWrapper {
        padding-top: calc(400px * 1.2);
        width: 100%;
    }
`;
