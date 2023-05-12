import styled from 'styled-components';

export default function UserIcon({ user }) {
    return (
        <ProfileWrapper>
            <img src={user.providerData[0].photoURL ? user.providerData[0].photoURL : 'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg '} alt={user.providerData[0].displayName} />
            <UserName>{!user.isAdmin ? user.providerData[0].displayName : '관리자🎅'}</UserName>
        </ProfileWrapper>
    );
}

const ProfileWrapper = styled.div`
    position: relative;
  display: flex;
  align-items: center;
  margin-right: -10px;

    & > img {
        height: 36%;
        border-radius: 50px;
    }

    @media only screen and (max-width: 768px) {
        width: 25px;

      & > img {
       height: 60%;
      }
    }
`;

const UserName = styled.p`
    font-size: 12px;
    font-weight: 600;
    width: 110px;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
