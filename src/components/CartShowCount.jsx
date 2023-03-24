import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMyCart from '../hooks/useMyCart';

export default function CartShowCount() {
    const {
        getMyCart: { data: myCart },
    } = useMyCart();

    return (
        <CartWrapper>
            <ShoppingCartIcon fontSize="large" />
            <span>{myCart && myCart.length}</span>
        </CartWrapper>
    );
}

const CartWrapper = styled.div`
    position: relative;

    & > span {
        width: 18px;
        height: 18px;
        position: absolute;
        top: -5px;
        right: -10px;
        color: #fff;
        line-height: 18px;
        display: inline-block;
        background: #ff3232;
        border-radius: 50%;
        text-align: center;
        font-size: 11px;
    }
`;
