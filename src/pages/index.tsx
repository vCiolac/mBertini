import { useGSAP } from '@gsap/react'
import Head from 'next/head'
import { useRef, useState } from 'react'

import { Content } from '@/components/Content'
import { Intro } from '@/components/Intro'
import { Sticky } from '@/components/Sticky'
import { useBreakpoints } from '@/hooks'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function Home() {
  const { isExtraSmallScreen, isSmallScreen, isMediumScreen, isLargeScreen } =
    useBreakpoints()

  const [positions, setPositions] = useState<number[]>([])
  const [stickySectionTitleAnimation, setStickySectionTitleAnimation] =
    useState<gsap.core.Tween | null>(null)

  const stickyRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP()

  /* ScrollTrigger */
  const stickySectionAnimation = contextSafe(() => {
    gsap.fromTo(
      stickyRef.current,
      {
        y: 0.0,
        scale: 1,
        willChange: 'transform',
        rotation: 0,
      },
      {
        scrollTrigger: {
          trigger: stickyRef.current,
          start: 'top top',
          end: () =>
            `+=${window.innerHeight + contentRef.current!.offsetHeight * 0.1}`,
          scrub: 1,
          pin: true,
          immediateRender: false,
          invalidateOnRefresh: true,
        },

        y: '10%',
        scale: 0.8,
        rotationZ: -5,
        ease: 'power3.inOut',
        transformStyle: 'preserve-3d',
      },
    )
  })
  const contentSectionAnimation = contextSafe(() => {
    gsap.fromTo(
      contentRef.current,
      {
        scale: 0.7,
        rotation: 10,
      },
      {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
          end: () =>
            `+=${window.innerHeight + stickyRef.current!.offsetHeight * 0.07}`,
          scrub: 1,
          immediateRender: false,
          invalidateOnRefresh: true,
        },
        scale: 1,
        rotation: 0,
        ease: 'power3.inOut',
      },
    )
  })
  const contentSectionTitleAnimation = contextSafe(() => {
    gsap.set('.event-char', {
      y: '115%',
    })
    gsap.fromTo(
      '.event-char',
      {
        y: '100%',
      },
      {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 90%',
        },
        y: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        delay: 0.7,
      },
    )
  })

  /* No ScrollTrigger */
  const createStickySectionTitleAnimation = contextSafe(() => {
    const animation = gsap.fromTo(
      '.flow-char',
      { y: '115%' },
      {
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        delay: 0.7,
      },
    )

    if (!stickySectionTitleAnimation) {
      setStickySectionTitleAnimation(animation)
    }
  })

  const resetSectionsAnimations = contextSafe(() => {
    gsap.set([contentRef.current, stickyRef.current], { clearProps: true })
  })

  useGSAP(
    () => {
      const triggers = ScrollTrigger.getAll()

      if (!!stickyRef.current && !!contentRef.current && isLargeScreen) {
        contentSectionAnimation()
        stickySectionAnimation()

        for (let i = 0; i < triggers.length; i++) {
          triggers[i].scroll(positions[i])
        }
      } else {
        const newPositions = []

        for (const trigger of triggers) {
          newPositions.push(trigger.scroll())
          trigger.kill()
        }

        setPositions(newPositions)
        resetSectionsAnimations()
      }
    },
    { dependencies: [stickyRef, contentRef, isLargeScreen] },
  )
  useGSAP(
    () => {
      if (stickyRef.current) {
        if (!stickySectionTitleAnimation) {
          createStickySectionTitleAnimation()
        } else {
          stickySectionTitleAnimation.restart(true)
        }
      }
    },
    {
      dependencies: [
        stickyRef,
        contentRef,
        isExtraSmallScreen,
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
      ],
      scope: stickyRef,
    },
  )
  useGSAP(
    () => {
      if (contentRef.current) {
        contentSectionTitleAnimation()
      }
    },
    {
      dependencies: [
        stickyRef,
        contentRef,
        isExtraSmallScreen,
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
      ],
      scope: contentRef,
    },
  )

  return (
    <>
      <Head>
        <title>Maria Luiza Bertini</title>
      </Head>
      <div className="main-container">
        <Intro />
        <Sticky stickyRef={stickyRef} contentRef={contentRef} />
        <Content contentRef={contentRef} stickyRef={stickyRef} />
      </div>
    </>
  )
}

export default Home
