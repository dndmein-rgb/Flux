import {createContext} from 'react'
import {useEffect,useState} from 'react'
import io from 'socket.io-client'
import {useRecoilValue} from 'recoil'
import {userAtom} from '../atoms/userAtom'
import {useContext} from 'react'

const SocketContext=createContext();
export const useSocket=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const[onlineUsers,setOnlineUsers]=useState([])
    const user=useRecoilValue(userAtom)
    useEffect(()=>{
        if(!user?._id) return;
        
        const socket=io('http://localhost:5000',{
            query:{
                userId:user._id
            }
        });
        setSocket(socket);
        socket.on('getOnlineUsers',(users)=>{
            setOnlineUsers(users)
            console.log(users,"online users")
        })
        return ()=> socket.close()
    },[user?._id])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

