import styled from 'styled-components';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useAuthContext } from '../context/AuthContext';
import Button from './Button';
import CartShowCount from './CartShowCount';

export default function Header() {
    const navigate = useNavigate();
    const { getUserData, logout } = useAuthContext();
    return (
        <Gnb>
            <Link to="/">Ordinary Closet</Link>
            <Nav>
                <Link to="/products">
                    Products <CheckroomIcon fontSize="large" />
                </Link>
                {getUserData && (
                    <Link to="/mycart">
                        <CartShowCount />
                    </Link>
                )}
                {getUserData !== null && getUserData.isAdmin && (
                    <Link to="/products/new">
                        <BorderColorIcon fontSize="large" />
                    </Link>
                )}
                {getUserData !== null && <UserIcon user={getUserData} />}
                <Icon>
                    {getUserData && <Button onClick={logout} text="로그아웃" />}
                    {!getUserData && <Button onClick={() => navigate('/login')} text=" 로그인" />}
                </Icon>
            </Nav>
        </Gnb>
    );
}

const Gnb = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    background: rgb(189, 170, 170);
    height: 80px;
    padding: 0 1rem;
    margin-bottom: 1rem;
`;

const Nav = styled.nav`
    display: flex;
    align-content: center;
    text-align: center;
    gap: 20px;
    cursor: pointer;
    font-size: 16px;

    & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
`;

const Icon = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;
