import React, { useState } from "react";
import UserHeader from "../components/UserHeader";
import { Avatar, Box, Button, Divider, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "@/components/Actions";
import Comment from "@/components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box className="animate-fade-in">
      <Box
        bg={bgColor}
        p={6}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={useColorModeValue(
          '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
        )}
        mb={4}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Flex gap={3} alignItems={"center"}>
            <Avatar 
              src="/zuck-avatar.png" 
              size={"md"} 
              name="Mark Zuckerberg"
              border="2px solid"
              borderColor={borderColor}
            />
            <Flex align="center" gap={1}>
              <Text fontSize={"sm"} fontWeight={"bold"} color={textColor}>markzuckerberg</Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
          </Flex>
          <Flex gap={3} alignItems={'center'}>
            <Text fontSize={"sm"} color={secondaryTextColor}>1d</Text>
            <Box as={BsThreeDots} color={secondaryTextColor} />
          </Flex>
        </Flex>

        <Text my={4} color={textColor} fontSize="md">Let's talk about Threads.</Text>
        
        <Box 
          borderRadius="xl" 
          overflow={"hidden"} 
          border={"1px solid"} 
          borderColor={borderColor}
          mb={4}
        >
          <Image src="/post1.png" w={"full"}/>
        </Box>
        
        <Flex gap={3} my={3}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        
        <Flex gap={2} alignItems={'center'}>
          <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">238 replies</Text>
          <Box w={0.5} h={0.5} bg={secondaryTextColor} borderRadius={'full'}></Box>
          <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">
            {121+ (liked ?1:0)} likes
          </Text>
        </Flex>
      </Box>

      <Divider borderColor={borderColor} my={6} />
      
      <Flex 
        justifyContent={'space-between'} 
        align="center"
        bg={useColorModeValue('blue.50', 'gray.800')}
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
      <Comment 
        comment="Looks really good!"
        createdAt="2d"
        likes={100}
        username="johndoe"
        userAvatar='https://picsum.photos/400/400?random=1'
      />
      <Comment 
        comment="Interesting!"
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
    </Box>
  );
};

export default PostPage;