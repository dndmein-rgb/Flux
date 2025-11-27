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
        <Flex justifyContent={"space-between"} mt={6} mb={12}>
            {user && 
            <Link as={RouterLink} to="/">
            <AiFillHome size={24} cursor={"pointer"} />
            </Link>}
            <Image 
                cursor={'pointer'} 
                w={6} 
                objectFit="contain" 
                src={logoSrc} 
                alt="logo" 
                onClick={toggleColorMode}
                fallbackSrc="/dark-logo.svg"
            />
            {user && 
            <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} cursor={"pointer"} />
            </Link>}
        </Flex>
    )
}

export default Header