import { Avatar, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'


const Comment = ({reply}) => {
    const [liked, setLiked] = useState(false)
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    
  return (
    <>
    <Flex gap={4} py={4} my={2} w={'full'}>
        <Avatar 
          src={reply.userProfilePic} 
          size={"sm"} 
          name="Mark Zuckerberg"
          border="2px solid"
          borderColor={borderColor}
        />
        <Flex gap={2} w={'full'} flexDirection={'column'}>
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'sm'} fontWeight={'bold'} color={textColor}>{reply.username}</Text>
           
          </Flex>
          <Text color={textColor} fontSize="sm">{reply.text}</Text>
        
        </Flex>
    </Flex>
    <Divider borderColor={borderColor} />
    </>
  )
}

export default Comment