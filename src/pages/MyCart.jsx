import styled from 'styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import useMyCart from '../hooks/useMyCart';

export default function MyCart() {
    const { uid } = useAuthContext();
    const {
        getMyCart: { isLoading, error, data: myCart },
    } = useMyCart();
    const shippingFee = 3000;
    const hasProduct = myCart && myCart.length > 0;
    const totalPrice =
        myCart &&
        myCart.reduce((prev, current) => prev + current.productPrice * current.quantity, 0);

    if (isLoading) return <p>장바구니 Loading중...</p>;
    if (error) return <p>장바구니 데이터를 불러오는데 실패하였습니다🙄</p>;

    return (
        <CartWrapper>
            <h3>나의 장바구니</h3>
            {!hasProduct && <p>장바구니가 비어있습니다. 둘러보고 오세요😎</p>}
            {hasProduct && (
                <>
                    <div>
                        {myCart &&
                            myCart.map(item => {
                                return <CartItem key={item.id} product={item} uid={uid} />;
                            })}
                    </div>
                    <CalcPriceWrapper>
                        <div>
                            <h4>상품 총액</h4>
                            <p>{totalPrice} 원</p>
                        </div>
                        <span>
                            <AddCircleIcon size="small" />
                        </span>
                        <div>
                            <h4>배송액</h4>
                            <p>{shippingFee} 원</p>
                        </div>
                        <span>
                            <DragHandleIcon size="small" />
                        </span>
                        <div>
                            <h4>총가격</h4>
                            <p>{totalPrice + shippingFee} 원</p>
                        </div>
                    </CalcPriceWrapper>
                    <Button text="구매하기" />
                </>
            )}
        </CartWrapper>
    );
}

const CartWrapper = styled.section`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > h3,
    & > div {
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
    }
    & > button {
        margin-top: 1rem;
    }
`;

const CalcPriceWrapper = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    & > div {
        background: rgb(238, 238, 238);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        gap: 5px;

        & > h4 {
            margin: auto;
        }
        & > p {
            font-size: 18px;
            font-weight: 600;
            color: firebrick;
        }
    }
`;
