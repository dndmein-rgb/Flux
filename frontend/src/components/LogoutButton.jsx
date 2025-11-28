import { userAtom } from '@/atoms/userAtom'
import useShowToast from '@/hooks/useShowToast';
import { Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil'

const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom);
    const showToast=useShowToast();
    const handleLogout = async() => {

        try {
            const res=await fetch('/api/users/logout',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            const data=await res.json();
            if(data.error){
                showToast("Error",data.error,"error")
                return ;
            }
            localStorage.removeItem('user-threads')
            setUser(null) //set user to null in Recoil state after logout
        } catch (error) {
           showToast("Error",error,"error")
        }
    }
  return (
    <Button 
      position="fixed" 
      top={"30px"} 
      right={"30px"} 
      size={'md'}
      variant="ghost"
      onClick={handleLogout}
      _hover={{
        bg: useColorModeValue('red.50', 'red.900'),
        color: 'red.500',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      <FiLogOut size={20}/>
    </Button>
  )
}

export default LogoutButton