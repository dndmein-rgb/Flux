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
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton } from "@chakra-ui/react";
import {  useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import {Link as RouterLink} from "react-router";
import useShowToast from "@/hooks/useShowToast";
import useFollowUnfollow from '../hooks/useFollowUnfollow';

const UserHeader = ({user}) => {
  const showToast=useShowToast()
  const currentUser=useRecoilValue(userAtom)//logged in user
  const {handleFollowUnfollow, updating, following}=useFollowUnfollow(user);

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
  
  return (
    <VStack 
      gap={{ base: 4, md: 5 }} 
      alignItems={"start"} 
      className="animate-fade-in"
      bg={bgColor}
      p={{ base: 4, sm: 5, md: 6 }}
      borderRadius={{ base: "xl", md: "2xl" }}
      boxShadow={boxShadow}
      w="full"
    >
      <Flex justifyContent={"space-between"} w={"full"} align="start" gap={3}>
        <Box flex={1} minW={0}>
          <Text 
            fontWeight={"bold"} 
            fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} 
            color={textColor} 
            fontFamily="heading"
            isTruncated
          >
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"} mt={2} flexWrap="wrap">
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
        <Box flexShrink={0}>
          {user.profilePic && (
            <Avatar 
              name={user.name} 
              src={user.profilePic} 
              size={{base:"md",sm:"lg",md:"xl"}}
              border="4px solid"
              borderColor={borderColor}
              boxShadow={avatarShadow}
            />
          )}
          {!user.profilePic && (
            <Avatar 
              name={user.name} 
              src="https://bit.ly/broken-link" 
              size={{base:"md",sm:"lg",md:"xl"}}
              border="4px solid"
              borderColor={borderColor}
              boxShadow={avatarShadow}
            />
          )}
        </Box>
      </Flex>
      
      <Text color={secondaryTextColor} fontSize={{ base: "sm", md: "md" }}>{user.bio}</Text>

      <Flex w="full" justifyContent="center">
        {currentUser?._id===user._id &&(
          <Link as={RouterLink} to="/update">
            <Button size={{ base: "sm", md: "md" }} variant="outline">Update Profile</Button>
          </Link>
        )}
        {currentUser?._id!==user._id &&(
          <Button 
            onClick={handleFollowUnfollow} 
            isLoading={updating} 
            size={{ base: "sm", md: "md" }}
          >
            {following ? "Unfollow":"Follow"}
          </Button>
        )}
      </Flex>
      
      <Flex w={"full"} justifyContent={"space-between"} align="center" gap={2}>
        <Flex gap={2} alignItems={"center"} flexWrap="wrap">
          <Text color={secondaryTextColor} fontWeight="600" fontSize={{ base: "xs", md: "sm" }}>
            {user.followers.length} followers
          </Text>
          <Box w={1} h={1} bg={secondaryTextColor} borderRadius={"full"} display={{ base: "none", sm: "block" }}></Box>
          <Link 
            color={linkColor} 
            fontSize={{ base: "xs", md: "sm" }}
            _hover={{ textDecoration: 'underline' }}
            display={{ base: "none", sm: "inline" }}
          >
            instagram.com
          </Link>
        </Flex>
        <Flex gap={1}>
          <Box className="icon-container" w={{ base: "32px", md: "40px" }} h={{ base: "32px", md: "40px" }}>
            <BsInstagram size={18} cursor={"pointer"} />
          </Box>
          <Box className="icon-container" w={{ base: "32px", md: "40px" }} h={{ base: "32px", md: "40px" }}>
            <Menu>
              <MenuButton>
                <CgMoreO size={18} cursor={"pointer"} />
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
          pb={{ base: 2, md: 3 }} 
          cursor={"pointer"}
          transition="all 0.2s"
        >
          <Text fontWeight={"bold"} color={tabActiveTextColor} fontSize={{ base: "sm", md: "md" }}>Threads</Text>
        </Flex>
        <Flex 
          flex={1} 
          borderBottom={"2px solid"} 
          borderColor={borderColor}
          color={secondaryTextColor} 
          justifyContent={"center"} 
          pb={{ base: 2, md: 3 }} 
          cursor={"pointer"}
          transition="all 0.2s"
          _hover={{ 
            borderColor: tabHoverBorder,
            color: textColor
          }}
        >
          <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
