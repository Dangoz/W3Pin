import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/common/wagmi'
import NavBar from '@/components/layout/NavBar'
import { CardContextProvider } from '@/store/cardContext'
import { UserContextProvider } from '@/store/userContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <CardContextProvider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <NavBar />
              <Component {...pageProps} />
              <ToastContainer />
            </RainbowKitProvider>
          </WagmiConfig>
        </CardContextProvider>
      </UserContextProvider>
    </>
  )
}
