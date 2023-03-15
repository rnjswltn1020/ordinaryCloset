import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const [getForm, setForm] = useState({ id: '', pw: '' });
    const { login } = useAuthContext();

    // 인풋창 애니메이션
    const labelEvt = e => {
        const nearbyLabel = e.target.parentElement.querySelector(`label[for=${e.target.id}]`);
        e.target.placeholder = '';
        nearbyLabel.classList.add('active');
    };

    const loginWithGoogle = () => {
        login().then(res => {
            if (res) navigate('/');
        });
    };

    const doLogin = (id, password) => {
        const isAuth = sessionStorage.getItem('ordinaryClosetAuth');
        if (
            id === process.env.REACT_APP_ADMIN_ID &&
            password === process.env.REACT_APP_ADMIN_PASSWORD &&
            !isAuth
        ) {
            // 어드민 아이디/비번 맞을경우 function
        } else {
            // 아이디/비번 맞지않을경우 function
            alert('로그인정보가 맞지 않습니다.');
            setForm({ id: '', pw: '' });
        }
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...getForm, [name]: value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        const isAuth = sessionStorage.getItem('ordinaryClosetAuth');
        if (isAuth) {
            // dispatch(userSetToken({ loggedToken }));
        } else {
            setTimeout(() => {
                doLogin(getForm.id, getForm.pw);
            }, 400);
        }
    };

    return (
        <LoginWrapper>
            <Title>보통의 클로젯</Title>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="loginId">Id</Label>
                    <Input
                        type="text"
                        placeholder="ID"
                        id="loginId"
                        name="id"
                        value={getForm.id}
                        onChange={handleChange}
                        onClick={labelEvt}
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="pw">Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        id="pw"
                        name="pw"
                        value={getForm.pw}
                        onChange={handleChange}
                        onClick={labelEvt}
                        autoComplete="false"
                    />
                </InputGroup>
                <SubmitButton type="submit" onClick={handleSubmit}>
                    로그인
                </SubmitButton>
            </Form>
            <FirebaseLogin type="submit" onClick={loginWithGoogle}>
                구글로 로그인😀
            </FirebaseLogin>
        </LoginWrapper>
    );
}

const LoginWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InputGroup = styled.div`
    position: relative;
    width: 250px;
    display: flex;

    &:first-child {
        margin-bottom: 15px;
    }
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
    outline: none;
    display: block;
    transition: 0.3s;
    padding: 0.6rem 0 0.3rem 5px;
    border-radius: 3px;
    font-size: 16px;

    &:focus {
        border-width: 4px;
        border-color: #3498db;
    }

    &::placeholder {
        font-size: 14px;
    }
`;

const Label = styled.label`
    position: absolute;
    color: #aaa;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;

    &.active {
        opacity: 1;
        visibility: visible;
        top: -20px;
    }
`;
const SubmitButton = styled.button`
    border: 1px solid #282c34;
    padding: 10px 5px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #3498db;
    }
`;

const FirebaseLogin = styled.button`
    border: 1px solid #282c34;
    padding: 10px 5px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #ffa920;
    }
`;
