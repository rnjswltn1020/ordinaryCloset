import styled from 'styled-components';

export default function UserIcon({ user }) {
    return (
        <ProfileWrapper>
            <ProfileImg src={user.photoURL} />
            <UserName>{!user.isAdmin ? user.displayName : '관리자🎅'}</UserName>
        </ProfileWrapper>
    );
}

const ProfileWrapper = styled.div`
    position: relative;
    width: 55px;
    margin-right: 10px;

    @media only screen and (max-width: 768px) {
        width: auto;
    }
`;

const ProfileImg = styled.img`
    height: 60%;
    border-radius: 50px;
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
`;

const UserName = styled.span`
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
