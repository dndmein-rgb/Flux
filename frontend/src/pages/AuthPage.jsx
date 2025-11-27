import SignupCard from '@/components/SignUpCard'
import LoginCard from '@/components/LoginCard'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { authScreenAtom } from '@/atoms/authAtom'
import { Flex } from '@chakra-ui/react'

const AuthPage = () => {
    const authScreenState=useRecoilValue(authScreenAtom)
    console.log(authScreenState)
  return (
    <Flex justify="center" minH="100vh">
      {authScreenState=="login" ? <LoginCard/> : <SignupCard/>}
    </Flex>
  )
}

export default AuthPage