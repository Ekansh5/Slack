import React from 'react';
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {
  const [user] = useAuthState(auth)
  return (
    <HeaderContainer>
        {/* Header Left */}
        <HeaderLeft>
          <HeaderAvatar onClick={() => auth.signOut()} src={user?.photoURL} alt={user?.displayName} />
          <AccessTimeIcon />
        </HeaderLeft>
        {/* Header Search */}
        <HeaderSearch>
          <SearchIcon />
          <input placeholder='Search Team Ace'/>
        </HeaderSearch>
        {/* Header Right */}
        <HeaderRight>
          <HelpOutlineOutlinedIcon />
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 5px 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }

  > .MuiSvgIcon-root {
    cursor: pointer;
    :hover {
      opacity: 0.7;
      transition: 0.4s;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    cursor: pointer;
    margin-left: auto;
    margin-right: 30px;
    :hover {
      opacity: 0.7;
      transition: 0.4s;
    }
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
    
    :hover {
      opacity: 0.7;
      transition: 0.4s;
    }
  }
`

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    transition: 0.4s;
    opacity: 0.8;
  }
`;