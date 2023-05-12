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
  gap:5px;
  width: 104px;

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
  
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
