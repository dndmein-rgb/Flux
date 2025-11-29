import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader.jsx'
import { useParams } from 'react-router';
import useShowToast from '@/hooks/useShowToast.js';
import { Flex, Spinner, VStack, useColorModeValue } from '@chakra-ui/react';
import Post from '@/components/Post.jsx';

const UserPage = () => {
  const [user,setUser]=useState(null);
  const {username}=useParams();
  const showToast=useShowToast();
  const [loading,setLoading]=useState(true);
  const [posts,setPosts]=useState([]);
  const [fetchingPosts,setFetchingPosts]=useState(true);
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
      setPosts([]);
    }finally{
      setLoading(false);
      
    }
  }
  const getPosts=async()=>{
    setFetchingPosts(true);
      try {
        const res=await fetch(`/api/posts/user/${username}`);
        const data=await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }finally{
        setFetchingPosts(false);
      }
  }
    getUser();
    getPosts();
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
      {!fetchingPosts &&posts.length===0 && <h1>User has no posts</h1>}
      {fetchingPosts && (<Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
        <Spinner size={'xl'}/>
      </Flex>)}
       {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
       ))}
    </VStack>
  )
}

export default UserPage