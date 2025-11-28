import { Flex, Image, Link } from '@chakra-ui/react'
import React  from 'react'
import { useColorMode } from "@/components/ui/color-mode"
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/userAtom'
import { AiFillHome } from 'react-icons/ai'
import { Link  as RouterLink} from 'react-router'
import { RxAvatar } from 'react-icons/rx'


const Header = () => {
    const user=useRecoilValue(userAtom)
    const {colorMode,toggleColorMode}=useColorMode()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch by not rendering until mounted
    // Light logo on dark background, dark logo on light background
    const logoSrc = mounted && colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'

    return (
        <Flex 
            justifyContent={user ? "space-between" : "center"} 
            alignItems={"center"}
            mt={6} 
            mb={12}
            px={{ base: 4, md: 0 }}
            className="animate-fade-in"
        >
            {user && 
            <Link 
                as={RouterLink} 
                to="/"
                _hover={{ transform: 'scale(1.1)' }}
                transition="all 0.2s"
            >
                <Flex 
                    className="icon-container"
                    bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
                    _hover={{ 
                        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <AiFillHome size={20} />
                </Flex>
            </Link>}
            <Image 
                cursor={'pointer'} 
                w={6} 
                h={6}
                objectFit="contain" 
                src={logoSrc} 
                alt="logo" 
                onClick={toggleColorMode}
                fallbackSrc="/dark-logo.svg"
                transition="all 0.3s"
                _hover={{ transform: 'rotate(180deg)' }}
            />
            {user && 
            <Link 
                as={RouterLink} 
                to={`/${user.username}`}
                _hover={{ transform: 'scale(1.1)' }}
                transition="all 0.2s"
            >
                <Flex 
                    className="icon-container"
                    bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
                    _hover={{ 
                        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <RxAvatar size={20} />
                </Flex>
            </Link>}
        </Flex>
    )
}

export default Header