import React, { useState } from "react";
import UserHeader from "../components/UserHeader";
import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "@/components/Actions";
import Comment from "@/components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} gap={3} alignItems={"center"}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg"/>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots/>
        </Flex>
      </Flex>

      <Text my={3}>Let's talk about Threads.</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src="/post1.png" w={"full"}/>
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
      <Text color={'gray.light'} fontSize={'sm'}>238 replies</Text>
      <Box w={0.5} h={0.5} bg={'gray.light'} borderRadius={'full'}></Box>
      <Text color={'gray.light'} fontSize={'sm'}>
        {121+ (liked ?1:0)} likes</Text>
      </Flex>

      <Divider my={4} />
      
      <Flex justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
          <Text fontSize={'2xl'} >👋</Text>
          <Text color={'gray.light'} >Get the apps to like,reply and post.</Text>
        </Flex>
        <Button>
          Get
        </Button>
      </Flex>

      <Divider my={4} />
      <Comment 
      comment="Looks really good!"
      createdAt="2d"
      likes={100}
      username="XXXXXXX"
      userAvatar='https://picsum.photos/400/400?random=1'
       />
        <Comment 
      comment="Intresting!"
      createdAt="1d"
      likes={20}
      username="Harry"
      userAvatar='https://picsum.photos/400/400?random=2'
       />
        <Comment 
      comment="That's great!"
      createdAt="5d"
      likes={300}
      username="John"
      userAvatar='https://picsum.photos/400/400?random=3'
       />
    </>
  );
};

export default PostPage;