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
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontWeight={"bold"} fontSize={"3xl"}>{user.username}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && <Avatar name={user.name} src={user.profilePic} size={{base:"md",md:"xl"}} />}
          {!user.profilePic && <Avatar name={user.name} src="https://bit.ly/broken-link" size={{base:"md",md:"xl"}} />}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser._id===user._id &&(
        <Link as={RouterLink} to="/update" >
        <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
       {currentUser._id!==user._id &&(
        
        <Button onClick={handleFollowUnfollow} isLoading={updating} size={"sm"}>{following ? "Unfollow":"Follow"}</Button>
        
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal />
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyUrl}>
                  Copy Link
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
         <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
