import { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import useShowtoast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postAtom from '../atoms/postAtom';

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