import '../styles/globals.css'
import type { AppProps } from 'next/app'

// nextUi
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
