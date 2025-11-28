import React from 'react'
import { Link } from 'react-router'
import {Button, Flex, Heading, Text, VStack, useColorModeValue, Box} from '@chakra-ui/react'


const HomePage = () => {
  return (
    <Flex 
      w={"full"} 
      justifyContent={'center'} 
      align="center"
      minH="60vh"
      className="animate-fade-in"
    >
      <VStack spacing={8} textAlign="center">
        <Box>
          <Heading 
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="800"
            fontFamily="heading"
            bgGradient={useColorModeValue(
              'linear(to-r, brand.600, purple.600)',
              'linear(to-r, brand.400, purple.400)'
            )}
            bgClip="text"
            mb={4}
          >
            Welcome to Threads
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            color={useColorModeValue('gray.600', 'gray.400')}
            maxW="600px"
          >
            Connect with friends and share your thoughts in a beautiful, modern interface
          </Text>
        </Box>
        
        <Link to={"/markzuckerberg"}>
          <Button 
            size="lg"
            px={8}
            _hover={{
              transform: 'translateY(-2px)',
            }}
          >
            Visit Profile Page
          </Button>
        </Link>
      </VStack>
    </Flex>
  )
}

export default HomePage