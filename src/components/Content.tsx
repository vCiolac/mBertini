import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { RefObject, useEffect, useRef, useState } from 'react'

import { useBreakpoints } from '@/hooks'
import { CustomEase, gsap, useGSAP } from '@/lib/gsap'
import { splitToSpan } from '@/utils/gsap'

import { AdditionalContent } from './AddContent'

interface ContentProps {
  contentRef: RefObject<HTMLDivElement>
  stickyRef: RefObject<HTMLDivElement>
}

interface Topic {
  title: string
  content: string
}

const topics: Topic[] = [
  { title: 'Topic 1', content: 'Detailed information about Topic 1.' },
  { title: 'Topic 2', content: 'Detailed information about Topic 2.' },
  { title: 'Topic 3', content: 'Detailed information about Topic 3.' },
  { title: 'Topic 4', content: 'Detailed information about Topic 4.' },
  { title: 'Topic 5', content: 'Detailed information about Topic 5.' },
  { title: 'Topic 6', content: 'Detailed information about Topic 6.' },
]

const OPTIONS: EmblaOptionsType = { dragFree: true, duration: 30 }

export const Content: React.FC<ContentProps> = ({ contentRef }) => {
  const { isLargeScreen } = useBreakpoints()
  const [emblaRef] = useEmblaCarousel(OPTIONS)
  const [expanded, setExpanded] = useState<number | null>(null)

  const eventsRef = useRef<HTMLDivElement>(null)
  const dragCursorRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP()

  const handleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

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
            <div
              className="event-box mb-4 w-full max-w-[600px] cursor-pointer rounded-lg bg-white text-black shadow-md"
            >
              <div className="flex justify-center items-center space-x-4">
                {topics.map((topic, index) => (
                  <div key={index} onClick={() => handleExpand(index)}>
                    <div className="border-b border-gray-300 p-4 font-bold text-center">
                      {topic.title}
                    </div>
                    {expanded === index && (
                      <div className="p-4">
                        <p>{topic.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AdditionalContent />
      </section>
    </>
  )
}
