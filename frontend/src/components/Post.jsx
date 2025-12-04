import { Avatar, Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Actions from "./Actions";
import useShowToast from "@/hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import postsAtom from "@/atoms/postAtom";

const Post = ({post,postedBy}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBorderColor = useColorModeValue('brand.300', 'brand.700');

  
  const [user,setUser]=useState(null);
  const showToast=useShowToast();
  const Navigate=useNavigate();
  const [posts,setPosts]=useRecoilState(postsAtom);
  const currentUser=useRecoilValue(userAtom);
  //fetch the user
  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await fetch(`/api/users/profile/${postedBy}`);
        const data=await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error",error.message,"error");
        setUser(null);
      }
    }
    getUser();
  },[postedBy,showToast])

  const handleDeletePost=async(e)=>{
    try {
      e.preventDefault(); 
      if(!window.confirm("Are you sure you want to delete this post?"))return;
      const res=await fetch(`/api/posts/${post._id}`,{
        method:"DELETE",
      });
      const data=await res.json();
      if(data.error){
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted successfully", "success");
      setPosts(posts.filter((p)=>p._id!==post._id));
    } catch (error) {
      showToast("Error",error.message,"error");
    }
  }

  if(!user)return null;


 
  
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex 
        gap={{ base: 2, sm: 3 }} 
        mb={{ base: 3, md: 4 }} 
        p={{ base: 3, sm: 4, md: 5 }}
        bg={bgColor}
        borderRadius={{ base: "lg", md: "xl" }}
        border="1px solid"
        borderColor={borderColor}
        transition="all 0.3s"
        className="card-hover"
        _hover={{
          borderColor: hoverBorderColor,
        }}
      >
        <Flex flexDirection={"column"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
          <Avatar 
            name={user.name}
            src={user?.profilePic} 
            size={{ base: "sm", md: "md" }}
            border="2px solid"
            borderColor={borderColor}
            onClick={(e)=>{
              e.preventDefault();
              Navigate(`/${user.username}`)
            }}
          />
          <Box flex={1} w={"1px"} bg={borderColor} my={2}></Box>

          <Box position={"relative"} w={{ base: "36px", md: "42px" }} h={{ base: "32px", md: "38px" }}>
            {post.replies.length===0 && <Text textAlign={"center"}>🤔</Text>}
            {post.replies[0] && (
              <Avatar
              name={user.name}
              src={post.replies[0].userProfilePic}
              size={"xs"}
              position={"absolute"}
              bottom={"0px"}
              left={"50%"}
              transform={"translateX(-50%)"}
              border="2px solid"
              borderColor={bgColor}
            />
            )}
            {post.replies[1] && (
              <Avatar
              name={user.name}
              src={post.replies[1].userProfilePic}
              size={"xs"}
              position={"absolute"}
              top={"0px"}
              left={"-2px"}
              border="2px solid"
              borderColor={bgColor}
            />
            )}
            
            {post.replies[2] && (
              <Avatar
              name="Mark Zuckerberg"
              src={post.replies[2].userProfilePic}
              size={"xs"}
              position={"absolute"}
              top={"0px"}
              right={"-2px"}
              border="2px solid"
              borderColor={bgColor}
            />)}
            
           
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2} minW={0}>
          <Flex justifyContent={"space-between"} w={"full"} align="center" gap={2}>
            <Flex alignItems={'center'} gap={1} minW={0} flex={1}>
                <Avatar 
                  name={user.name}
                  src={user?.profilePic} 
                  size="sm"
                  border="2px solid"
                  borderColor={borderColor}
                  onClick={(e)=>{
                    e.preventDefault();
                    Navigate(`/${user.username}`)
                  }}
                  display={{ base: "block", sm: "none" }}
                  flexShrink={0}
                />
                <Text onClick={(e)=>{
              e.preventDefault();
              Navigate(`/${user.username}`)
            }} fontSize={{ base: "xs", sm: "sm" }} fontWeight={"bold"} color={textColor} isTruncated>
                    {user?.username}
                </Text>
                <Image src="/verified.png" w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} flexShrink={0} />
            </Flex>
            <Flex gap={{ base: 2, md: 3 }} alignItems={'center'} flexShrink={0}>
                <Text fontSize={{ base: "xs", sm: "sm" }} textAlign={'right'} color={secondaryTextColor} whiteSpace="nowrap">{(() => {
                  const timeAgo = formatDistanceToNow(new Date(post.createdAt)).replace('about ', '');
                  return timeAgo === 'less than a minute' ? 'just now' : `${timeAgo} ago`;
                })()}</Text>
                {currentUser?._id===user._id && <DeleteIcon size={{ base: 16, md: 20 }} onClick={handleDeletePost} cursor="pointer"/>}
            </Flex>
          </Flex>
          <Text fontSize={{ base: "sm", md: "md" }} color={textColor} mt={2}>{post.text}</Text>
          {post.img &&(
          <Box
            borderRadius="lg"
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={borderColor}
            mt={3}
          >
            <Image src={post.img} w={"full"} />
          </Box>)}
          <Flex gap={3} my={1}>
            <Actions post={post}/>
          </Flex>
          
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
