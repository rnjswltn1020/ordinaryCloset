import { useEffect, useState } from 'react';

import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useAuthContext } from '../context/AuthContext';

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
                        <ShoppingCartIcon fontSize="large" />
                    </Link>
                )}
                {getUserData !== null && getUserData.isAdmin && (
                    <Link to="/products/new">
                        <BorderColorIcon fontSize="large" />
                    </Link>
                )}
                {getUserData !== null && <UserIcon user={getUserData} />}
                <Icon>
                    {getUserData && (
                        <button type="button" onClick={logout}>
                            로그아웃
                        </button>
                    )}
                    {!getUserData && (
                        <button type="button" onClick={() => navigate('/login')}>
                            로그인
                        </button>
                    )}
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

    > button {
        background: #282c34;
        color: #fff;
        padding: 1rem;
        border-radius: 0.3rem;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background-color: rgb(40 44 52 / 57%);
            color: #ddd;
        }
    }
`;
