import React, { useState } from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
    const [show, setShow] = useState(true)
    const [showchannel, setShowchannel] = useState(true)
    const [channels] = useCollection(db.collection('rooms'))
    const [user] = useAuthState(auth)
  return (
      
    <SidebarContainer>
        <SidebarHeader>
            <SidebarInfo>
                <h2>TEAM ACE</h2>
                <h3>
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
            </SidebarInfo>
            <CreateIcon />
        </SidebarHeader>
        {
            show?<>
                <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
                <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
                <SidebarOption Icon={DraftsIcon} title="Saved Items"/>
            </>:<>
            <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
            <SidebarOption Icon={DraftsIcon} title="Saved Items"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File Browser"/>
            </>
        }
        <SidebarOptionButton>
        <button onClick={() => setShow(!show)}><SidebarOption Icon={show ? ExpandMoreIcon : ExpandLessIcon} title={`${show? "Show More" : "Show Less"}`}></SidebarOption></button>
        </SidebarOptionButton>
        <hr />
        <SidebarOptionButton>
        <button onClick={() => setShowchannel(!showchannel)}><SidebarOption Icon={showchannel ? ExpandLessIcon : ExpandMoreIcon} title='Channels'></SidebarOption></button>
        </SidebarOptionButton>
        <hr />
        {
            showchannel? <>
                <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/>
                {channels?.docs.map(doc => (
                <SidebarOption key={doc.id} id={doc.id} title={doc.data().name}/>
                ))}
            </>: null
        }
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;

    ::-webkit-scrollbar {
    display: none;
    }

    >hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    >.MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }

    .MuiSvgIcon-root:hover {
        cursor: pointer;
        opacity: 0.7;
        transition: 0.4s;
    }
`

const SidebarInfo = styled.div`
    flex: 1;

    >h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px; 
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`

const SidebarOptionButton = styled.div`

    > button {
        background-color: transparent;
        border: none;
        padding: 0;
        color: white;
        width: 100%;
        outline: none;
    }

`
