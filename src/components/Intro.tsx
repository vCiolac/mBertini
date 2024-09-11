import { useEffect, useRef, useState } from 'react'

import { useBreakpoints } from '@/hooks'
import { gsap, useGSAP } from '@/lib/gsap'

import { Portal } from './Portal'

export const Intro: React.FC = () => {
  const { isExtraSmallScreen, isSmallScreen, isMediumScreen, isLargeScreen } =
    useBreakpoints()

  const [isClient, setIsClient] = useState(false)

  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(
    () => {
      if (isClient && introRef?.current) {
        gsap.fromTo(
          '.intro-item',
          { y: 0 },
          {
            y: '-100%',
            duration: 1,
            stagger: 0.1,
            ease: 'power3.inOut',
          },
        )
      }
    },
    {
      dependencies: [
        isClient,
        introRef,
        isExtraSmallScreen,
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
      ],
      scope: introRef,
    },
  )

  return (
    <>
      {isClient && (
        <Portal>
          <div
            ref={introRef}
            className="pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen"
          >
            <div className="intro-item fixed left-0 top-0 z-30 h-full w-full bg-primary" />
            <div className="intro-item fixed left-0 top-0 z-20 h-full w-full bg-secondary" />
            <div className="intro-item fixed left-0 top-0 z-10 h-full w-full bg-tertiary" />
          </div>
        </Portal>
      )}
    </>
  )
}
