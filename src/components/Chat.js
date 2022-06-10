import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Message from './Message'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    );

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [roomId, loading])
  return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderOutlinedIcon />
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>
                <ChatMessages>
                    {roomMessages?.docs.map(doc => {
                        const { message, timestamp, user, userImage } = doc.data();
        
                        return (
                            <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                        )
                    })}
                    <ChatBottom ref={chatRef} />
                </ChatMessages>
                <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId} />
                </>
            )}
        </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px
    }

    >.MuiSvgIcon-root {
        font-size: 18px;
    }
    >.MuiSvgIcon-root:hover{
        cursor: pointer;
        opacity: 0.7;
        transition: 0.2s;
    }

`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p >.MuiSvgIcon-root {
        margin-right: 5px;
        font-size: 16px
    }
    > p >.MuiSvgIcon-root:hover{
        cursor: pointer;
        opacity: 0.7;
        transition: 0.2s;
    }
`

const ChatMessages = styled.div``

const ChatBottom = styled.div`
    padding: 100px;
`
const ChannelSelect = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;

    > h3 {
        font-weight: 400;
        padding: 10px;
        border: 3px solid green;
        border-radius: 999px;
        display: flex;
        align-items:  center;
    }
    >h3 > span {
        padding-left: 10px;
        cursor: pointer;
    }
    > h3 > span:hover {
        opacity: 0.7;
        transition: 0.4s;
    }

`
