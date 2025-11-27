'use client'

import { IconButton, Skeleton, Box, useColorMode as useChakraColorMode } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const { setColorMode: setChakraColorMode } = useChakraColorMode()
  
  const colorMode = resolvedTheme || 'dark'
  
  const toggleColorMode = () => {
    const newMode = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newMode)
    setChakraColorMode(newMode)
  }
  
  const setColorMode = (mode) => {
    setTheme(mode)
    setChakraColorMode(mode)
  }
  
  // Sync Chakra color mode with next-themes on mount
  React.useEffect(() => {
    if (resolvedTheme) {
      setChakraColorMode(resolvedTheme)
    }
  }, [resolvedTheme, setChakraColorMode])
  
  return {
    colorMode,
    setColorMode,
    toggleColorMode,
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) {
      return <Skeleton boxSize='9' />
    }

    return (
      <IconButton
        onClick={toggleColorMode}
        variant='ghost'
        aria-label='Toggle color mode'
        size='sm'
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    )
  },
)

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Box
      color='fg'
      display='contents'
      className='chakra-theme light'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Box
      color='fg'
      display='contents'
      className='chakra-theme dark'
      ref={ref}
      {...props}
    />
  )
})
