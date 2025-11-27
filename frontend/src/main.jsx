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
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        bg: props.colorMode === 'dark' ? '#101010' : 'gray.100',
        transition: 'background-color 0.2s, color 0.2s',
      },
    }),
  },
  colors: {
    gray: { light: '#616161', dark: '#1e1e1e' },
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
