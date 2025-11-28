import { Avatar, Box, Flex, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router";
import Actions from "./Actions";

const UserPost = ({postImg,postTitle,likes ,replies}) => {
  const [liked,setLiked]=useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Link to={"/markzuckerberg/post/1"}>
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
            name="Mark Zuckerberg" 
            src="/zuck-avatar.png" 
            size={"md"}
            border="2px solid"
            borderColor={borderColor}
          />
          <Box h={"full"} w={"1px"} bg={borderColor} my={2}></Box>

          <Box position={"relative"} w={"full"}>
            <Avatar
              name="Mark Zuckerberg"
              src="/zuck-avatar.png"
              size={"xs"}
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              name="Mark Zuckerberg"
              src="/zuck-avatar.png"
              size={{
              base:"xs",
              md:"xl",
              
              }}
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              name="Mark Zuckerberg"
              src="/zuck-avatar.png"
              size={"xs"}
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"} align="center">
            <Flex w={"full"} alignItems={'center'} gap={1}>
                <Text fontSize={"sm"} fontWeight={"bold"} color={textColor}>
                    markzuckerberg
                </Text>
                <Image src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={3} alignItems={'center'}>
                <Text fontSize={"sm"} color={secondaryTextColor}>1d</Text>
                <BsThreeDots color={secondaryTextColor}/>
            </Flex>
          </Flex>
          <Text fontSize={"sm"} color={textColor} mt={2}>{postTitle}</Text>
          {postImg &&(
          <Box
            borderRadius="lg"
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={borderColor}
            mt={3}
          >
            <Image src={postImg} w={"full"} />
          </Box>)}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked}/>
          </Flex>
          <Flex gap={2} alignItems={'center'} mt={2}>
            <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">{replies} replies</Text>
            <Box w={0.5} h={0.5} borderRadius={'full'} bg={secondaryTextColor}></Box>
            <Text color={secondaryTextColor} fontSize={'sm'} fontWeight="500">{likes} likes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
