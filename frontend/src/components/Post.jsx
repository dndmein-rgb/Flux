import { Avatar, Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import Actions from "./Actions";
import useShowToast from "@/hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";

const Post = ({post,postedBy}) => {
   const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  
  const [liked,setLiked]=useState(false);
  const [user,setUser]=useState(null);
  const showToast=useShowToast();
  const Navigate=useNavigate();
  //fetch the user
  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await fetch(`/api/users/profile/${postedBy}`);
        const data=await res.json();
        console.log(data);
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
  if(!user)return null;


 
  
  return (
    <Link to={`/${user.username}/post /${post._id}`}>
      <Flex 
        gap={3} 
        mb={4} 
        p={5}
        bg={bgColor}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        transition="all 0.3s"
        className="card-hover"
        _hover={{
          borderColor: useColorModeValue('brand.300', 'brand.700'),
        }}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar 
            name={user.name}
            src={user?.profilePic} 
            size={"md"}
            border="2px solid"
            borderColor={borderColor}
            onClick={(e)=>{
              e.preventDefault();
              Navigate(`/${user.username}`)
            }}
          />
          <Box flex={1} w={"1px"} bg={borderColor} my={2}></Box>

          <Box position={"relative"} w={"40px"} h={"40px"}>
            {post.replies.length===0 && <Text textAlign={"center"}>🤔</Text>}
            {post.replies[0] && (
              <Avatar
              name="Mark Zuckerberg"
              src={post.replies[0].userProfilePic}
              size={"xs"}
              position={" solute"}
              top={"0px"}
              left={"15px"}
              border="2px solid"
              borderColor={bgColor}
            />
            )}
            {post.replies[1] && (
              <Avatar
              name="Mark Zuckerberg"
              src={post.replies[1].userProfilePic}
              size={"xs"}
              position={"absolute"}
              bottom={"0px"}
              left={"15px"}
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
              bottom={"0px"}
              right={"-5px"}
              border="2px solid"
              borderColor={bgColor}
            />)}
            
           
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"} align="center">
            <Flex w={"full"} alignItems={'center'} gap={1}>
                <Text onClick={(e)=>{
              e.preventDefault();
              Navigate(`/${user.username}`)
            }} fontSize={"sm"} fontWeight={"bold"} color={textColor}>
                    {user?.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={3} alignItems={'center'}>
                <Text fontSize={"sm"} w={36} textAlign={'right'} color={secondaryTextColor}>{formatDistanceToNow(new Date(post.createdAt)).replace('about ', '')} ago</Text>
            </Flex>
          </Flex>
          <Text fontSize={"sm"} color={textColor} mt={2}>{post.text}</Text>
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
            <Actions liked={liked} setLiked={setLiked}/>
          </Flex>
          <Flex gap={2} alignItems={'center'} mt={2}>
            <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">{post.replies.length} replies</Text>
            <Box w={0.5} h={0.5} borderRadius={'full'} bg={secondaryTextColor}></Box>
            <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">{post.likes.length} likes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
