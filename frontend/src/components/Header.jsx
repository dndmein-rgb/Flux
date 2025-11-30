import { Flex, Image, Link, Button, Box } from '@chakra-ui/react'
import React from 'react'
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { useRecoilValue ,useSetRecoilState} from 'recoil'
import { userAtom } from '@/atoms/userAtom'
import { AiFillHome } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router'
import { RxAvatar } from 'react-icons/rx'
import { FiLogOut } from 'react-icons/fi'
import useLogout from '@/hooks/useLogout'
import {authScreenAtom} from '@/atoms/authAtom'
import {  BsFillChatQuoteFill } from 'react-icons/bs'

const Header = () => {
    const user = useRecoilValue(userAtom)
    const { colorMode, toggleColorMode } = useColorMode()
    const [mounted, setMounted] = React.useState(false)
    const setAuthScreen=useSetRecoilState(authScreenAtom)
    const logout=useLogout()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const logoSrc = mounted && colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'
    const hoverBg = useColorModeValue('red.50', 'red.900')
    const iconBg = colorMode === 'dark' ? 'gray.800' : 'gray.100'
    const iconHoverBg = colorMode === 'dark' ? 'gray.700' : 'gray.200'

    return (
        <Flex 
            justifyContent="space-between"
            alignItems="center"
            mt={{ base: 4, md: 6 }} 
            mb={{ base: 8, md: 12 }}
            px={{ base: 4, sm: 6, md: 8 }}
            w="100%"
            maxW="620px"
            mx="auto"
        >
            {/* Left section - Home icon or Login */}
            <Box w={{ base: "80px", md: "100px" }}>
                {user ? (
                    <Link 
                        as={RouterLink} 
                        to="/"
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="all 0.2s"
                    >
                        <Flex 
                            bg={iconBg}
                            _hover={{ bg: iconHoverBg }}
                            alignItems="center"
                            justifyContent="center"
                            w={{ base: "36px", md: "40px" }}
                            h={{ base: "36px", md: "40px" }}
                            borderRadius="md"
                        >
                            <AiFillHome size={20} />
                        </Flex>
                    </Link>
                ) : (
                    <Link 
                        onClick={() => setAuthScreen('login')}
                        as={RouterLink} 
                        to="/auth"
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="all 0.2s"
                    >
                        <Flex 
                            bg={iconBg}
                            _hover={{ bg: iconHoverBg }}
                            alignItems="center"
                            justifyContent="center"
                            px={{ base: 3, md: 4 }}
                            h={{ base: "36px", md: "40px" }}
                            borderRadius="md"
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight="medium"
                        >
                            Login
                        </Flex>
                    </Link>
                )}
            </Box>

            {/* Center section - Logo */}
            <Image 
                cursor="pointer"
                w={{ base: 5, md: 6 }}
                h={{ base: 5, md: 6 }}
                objectFit="contain" 
                src={logoSrc} 
                alt="logo" 
                onClick={toggleColorMode}
                fallbackSrc="/dark-logo.svg"
                transition="all 0.3s"
                _hover={{ transform: 'rotate(180deg)' }}
            />

            {/* Right section - Avatar/Logout or Sign up */}
            <Box w={{ base: "80px", md: "100px" }}>
                {user ? (
                    <Flex gap={{ base: 2, md: 3 }} justifyContent="flex-end" alignItems="center">
                        <Link 
                            as={RouterLink} 
                            to={`/${user.username}`}
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                        >
                            <Flex 
                                bg={iconBg}
                                _hover={{ bg: iconHoverBg }}
                                alignItems="center"
                                justifyContent="center"
                                w={{ base: "36px", md: "40px" }}
                                h={{ base: "36px", md: "40px" }}
                                borderRadius="md"
                            >
                                <RxAvatar size={20} />
                            </Flex>
                        </Link>
                         <Link 
                            as={RouterLink} 
                            to={`/chat`}
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                        >
                            <Flex 
                                bg={iconBg}
                                _hover={{ bg: iconHoverBg }}
                                alignItems="center"
                                justifyContent="center"
                                w={{ base: "36px", md: "40px" }}
                                h={{ base: "36px", md: "40px" }}
                                borderRadius="md"
                            >
                                <BsFillChatQuoteFill size={20} />
                            </Flex>
                        </Link>
                        <Flex 
                            as="button"
                            onClick={logout}
                            bg={iconBg}
                            _hover={{ 
                                bg: hoverBg,
                                color: 'red.500',
                                transform: 'translateY(-2px)',
                            }}
                            alignItems="center"
                            justifyContent="center"
                            w={{ base: "36px", md: "40px" }}
                            h={{ base: "36px", md: "40px" }}
                            borderRadius="md"
                            transition="all 0.2s"
                            cursor="pointer"
                        >
                            <FiLogOut size={18} />
                        </Flex>
                    </Flex>
                ) : (
                    <Flex justifyContent="flex-end">
                        <Link 
                            onClick={() => setAuthScreen('signup')}
                            as={RouterLink} 
                            to="/auth"
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            <Flex 
                                bg={iconBg}
                                _hover={{ bg: iconHoverBg }}
                                alignItems="center"
                                justifyContent="center"
                                px={{ base: 3, md: 4 }}
                                h={{ base: "36px", md: "40px" }}
                                borderRadius="md"
                                fontSize={{ base: "sm", md: "md" }}
                                fontWeight="medium"
                            >
                                Sign up
                            </Flex>
                        </Link>
                    </Flex>
                )}
            </Box>
        </Flex>
    )
}

export default Header