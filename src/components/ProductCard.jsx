import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuthContext } from '../context/AuthContext';
import useMyFavorite from '../hooks/useMyFavorite';

export default function ProductCard({
    data,
    data: { id, image, productName, targetGender, productDetail, productPrice, like },
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
    const { uid } = useAuthContext();
    const { updateMyFavorite } = useMyFavorite();

    const convPrice = price => {
        if (price) return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleHeart = e => {
        if (!uid) {
            if (window.confirm('로그인이 필요합니다. 로그인을 하시겠습니까?')) {
                navigate('/login');
            }
        }

        updateMyFavorite.mutate(data, {
            onSuccess: () => {
                e.target.closest('span').classList.add('active');
            },
        });
    };

    const handleClick = () => {
        navigate(`/products/${id}`, { state: data });
    };
    return (
        <ProductList>
            <ItemWrapper onClick={handleClick}>
                <div
                    className="imageWrapper"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
                />
                <TextWrapper>
                    <ProductName>{productName}</ProductName>
                    <p>{productDetail}</p>
                    <p>{checkGender(targetGender)}</p>
                    <p> {convPrice(productPrice)}</p>
                </TextWrapper>
            </ItemWrapper>
            <span onClick={handleHeart} className={like ? 'active' : ''}>
                <FavoriteIcon size="medium" />
            </span>
        </ProductList>
    );
}

const ProductList = styled.li`
    position: relative;

    & > span {
        cursor: pointer;
        z-index: 3;
        position: absolute;
        top: 10px;
        right: 10px;
        transition: 0.3s;

        &.active {
            color: firebrick;
        }

        &:hover {
            color: firebrick;
        }
    }
`;

const ItemWrapper = styled.div`
    width: 400px;
    background: #fff;
    border-radius: 20px 20px 0 0px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    transform: scale(0.9888);
    transition: 0.3s;
    z-index: 1;
    position: relative;

    &:hover {
        transform: scale(1.0005);
    }

    & > div.imageWrapper {
        padding-top: calc(400px * 1.2);
        width: 100%;
        position: relative;
    }
`;

const ProductName = styled.h2`
    font-size: 16px;
    text-decoration: underline;
`;

const TextWrapper = styled.div`
    font-size: 14px;

    & > p:last-of-type {
        margin-top: 10px;
        font-size: 15px;
        font-weight: bold;
    }
`;
