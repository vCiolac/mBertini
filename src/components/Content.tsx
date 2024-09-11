import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { RefObject, Suspense, useEffect, useRef, useState } from 'react'

import dummy1 from '/public/1.jpg'
import dummy2 from '/public/2.png'
import dummy3 from '/public/3.jpg'
import dummy4 from '/public/4.jpg'
import { useBreakpoints } from '@/hooks'
import { CustomEase, gsap, useGSAP } from '@/lib/gsap'
import { splitToSpan } from '@/utils/gsap'

import { Portal } from './Portal'

interface ContentProps {
  contentRef: RefObject<HTMLDivElement>
  stickyRef: RefObject<HTMLDivElement>
}

const OPTIONS: EmblaOptionsType = { dragFree: true, duration: 30 }

export const Content: React.FC<ContentProps> = ({ contentRef }) => {
  const { isLargeScreen } = useBreakpoints()
  const [emblaRef] = useEmblaCarousel(OPTIONS)
  const [isClient, setIsClient] = useState(false)

  const eventsRef = useRef<HTMLDivElement>(null)
  const dragCursorRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP()

  const handleDragMouseCursor = (event: MouseEvent) => {
    const posX = event.pageX
    const posY = event.pageY

    if (dragCursorRef.current) {
      const width = dragCursorRef.current.clientWidth
      const height = dragCursorRef.current.clientHeight

      dragCursorRef.current.animate(
        {
          left: `${posX - width / 2}px`,
          top: `${posY - height / 2}px`,
        },
        { duration: 500, fill: 'forwards' },
      )
    }
  }

  const handleSliderEnter = contextSafe(() => {
    if (dragCursorRef.current) {
      dragCursorRef.current.style.opacity = '1'
      gsap.fromTo(
        dragCursorRef.current,
        {
          scale: 0,
        },
        {
          duration: 1.5,
          scale: 1,
          ease: CustomEase.create(
            'custom',
            'M0,0 C0,0 0.049,0.156 0.055,0.226 0.067,0.373 0.088,0.719 0.099,0.867 0.104,0.941 0.101,0.953 0.107,1.013 0.111,1.06 0.122,1.115 0.162,1.134 0.205,1.154 0.238,1.119 0.252,1.095 0.299,1.013 0.356,0.991 0.404,0.991 0.457,0.991 0.683,1.003 0.72,1.005 0.757,1.007 0.831,0.998 0.868,0.998 0.901,0.997 1,1 1,1 ',
          ),
        },
      )
    }
  })

  const handleSliderLeave = () => {
    if (dragCursorRef.current) dragCursorRef.current.style.opacity = '0'
  }

  useGSAP(
    () => {
      if (eventsRef.current && isLargeScreen) {
        gsap.fromTo(
          eventsRef.current,
          { y: 1000 },
          {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top bottom',
              end: () =>
                `+=${window.innerHeight + contentRef.current!.offsetHeight * 0.01}`,
              scrub: 2,
              onEnter: () => gsap.set('.event-image', { y: 300 }),
            },
            y: 0,
            ease: 'power3.out',
          },
        )

        gsap.fromTo(
          '.event-image',
          { y: 300 },
          {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top bottom',
              end: () =>
                `+=${window.innerHeight + contentRef.current!.offsetHeight * 0.01}`,
              scrub: 1,
            },
            invalidateOnRefresh: false,
            y: 0,
            ease: 'power3.out',
            stagger: 0.1,
          },
        )
      }
    },
    { dependencies: [eventsRef, isLargeScreen], scope: eventsRef },
  )
  useEffect(() => {
    setIsClient(true)
    window.addEventListener('mousemove', handleDragMouseCursor)

    return () => window.removeEventListener('mousemove', handleDragMouseCursor)
  }, [dragCursorRef])

  return (
    <>
      <section
        ref={contentRef}
        className="absolute top-[100vh] h-[300vh] w-full bg-neutral-900"
      >
        <header className="section-header flex w-full flex-col items-center gap-8 px-8 py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:py-8 lg:pt-40">
          {splitToSpan(
            <h2 className="text-normal overflow-hidden pt-4 text-center font-humane text-8xl font-bold uppercase leading-[0.8] text-white lg:text-left lg:text-[10vw] lg:leading-[1]">
              Mais sobre mim
            </h2>,
            'event-char translate-y-[115%]',
          )}
          <p className="w-[28ch] text-center text-base uppercase leading-[1.1] text-white lg:text-right">
            Clique nas caixinhas abaixo para ver mais informações.
          </p>
        </header>
        {isClient && (
          <Portal>
            <div
              ref={dragCursorRef}
              className="pointer-events-none absolute left-0 top-0 z-50 flex w-max scale-0 items-center gap-1 rounded-full bg-white px-8 py-6 text-black opacity-0 transition-[opacity]"
            >
              <Suspense>
                <CaretLeft weight="fill" size={16} />
              </Suspense>
              <div className="text-sm uppercase">DRAG</div>
              <CaretRight weight="fill" size={16} />
            </div>
          </Portal>
        )}

        <div
          ref={emblaRef}
          className="relative h-[48rem] w-full cursor-grab overflow-x-hidden"
          onMouseEnter={handleSliderEnter}
          onMouseLeave={handleSliderLeave}
        >
          <div
            ref={eventsRef}
            className="events my-0 inline-block h-full whitespace-nowrap"
          >
            <div className="event-image inline-block h-full w-[90%] overflow-hidden  lg:w-[30%]">
              <Image
                src={dummy1}
                alt=""
                className="h-full scale-125 object-cover transition-all duration-700 hover:scale-100"
              />
            </div>
            <div className="event-image inline-block h-full w-[90%] overflow-hidden lg:w-[30%]">
              <Image
                src={dummy2}
                alt=""
                className="h-full scale-125 object-cover transition-all duration-700 hover:scale-100"
              />
            </div>
            <div className="event-image inline-block h-full w-[90%] overflow-hidden lg:w-[30%]">
              <Image
                src={dummy3}
                alt=""
                className="h-full scale-125 object-cover transition-all duration-700 hover:scale-100"
              />
            </div>
            <div className="event-image inline-block h-full w-[90%] overflow-hidden lg:w-[30%]">
              <Image
                src={dummy4}
                alt=""
                className="h-full scale-125 object-cover transition-all duration-700 hover:scale-100"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
