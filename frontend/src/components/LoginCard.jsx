import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
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
        <Stack spacing={8} mx="auto" maxW="md" w="full" className="animate-scale-in" px={4}>
            
            <Stack align="center" spacing={2}>
                <Heading 
                    fontSize={{ base: "3xl", md: "4xl" }} 
                    color={styles.heading(mode)}
                    fontFamily="heading"
                    fontWeight="800"
                >
                    Welcome Back
                </Heading>
                <Text color={styles.grayText(mode)} fontSize="md">
                    Login to continue to Threads
                </Text>
            </Stack>

                <Box
                    rounded="2xl"
                    bg={styles.cardBg(mode)}
                    p={{ base: 6, md: 8 }}
                    border="1px solid"
                    borderColor={styles.border(mode)}
                    boxShadow={mode 
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.6)" 
                        : "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                    }
                >
                    <Stack spacing={6}>

                        <FormControl isRequired>
                            <FormLabel 
                                color={styles.heading(mode)}
                                fontWeight="600"
                                fontSize="sm"
                            >
                                Username
                            </FormLabel>
                            <InputGroup size="lg">
                                <InputLeftElement h="full" pointerEvents="none">
                                    <Text color={styles.grayText(mode)}>@</Text>
                                </InputLeftElement>
                                <Input 
                                    onChange={(e)=>{setInputs({...inputs,username:e.target.value})}} 
                                    value={inputs.username} 
                                    paddingLeft="2.5rem"
                                    borderColor={styles.inputBorder(mode)} 
                                    _focus={{ 
                                        borderColor:"#3b82f6",
                                        boxShadow: "0 0 0 1px #3b82f6"
                                    }} 
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel 
                                color={styles.heading(mode)}
                                fontWeight="600"
                                fontSize="sm"
                            >
                                Password
                            </FormLabel>
                            <InputGroup size="lg">
                                <Input
                                    onChange={(e)=>{setInputs({...inputs, password:e.target.value})}} 
                                    value={inputs.password}
                                    type={showPassword ? "text" : "password"}
                                    borderColor={styles.inputBorder(mode)}
                                    _focus={{ 
                                        borderColor:"#3b82f6",
                                        boxShadow: "0 0 0 1px #3b82f6"
                                    }}
                                />
                                <InputRightElement h="full">
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        size="sm"
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={6} pt={4}>
                            <Button
                                size="lg"
                                bg={styles.buttonBg(mode)}
                                _hover={{ 
                                    bg:styles.buttonHover(mode),
                                    transform: 'translateY(-2px)',
                                    boxShadow: mode 
                                        ? '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                                        : '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                                }}
                                color="white"
                                onClick={handleLogin}
                                loadingText="Logging in"
                                isLoading={loading}
                                fontWeight="600"
                            >
                                Login
                            </Button>
                        </Stack>

                        <Text align="center" color={styles.grayText(mode)} fontSize="sm">
                            Don't have an account?{" "}
                            <Link 
                                color={styles.linkBlue} 
                                onClick={()=>setAuthScreen("signup")}
                                fontWeight="600"
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Sign up
                            </Link>
                        </Text>

                    </Stack>
                </Box>
        </Stack>
    );
}
