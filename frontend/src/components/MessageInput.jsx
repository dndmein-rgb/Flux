import {Input , InputGroup,InputRightElement} from '@chakra-ui/react'
import {IoSendSharp} from 'react-icons/io5'
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { selectedConversationAtom } from '../atoms/messageAtom';
import { conversationsAtom } from '../atoms/messageAtom';

const MessageInput=({setMessages})=>{
    const showToast=useShowToast();
    const [messageText,setMessageText]=useState('')
    const [isSending, setIsSending]=useState(false)
    const selectedConversation=useRecoilValue(selectedConversationAtom)
    const setConversations=useSetRecoilState(conversationsAtom)
    const  handleSendMessage=async(e)=>{
        e.preventDefault();
        if(!messageText || isSending)return ;
        setIsSending(true)
        try{
            const res=await fetch('/api/messages',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    message:messageText,
                    recipientId:selectedConversation.userId
                })
            })
            const data=await res.json();
            if(data.error){
                showToast("Error", data.error, 'error')
                return ;
            }
            setMessages((prev)=>[...prev,data])
            setMessageText('')
            setConversations(prevCons =>{
                const updatedConversations=prevCons.map(conversation=>{
                    if(conversation._id===selectedConversation._id){
                        return {
                            ...conversation,
                            lastMessage:{
                                text:messageText,
                                sender:data.sender
                            }
                        }
                    }
                    return conversation
                })
                return updatedConversations
            })
        }catch(error){
            showToast("Error",error.message,'error')
        }finally{
            setIsSending(false)
        }
    }
     return (
        <form onSubmit ={handleSendMessage}>
            <InputGroup>
            <Input w={'full'}
                placeholder={'Type a message'}
                onChange={(e)=>{setMessageText(e.target.value)}}
                value={messageText}
                disabled={isSending}
            /> 
            <InputRightElement cursor={'pointer'} onClick={handleSendMessage}>
            <IoSendSharp />
            </InputRightElement>
            </InputGroup>
        </form>
     )

}
export default MessageInput;
