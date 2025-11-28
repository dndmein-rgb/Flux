import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {Button, Flex, Heading, Text, VStack, useColorModeValue, Box, Spinner} from '@chakra-ui/react'
import  useShowtoast  from '../hooks/useShowToast';
import Post from '../components/Post';


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts,setPosts]=useState([]);
  const showToast = useShowtoast();
  
  // All hooks must be called before any conditional returns
  const headingGradient = useColorModeValue(
    'linear(to-r, brand.600, purple.600)',
    'linear(to-r, brand.400, purple.400)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  // Add your data fetching useEffect here
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res=await fetch("/api/posts/feed");
        const data=await res.json();
        if(data.error){
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
        
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    
    getFeedPosts();
  }, [showToast]);
  

  

  
  return (
    <>
    {loading &&(
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'}/>
      </Flex>
    )}
    {!loading &&posts.length===0 && <h1>Follow Some users to see the feed</h1>}
    {posts.map((post)=>(
      <Post key={post._id} post={post} postedBy={post.postedBy} />
    ))}
    </>

  )
}

export default HomePage