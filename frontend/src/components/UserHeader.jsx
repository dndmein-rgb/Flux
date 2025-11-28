import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton } from "@chakra-ui/react";
import {  useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import {Link as RouterLink} from "react-router";
import useShowToast from "@/hooks/useShowToast";


const UserHeader = ({user}) => {
  const showToast=useShowToast()
  const [updating ,setUpdating]=useState(false);
  const currentUser=useRecoilValue(userAtom)//logged in user
  const [following,setFollowing]=useState(user?.followers?.includes(currentUser?._id) || false)
  
  // All hooks must be called before any conditional returns
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const boxShadow = useColorModeValue(
    '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
  );
  const badgeBg = useColorModeValue('gray.100', 'gray.700');
  const avatarShadow = useColorModeValue(
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  );
  const linkColor = useColorModeValue('brand.600', 'brand.400');
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuHover = useColorModeValue('gray.50', 'gray.700');
  const tabActiveColor = useColorModeValue('brand.600', 'brand.500');
  const tabActiveTextColor = useColorModeValue('brand.600', 'brand.400');
  const tabHoverBorder = useColorModeValue('gray.400', 'gray.500');
  
  if (!user) return null;
  
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success", "Profile link copied", "success");
    });
  };
  
  const handleFollowUnfollow=async()=>{
    if(!currentUser){
      showToast("Error", "Please login to follow", "error")
      return;
    }
    if(updating)return;
    setUpdating(true)
    try {
      const res=await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data=await res.json();
      if(data.error){
        showToast("Error",data.error,"error")
        return;
      }
      if(following){
        showToast("Success", `Unfollowed ${user.username}`, "success");
        user.followers.pop();
      }else{
        showToast("Success", `Followed ${user.username}`, "success");
        user.followers.push(currentUser._id);
      }
     setFollowing(!following);
    } catch (error) {
      showToast("Error",error.message,error)
    }finally{
      setUpdating(false)
    }
  }
  
  return (
    <VStack 
      gap={5} 
      alignItems={"start"} 
      className="animate-fade-in"
      bg={bgColor}
      p={{ base: 4, md: 6 }}
      borderRadius="2xl"
      boxShadow={boxShadow}
    >
      <Flex justifyContent={"space-between"} w={"full"} align="start">
        <Box flex={1}>
          <Text fontWeight={"bold"} fontSize={{ base: "2xl", md: "3xl" }} color={textColor} fontFamily="heading">
            {user.username}
          </Text>
          <Flex gap={2} alignItems={"center"} mt={2}>
            <Text fontSize={"sm"} color={secondaryTextColor}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={badgeBg}
              color={secondaryTextColor}
              px={2}
              py={1}
              borderRadius={"full"}
              fontWeight="500"
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar 
              name={user.name} 
              src={user.profilePic} 
              size={{base:"lg",md:"xl"}}
              border="4px solid"
              borderColor={borderColor}
              boxShadow={avatarShadow}
            />
          )}
          {!user.profilePic && (
            <Avatar 
              name={user.name} 
              src="https://bit.ly/broken-link" 
              size={{base:"lg",md:"xl"}}
              border="4px solid"
              borderColor={borderColor}
              boxShadow={avatarShadow}
            />
          )}
        </Box>
      </Flex>
      
      <Text color={secondaryTextColor} fontSize="md">{user.bio}</Text>

      <Flex w="full" justifyContent="center">
        {currentUser._id===user._id &&(
          <Link as={RouterLink} to="/update">
            <Button size={"md"} variant="outline">Update Profile</Button>
          </Link>
        )}
        {currentUser._id!==user._id &&(
          <Button 
            onClick={handleFollowUnfollow} 
            isLoading={updating} 
            size={"md"}
          >
            {following ? "Unfollow":"Follow"}
          </Button>
        )}
      </Flex>
      
      <Flex w={"full"} justifyContent={"space-between"} align="center">
        <Flex gap={2} alignItems={"center"} flexWrap="wrap">
          <Text color={secondaryTextColor} fontWeight="600" fontSize="sm">
            {user.followers.length} followers
          </Text>
          <Box w={1} h={1} bg={secondaryTextColor} borderRadius={"full"}></Box>
          <Link 
            color={linkColor} 
            fontSize="sm"
            _hover={{ textDecoration: 'underline' }}
          >
            instagram.com
          </Link>
        </Flex>
        <Flex gap={1}>
          <Box className="icon-container">
            <BsInstagram size={20} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={20} cursor={"pointer"} />
              </MenuButton>
              <Portal />
              <MenuList 
                bg={menuBg}
                borderColor={borderColor}
              >
                <MenuItem 
                  bg={menuBg}
                  _hover={{ bg: menuHover }}
                  onClick={copyUrl}
                >
                  Copy Link
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      
      <Flex w={"full"} gap={0}>
        <Flex 
          flex={1} 
          borderBottom={"2px solid"} 
          borderColor={tabActiveColor}
          justifyContent={"center"} 
          pb={3} 
          cursor={"pointer"}
          transition="all 0.2s"
        >
          <Text fontWeight={"bold"} color={tabActiveTextColor}>Threads</Text>
        </Flex>
        <Flex 
          flex={1} 
          borderBottom={"2px solid"} 
          borderColor={borderColor}
          color={secondaryTextColor} 
          justifyContent={"center"} 
          pb={3} 
          cursor={"pointer"}
          transition="all 0.2s"
          _hover={{ 
            borderColor: tabHoverBorder,
            color: textColor
          }}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
