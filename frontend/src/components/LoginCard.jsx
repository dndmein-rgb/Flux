import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { authScreenAtom } from "@/atoms/authAtom";
import { useSetRecoilState } from "recoil";
import useShowToast from "@/hooks/useShowToast";
import { userAtom } from "@/atoms/userAtom";

const styles = {
    bgPage: (d) => (d ? "#0a1224" : "#eef6ff"),
    cardBg: (d) => (d ? "#1c2541" : "white"),
    heading: (d) => (d ? "#93c5fd" : "#1e3a8a"),
    inputBorder: (d) => (d ? "#475569" : "#bfdbfe"),
    border: (d) => (d ? "#334155" : "#dbeafe"),
    buttonBg: (d) => (d ? "#3b82f6" : "#1e3a8a"),
    buttonHover: (d) => (d ? "#60a5fa" : "#153e75"),
    grayText: (d) => (d ? "gray.400" : "gray.600"),
    linkBlue: "#3b82f6",
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false)
    const mode = useColorModeValue(false, true);
    const setAuthScreen=useSetRecoilState(authScreenAtom)
    const setUser=useSetRecoilState(userAtom)
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    })
    const showToast=useShowToast();
    const handleLogin=async()=>{
        setLoading(true);
        try {
            const res=await fetch("/api/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(inputs)
        })
            const data=await res.json();
            if(data.error){
                showToast("Error", data.error, "error")
                return;
            }
            localStorage.setItem("user-threads",JSON.stringify(data))
            setUser(data);
            console.log(data);
        } catch (error) {
            showToast("Error",error,"error")
        }finally{
            setLoading(false);
        }
    }

    return (
        <Stack spacing={6} mx="auto" maxW="md" w="full">
            
            <Stack align="center">
                <Heading fontSize="4xl" color={styles.heading(mode)}>Login</Heading>
            </Stack>

                <Box
                    rounded="lg"
                    bg={styles.cardBg(mode)}
                    p={8}
                    border="1px solid"
                    borderColor={styles.border(mode)}
                    boxShadow="0px 8px 25px rgba(30,64,175,0.15)"
                >
                    <Stack spacing={5}>

                        <FormControl isRequired>
                            <FormLabel color={styles.heading(mode)}> Username</FormLabel>
                            <Input onChange={(e)=>{setInputs({...inputs,username:e.target.value})}} value={inputs.username} borderColor={styles.inputBorder(mode)} _focus={{ borderColor:"#3b82f6" }} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color={styles.heading(mode)}>Password</FormLabel>
                            <InputGroup>
                                <Input
                                onChange={(e)=>{setInputs({...inputs, password:e.target.value})}} value={inputs.password}
                                    type={showPassword ? "text" : "password"}
                                    borderColor={styles.inputBorder(mode)}
                                    _focus={{ borderColor:"#3b82f6" }}
                                />
                                <InputRightElement h="full">
                                    <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                size="lg"
                                bg={styles.buttonBg(mode)}
                                _hover={{ bg:styles.buttonHover(mode) }}
                                color="white"
                                onClick={handleLogin}
                                isLoading={loading}
                            >
                                Login
                            </Button>
                        </Stack>

                        <Text align="center" color={styles.grayText(mode)}>
                            Don't have an account?{" "}
                            <Link color={styles.linkBlue} onClick={()=>setAuthScreen("signup")}>Sign up</Link>
                        </Text>

                    </Stack>
                </Box>
        </Stack>
    );
}
