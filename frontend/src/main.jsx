import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { RecoilRoot } from 'recoil';

const theme = extendTheme({
  config: { 
    initialColorMode: 'dark', 
    useSystemColorMode: false 
  },
  fonts: {
    heading: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'dark' ? '#f1f5f9' : '#0f172a',
        bg: props.colorMode === 'dark' ? '#0f172a' : '#ffffff',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        minHeight: '100vh',
      },
    }),
  },
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    gray: { 
      light: '#64748b', 
      dark: '#334155',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: {
          transform: 'translateY(-1px)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.700',
            boxShadow: props.colorMode === 'dark' 
              ? '0 10px 15px -3px rgba(59, 130, 246, 0.3)' 
              : '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
          },
        }),
        ghost: (props) => ({
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
          },
        }),
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.300',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
          },
        }),
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.300',
            bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: props.colorMode === 'dark'
                ? '0 0 0 1px rgba(59, 130, 246, 0.5)'
                : '0 0 0 1px rgba(59, 130, 246, 0.3)',
            },
          },
        }),
      },
    },
    Textarea: {
      variants: {
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.300',
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.400',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: props.colorMode === 'dark'
              ? '0 0 0 1px rgba(59, 130, 246, 0.5)'
              : '0 0 0 1px rgba(59, 130, 246, 0.3)',
          },
        }),
      },
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: 'xl',
          boxShadow: props.colorMode === 'dark'
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(59, 130, 246, 0.5)',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RecoilRoot>
    <BrowserRouter>
      <ColorModeProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ColorModeProvider>
    </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
