import { useEffect, useState } from 'react'
import { Flex, Spinner,Box } from '@chakra-ui/react'
import useShowtoast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postAtom from '../atoms/postAtom';
import SuggestedUsers from '../components/SuggestedUsers';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postAtom)
  const showToast = useShowtoast();
  
  // Add your data fetching useEffect here
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
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
  }, [showToast,setPosts]);
  

  

  
  return (
    <>
    <Flex 
      gap={{ base: 4, md: 6, lg: 10 }} 
      alignItems={'flex-start'}
      flexDirection={{ base: 'column', md: 'row' }}
      w="full"
    >
   <Box flex={{ base: '1', md: '70' }} w={{ base: '100%', md: 'auto' }}>
     {loading &&(
      <Flex justifyContent={'center'} py={10}>
        <Spinner size={'xl'}/>
      </Flex>
    )}
    {!loading &&posts.length===0 && (
      <Box 
        textAlign="center" 
        py={10}
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="600"
      >
        Follow some users to see the feed
      </Box>
    )}
    {posts.map((post)=>(
      <Post key={post._id} post={post} postedBy={post.postedBy} />
    ))}
   </Box>
   <Box 
     flex={{ base: '1', md: '30' }} 
     display={{ base:'none',md:'block'}}
     position={{ md: 'sticky' }}
     top={{ md: '20px' }}
     alignSelf="flex-start"
   >
    <SuggestedUsers />
   </Box>
   </Flex>
    </>

  )
}

export default HomePage