import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader.jsx'
import UserPost from '@/components/UserPost.jsx'
import { useParams } from 'react-router';
import useShowToast from '@/hooks/useShowToast.js';
import { Flex, Spinner } from '@chakra-ui/react';

const UserPage = () => {
  const [user,setUser]=useState(null);
  const {username}=useParams();
  const showToast=useShowToast();
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const getUser=async()=>{
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
  if(!user && !loading) return <h1>User not found</h1>
  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={481} postImg="post1.png" postTitle="lets talk on Threads"/>
    <UserPost likes={1305} replies={401} postImg="post2.png" postTitle="Nice tutorial"/>
    <UserPost likes={1006} replies={211} postImg="post3.png" postTitle="Love this guy"/>
     <UserPost likes={106} replies={21} postTitle="My first post on Threads"/>
    </>
  )
}

export default UserPage