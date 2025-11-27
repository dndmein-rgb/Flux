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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

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
      if(data.errror){
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error.message, "error");
    }finally{
      setUpdating(false)
    }
  };
  return (
    <Flex align="center" justify="center" minH="100vh" w="full" px={4}>
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px' }}>
    <Stack
      spacing={5}
      w="full"
      bg="gray.800"
      rounded="xl"
      p={6}
      boxShadow="dark-lg"
    >
      <Heading fontSize={{ base: "2xl", md: "3xl" }} color="gray.100">
        User Profile Edit
      </Heading>

      <FormControl>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              boxShadow="lg"
              src={imgUrl || user.profilePic}
            />
          </Center>
          <Center w="full">
            <Button
            onClick={()=>fileRef.current.click()}
            
              w="full"
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.700" }}
            >
              Change Avatar
            </Button>
            <Input onChange={handleImageChange} type="file" hidden ref={fileRef}/>
          </Center>
        </Stack>
      </FormControl>

      <FormControl >
        <FormLabel color="gray.300">Full Name</FormLabel>
        <Input
        value={inputs.name}
          onChange={(e) => {
            setInputs({ ...inputs, name: e.target.value });
          }}
          bg="gray.700"
          borderColor="gray.600"
          color="gray.100"
          _placeholder={{ color: "gray.500" }}
          placeholder="John Doe"
        />
      </FormControl>

      <FormControl >
        <FormLabel color="gray.300">Username</FormLabel>
        <Input
          value={inputs.username}
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
          }}
          bg="gray.700"
          borderColor="gray.600"
          color="gray.100"
          _placeholder={{ color: "gray.500" }}
          placeholder="johndoe"
        />
      </FormControl>

      <FormControl >
        <FormLabel color="gray.300">Email</FormLabel>
        <Input
        value={inputs.email}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value });
          }}
          bg="gray.700"
          borderColor="gray.600"
          color="gray.100"
          _placeholder={{ color: "gray.500" }}
          placeholder="example@mail.com"
        />
      </FormControl>

      <FormControl >
        <FormLabel color="gray.300">Bio</FormLabel>
        <Input
        value={inputs.bio}
          onChange={(e) => {
            setInputs({ ...inputs, bio: e.target.value });
          }}
          bg="gray.700"
          borderColor="gray.600"
          color="gray.100"
          _placeholder={{ color: "gray.500" }}
          placeholder="Tell something about yourself"
        />
      </FormControl>

      <FormControl > 
        <FormLabel color="gray.300">Password</FormLabel>
        <Input
        value={inputs.password}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
          bg="gray.700"
          borderColor="gray.600"
          color="gray.100"
          _placeholder={{ color: "gray.500" }}
          placeholder="New password"
          type="password"
        />
      </FormControl>

      <Stack direction={["column", "row"]} spacing={5}>
        <Button
          w="full"
          bg="gray.600"
          color="white"
          _hover={{ bg: "gray.500" }}
        >
          Cancel
        </Button>

        <Button
        isLoading={updating}
        onClick={handleSubmit}
        type="submit  "
          w="full"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
    </form>
    </Flex>
  );
}
