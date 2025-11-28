import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader.jsx'
import UserPost from '@/components/UserPost.jsx'
import { useParams } from 'react-router';
import useShowToast from '@/hooks/useShowToast.js';
import { Flex, Spinner, VStack, useColorModeValue } from '@chakra-ui/react';

const UserPage = () => {
  const [user,setUser]=useState(null);
  const {username}=useParams();
  const showToast=useShowToast();
  const [loading,setLoading]=useState(true);
  const notFoundColor = useColorModeValue('#0f172a', '#f1f5f9');

  useEffect(()=>{
    const getUser=async()=>{
      setLoading(true);
      try {
      const res=await fetch(`/api/users/profile/${username}`);
      const data=await res.json();
      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }
      setUser(data);
      
    } catch (error) {
      showToast("Error", error.message, "error");
    }finally{
      setLoading(false);
    }
  }
    getUser();
  },[username,showToast])
  
  if(!user && loading) return (
    <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
      <Spinner size={'xl'}/>
    </Flex>
  )
  
  if(!user && !loading) return (
    <Flex justify="center" align="center" h="50vh">
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold',
        color: notFoundColor
      }}>
        User not found
      </h1>
    </Flex>
  )
  
  return (
    <VStack spacing={6} align="stretch" className="animate-fade-in">
      <UserHeader user={user}/>
      <VStack spacing={4} align="stretch">
        <UserPost likes={1200} replies={481} postImg="post1.png" postTitle="lets talk on Threads"/>
        <UserPost likes={1305} replies={401} postImg="post2.png" postTitle="Nice tutorial"/>
        <UserPost likes={1006} replies={211} postImg="post3.png" postTitle="Love this guy"/>
        <UserPost likes={106} replies={21} postTitle="My first post on Threads"/>
      </VStack>
    </VStack>
  )
}

export default UserPage