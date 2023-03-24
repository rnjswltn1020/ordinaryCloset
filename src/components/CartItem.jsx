import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useMyCart from '../hooks/useMyCart';
import useProducts from '../hooks/useProduct';

export default function CartItem({
    product: { id, image, productName, productPrice, size, quantity },
    product,
    uid,
}) {
    const { putMyCart } = useMyCart();
    const { deleteProducts } = useProducts();

    const plusCount = () => {
        putMyCart.mutate({ userId: uid, product: { ...product, quantity: quantity + 1 } });
    };

    const minusCount = () => {
        if (quantity > 1)
            putMyCart.mutate({ userId: uid, product: { ...product, quantity: quantity - 1 } });
    };
    const handleDelete = () => {
        if (window.confirm(`${productName}을 삭제하시겠습니까?`)) {
            deleteProducts.mutate(
                { userId: uid, productId: id },
                {
                    onSuccess: () => {
                        alert('삭제하였습니다.');
                    },
                    onError: error => {
                        console.log(error);
                    },
                },
            );
        }
    };

    return (
        <CartItemWrapper>
            <img src={image} alt={productName} />
            <section>
                <h3>{productName}</h3>
                <p>size: {size}</p>
                <p>{productPrice}</p>
            </section>
            <CountWrapper>
                <RemoveCircleOutlineIcon size="small" onClick={minusCount} />
                <span>{quantity}</span>
                <AddCircleOutlineIcon size="small" onClick={plusCount} />
                <DeleteForeverIcon size="small" onClick={handleDelete} />
            </CountWrapper>
        </CartItemWrapper>
    );
}

const CartItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13);
    border-radius: 10px;
    overflow: hidden;

    & > img {
        width: 150px;
    }

    & > section {
        flex: 1;
    }
`;

const CountWrapper = styled.div`
    width: 140px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    gap: 5px;

    & > svg:hover {
        color: firebrick;
    }
`;
