import { Avatar, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'

const Comment = ({comment,createdAt,likes,username,userAvatar}) => {
    const [liked, setLiked] = useState(false)
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    
  return (
    <>
    <Flex gap={4} py={4} my={2} w={'full'}>
        <Avatar 
          src={userAvatar} 
          size={"sm"} 
          name="Mark Zuckerberg"
          border="2px solid"
          borderColor={borderColor}
        />
        <Flex gap={2} w={'full'} flexDirection={'column'}>
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'sm'} fontWeight={'bold'} color={textColor}>{username}</Text>
            <Flex gap={2} alignItems={'center'}>
                <Text fontSize={'sm'} color={secondaryTextColor}>{createdAt}</Text>
                <BsThreeDots color={secondaryTextColor} />
            </Flex>
          </Flex>
          <Text color={textColor} fontSize="sm">{comment}</Text>
          <Actions liked={liked} setLiked={setLiked}/>
          <Text fontSize={'sm'} color={secondaryTextColor} fontWeight="500">
              {100+(likes ? 1 : 0) } likes
          </Text>
        </Flex>
    </Flex>
    <Divider borderColor={borderColor} />
    </>
  )
}

export default Comment