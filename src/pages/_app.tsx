import '@/styles/globals.css'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

import { useIsomorphicLayoutEffect } from '@/hooks'

const humane = localFont({
  src: [
    {
      path: '../assets/fonts/humane.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/humane_bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-humane',
})
const swansea = localFont({
  src: '../assets/fonts/swansea.ttf',
  variable: '--font-swansea',
})

function App({ Component, pageProps }: AppProps) {
  useIsomorphicLayoutEffect(() => {
    document.body.className = `h-full w-full overflow-x-hidden bg-black font-swansea ${humane.variable} ${swansea.variable}`
  }, [])

  return (
    <ReactLenis root>
      <Component {...pageProps} />
    </ReactLenis>
  )
}

export default App
