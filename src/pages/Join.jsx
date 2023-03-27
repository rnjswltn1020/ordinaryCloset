import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Button from '../components/Button';
import { createUser, updateUserProfile } from '../api/fbase';
import { useAuthContext } from '../context/AuthContext';
import { imageUpload } from '../api/imageUpload';

export default function Join() {
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const { getUserData, logout } = useAuthContext();
    const [getForm, setForm] = useState({
        email: '',
        password: '',
    });
    const [getProfile, setProfile] = useState({
        nickname: '',
        profileImage: '',
    });

    const [getErr, setErr] = useState({});
    const [joined, setJoined] = useState(false);
    const [profileImg, setProfileImg] = useState([]);
    const handleChange = (e, type) => {
        const { name, value, files } = e.target;
        if (type === 'join') {
            setForm({ ...getForm, [name]: value });
        } else if (type === 'update' && name === 'nickname') {
            setProfile({ ...getProfile, [name]: value });
        } else if (name === 'profileImage') {
            setProfileImg(files && files[0]);
        }
    };

    const validateForm = (vals, type) => {
        const errs = {};
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[!@#$%^&*()_+./<>:"{}]/;

        if (type === 'join') {
            if (vals.email.length < 5 || !/@/.test(vals.email)) {
                errs.email = '이메일은 5글자 이상에 @를 포함해주세요.';
            }

            if (
                vals.password.length > 12 ||
                !eng.test(vals.password) ||
                !num.test(vals.password) ||
                !spc.test(vals.password)
            ) {
                errs.password =
                    '비밀번호는 최대 12자리이하, 영문, 숫자, 특수문자를 모두 포함해주세요.';
            }
        }

        if (type === 'update') {
            console.log(vals.nickname.length, spc.test(vals.nickname));
            if (vals.nickname.length > 6 || spc.test(vals.nickname)) {
                errs.nickname = '닉네임은 5글자 이하이며 특수문자는 포함할 수 업습니다.';
            }
        }

        return errs;
    };

    const handleCreateUser = e => {
        e.preventDefault();

        if (joined && getUserData) {
            setErr(validateForm(getProfile, 'update'));
        } else if (!joined && !getUserData) {
            setErr(validateForm(getForm, 'join'));
        }
    };

    const deleteProfileImg = () => {
        setProfileImg(null);
        inputFile.current.value = '';
    };

    useEffect(() => {
        logout();
    }, []);

    useEffect(() => {
        const errLen = Object.keys(getErr).length;
        if (errLen === 0 && !getUserData) {
            createUser(getForm.email, getForm.password).then(user => {
                if (user) {
                    alert('회원가입이 완료되었습니다. 사용할 닉네임과 이미지를 등록해주세요.');
                    setJoined(true);
                }
            });
        } else if (errLen === 0 && getUserData) {
            imageUpload(profileImg).then(imageUrl =>
                updateUserProfile(getProfile.nickname, imageUrl, () => {
                    alert('회원정보를 저장하였습니다.');
                    navigate('/');
                }),
            );
        }
    }, [getErr]);

    return (
        <FormWrapper>
            <Form>
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="text"
                        placeholder="이메일을 입력해주세요."
                        id="email"
                        name="email"
                        value={getForm.email}
                        onChange={e => handleChange(e, 'join')}
                        disabled={joined ? true : false}
                    />

                    <ErrMsg className={getErr.email && 'active'}>{getErr.email}</ErrMsg>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="pw">Password</Label>
                    <Input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        id="password"
                        name="password"
                        value={getForm.password}
                        onChange={e => handleChange(e, 'join')}
                        autoComplete="false"
                        disabled={joined ? true : false}
                    />
                    <ErrMsg className={getErr.password && 'active'}>{getErr.password}</ErrMsg>
                </InputGroup>
                {getUserData && joined && (
                    <>
                        <InputGroup>
                            <Label htmlFor="nickname">닉네임</Label>
                            <Input
                                type="text"
                                placeholder="닉네임을 입려해주세요."
                                id="nickname"
                                name="nickname"
                                value={getProfile.nickname}
                                onChange={e => handleChange(e, 'update')}
                                autoComplete="false"
                            />
                            <ErrMsg className={getErr.nickname && 'active'}>
                                {getErr.nickname}
                            </ErrMsg>
                        </InputGroup>
                        <InputGroup>
                            {profileImg.length !== 0 && (
                                <ProfileImgWrapper>
                                    <img src={URL.createObjectURL(profileImg)} alt="profileimage" />
                                    <DisabledByDefaultIcon
                                        size="small"
                                        onClick={deleteProfileImg}
                                    />
                                </ProfileImgWrapper>
                            )}
                            <Label htmlFor="nickname">프로필 이미지</Label>
                            <Input
                                ref={inputFile}
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={e => handleChange(e, 'update')}
                            />
                        </InputGroup>
                    </>
                )}
                <Button
                    type="submit"
                    onClick={handleCreateUser}
                    text={joined ? '업데이트하기' : '회원가입 하기'}
                />
            </Form>
        </FormWrapper>
    );
}

const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 35%;
    width: 100%;

    @media only screen and (max-width: 768px) {
        width: 100%;
        max-width: 90%;
    }
`;

const InputGroup = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    &:last-of-type {
        margin-bottom: 20px;
    }
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
    outline: none;
    display: block;
    transition: 0.3s;
    background: #eee;
    padding: 0.6rem 0 0.3rem 5px;
    border-radius: 3px;
    font-size: 14px;

    &:focus {
        border-width: 4px;
        border-color: #3498db;
    }

    &::placeholder {
        font-size: 12px;
    }
`;

const ErrMsg = styled.span`
    font-weight: 400;
    display: inline-block;
    color: #fff;
    font-size: 12px;
    padding: 0.2rem 0.4rem;
    background: cornflowerblue;
    border-radius: 5px;
    position: relative;
    margin-top: 6px;
    opacity: 0;
    display: none;
    transition: 0.5s;

    &.active {
        opacity: 1;
        display: block;
    }

    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: -8px;
        left: 10px;
        width: 0px;
        height: 0px;
        border: 4px solid #fff;
        border-bottom-color: rgb(100, 149, 237);
        background: cornflowerblue;
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

const ProfileImgWrapper = styled.div`
    max-width: 60%;
    width: 100%;
    position: relative;

    & > img {
        width: 100%;
    }

    & > svg {
        position: absolute;
        top: -3px;
        right: -3px;
    }
`;
