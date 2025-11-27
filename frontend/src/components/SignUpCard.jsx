import {
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
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
import { useSetRecoilState } from "recoil";
import { authScreenAtom } from "@/atoms/authAtom";
import { TbInputSearch } from "react-icons/tb";
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

export default function SignupUI() {
	const [showPassword, setShowPassword] = useState(false);
	const mode = useColorModeValue(false, true);
    const setAuthScreen=useSetRecoilState(authScreenAtom)
	const showToast =useShowToast();
	 const setUser=useSetRecoilState(userAtom);

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    })
    const handleSignup=async()=>{
        try {
            const res=await fetch("/api/users/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(inputs)
            })
			const data=await res.json();
			if(data.error){
				showToast("Error",data.error,"error")
				return
			}
			
			
			localStorage.setItem("user-threads",JSON.stringify(data))
			setUser(data);
        } catch (error) {
          showToast("Error",error,"error")
        }
    }

	return (
		<Stack spacing={6} mx="auto" maxW="md" w="full">
			
			<Stack align="center">
				<Heading fontSize="4xl" color={styles.heading(mode)}>Sign up</Heading>
			</Stack>

				<Box
					rounded="lg"
					bg={styles.cardBg(mode)}
					p={8}
					border="1px solid"
					borderColor={styles.border(mode)}
					boxShadow="0px 8px 25px rgba(30,64,175,0.15)"
				>
					<Stack spacing={4}>

						<HStack>
							<FormControl isRequired>
								<FormLabel color={styles.heading(mode)}>Full name</FormLabel>
								<Input onChange={(e)=>{setInputs({...inputs,name:e.target.value})}} value={inputs.name} borderColor={styles.inputBorder(mode)} _focus={{ borderColor:"#3b82f6" }} />
							</FormControl>

							<FormControl isRequired>
								<FormLabel  color={styles.heading(mode)}>Username</FormLabel>
								<Input borderColor={styles.inputBorder(mode)} onChange={(e)=>{setInputs({...inputs,username:e.target.value})}} value={inputs.username} _focus={{ borderColor:"#3b82f6" }} />
							</FormControl>
						</HStack>

						<FormControl isRequired>
							<FormLabel color={styles.heading(mode)}  >Email address</FormLabel>
							<Input type="email" onChange={(e)=>{setInputs({...inputs,email:e.target.value})}} value={inputs.email} borderColor={styles.inputBorder(mode)} _focus={{ borderColor:"#3b82f6" }} />
						</FormControl>

						<FormControl isRequired>
							<FormLabel color={styles.heading(mode)}>Password</FormLabel>
							<InputGroup>
								<Input 
									onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}
									value={inputs.password}
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
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>

						<Text align="center" color={styles.grayText(mode)}>
							Already a user? <Link onClick={()=>{setAuthScreen("login")}} color={styles.linkBlue}>Login</Link>
						</Text>

					</Stack>
				</Box>
		</Stack>
	);
}
