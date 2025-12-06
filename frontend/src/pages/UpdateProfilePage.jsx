import { userAtom } from "@/atoms/userAtom";
import usePreviewImage from "@/hooks/usePreviewImage";
import useShowToast from "@/hooks/useShowToast";
import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Avatar,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";

export default function UpdateProfilePage() {
  const [user,setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    password: "",
  }); 
  const fileRef=useRef(null);
  const {handleImageChange, imgUrl}=usePreviewImage();
  const showToast=useShowToast();
  const [updating,setUpdating]=useState(false);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(updating)return;
    setUpdating(true);
    try {
      const res=await fetch(`/api/users/update/${user._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...inputs,profilePic:imgUrl})
      });
      const data=await res.json();
      if(data.error){
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
      navigate(`/${data.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }finally{
      setUpdating(false)
    }
  };
  return (
    <Flex align="center" justify="center" minH="100vh" w="full" px={4} className="animate-fade-in">
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px' }}>
    <Stack
      spacing={6}
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      rounded="2xl"
      p={{ base: 6, md: 8 }}
      boxShadow={useColorModeValue(
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)'
      )}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Heading 
        fontSize={{ base: "2xl", md: "3xl" }} 
        color={useColorModeValue('gray.900', 'gray.100')}
        fontFamily="heading"
        fontWeight="700"
      >
        Edit Profile
      </Heading>

      <FormControl>
        <Stack direction={["column", "row"]} spacing={6} align="center">
          <Center>
            <Avatar
              size="xl"
              boxShadow={useColorModeValue(
                '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              )}
              src={imgUrl || user.profilePic}
              border="4px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
            />
          </Center>
          <Center w="full">
            <Button
              onClick={()=>fileRef.current.click()}
              w="full"
              size="lg"
              variant="outline"
              borderColor={useColorModeValue('brand.600', 'brand.500')}
              color={useColorModeValue('brand.600', 'brand.400')}
              _hover={{ 
                bg: useColorModeValue('brand.50', 'gray.700'),
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
            >
              Change Avatar
            </Button>
            <Input onChange={handleImageChange} type="file" hidden ref={fileRef}/>
          </Center>
        </Stack>
      </FormControl>

      <FormControl>
        <FormLabel 
          color={useColorModeValue('gray.700', 'gray.300')}
          fontWeight="600"
          fontSize="sm"
        >
          Full Name
        </FormLabel>
        <Input
          value={inputs.name}
          onChange={(e) => {
            setInputs({ ...inputs, name: e.target.value });
          }}
          size="lg"
          placeholder="John Doe"
          _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
        />
      </FormControl>

      <FormControl>
        <FormLabel 
          color={useColorModeValue('gray.700', 'gray.300')}
          fontWeight="600"
          fontSize="sm"
        >
          Username
        </FormLabel>
        <Input
          value={inputs.username}
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
          }}
          size="lg"
          placeholder="johndoe"
          _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
        />
      </FormControl>

      <FormControl>
        <FormLabel 
          color={useColorModeValue('gray.700', 'gray.300')}
          fontWeight="600"
          fontSize="sm"
        >
          Email
        </FormLabel>
        <Input
          value={inputs.email}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value });
          }}
          size="lg"
          type="email"
          placeholder="example@mail.com"
          _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
        />
      </FormControl>

      <FormControl>
        <FormLabel 
          color={useColorModeValue('gray.700', 'gray.300')}
          fontWeight="600"
          fontSize="sm"
        >
          Bio
        </FormLabel>
        <Input
          value={inputs.bio}
          onChange={(e) => {
            setInputs({ ...inputs, bio: e.target.value });
          }}
          size="lg"
          placeholder="Tell something about yourself"
          _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
        />
      </FormControl>

      <FormControl> 
        <FormLabel 
          color={useColorModeValue('gray.700', 'gray.300')}
          fontWeight="600"
          fontSize="sm"
        >
          Password
        </FormLabel>
        <Input
          value={inputs.password}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
          size="lg"
          placeholder="New password"
          type="password"
          _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
        />
      </FormControl>

      <Stack direction={["column", "row"]} spacing={4} pt={4}>
        <Button
        onClick={() => navigate("/")}
          w="full"
          size="lg"
          variant="outline"
          _hover={{ 
            bg: useColorModeValue('gray.50', 'gray.700'),
          }}
          
        >
          Cancel
        </Button>

        <Button
          isLoading={updating}
          onClick={handleSubmit}
          type="submit"
          w="full"
          size="lg"
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
    </form>
    </Flex>
  );
}
