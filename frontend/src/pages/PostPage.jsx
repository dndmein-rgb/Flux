import { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import Actions from "@/components/Actions";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import useShowToast from "@/hooks/useShowToast";
import { useParams ,useNavigate} from "react-router";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "@/components/Comment";

const PostPage = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const boxShadow = useColorModeValue(
    '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
  );
  const bannerBg = useColorModeValue('blue.50', 'gray.800');

  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const { pId } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate=useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${pId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPosts();
  }, [showToast, pId]);
  const handleDeletePost = async () => {
    try {
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"100vh"}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) return null;
  
  return (
    <Box className="animate-fade-in">
      <Box
        bg={bgColor}
        p={6}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={boxShadow}
        mb={4}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Flex gap={3} alignItems={"center"}>
            <Avatar 
              src={user.profilePic}
              size={"md"} 
              name="Mark Zuckerberg"
              border="2px solid"
              borderColor={borderColor}
            />
            <Flex align="center" gap={1}>
              <Text fontSize={"sm"} fontWeight={"bold"} color={textColor}>{user.username}</Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
          </Flex>
          <Flex gap={3} alignItems={'center'}>
            <Text fontSize={"sm"} textAlign={'right'} color={secondaryTextColor} whiteSpace="nowrap">
              {formatDistanceToNow(new Date(post.createdAt)).replace('about ', '')} ago
            </Text>
            {currentUser?._id === user._id && <DeleteIcon cursor={'pointer'} size={20} onClick={handleDeletePost} />}
          </Flex>
        </Flex>

        <Text my={4} color={textColor} fontSize="md">{post.text}</Text>
        
        {post.img && (
          <Box 
            borderRadius="xl" 
            overflow={"hidden"} 
            border={"1px solid"} 
            borderColor={borderColor}
            mb={4}
          >
            <Image src={post.img} w={"full"} />
          </Box>
        )}
        
        <Flex gap={3} my={3}>
          <Actions post_={post} />
        </Flex>
        
       
      </Box>

      <Divider borderColor={borderColor} my={6} />
      
      <Flex 
        justifyContent={'space-between'} 
        align="center"
        bg={bannerBg}
        p={4}
        borderRadius="xl"
        mb={6}
      >
        <Flex alignItems={'center'} gap={3}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={secondaryTextColor} fontSize="sm">Get the apps to like, reply and post.</Text>
        </Flex>
        <Button size="sm">
          Get
        </Button>
      </Flex>

      <Divider borderColor={borderColor} my={6} />
        {post.replies.map(reply=>(
          <Comment key={reply._id} reply={reply} />
        ))}
    </Box>
  );
};

export default PostPage;