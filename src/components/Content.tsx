import { RefObject, useRef, useState } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { splitToSpan } from '@/utils/gsap'

import { AdditionalContent } from './AddContent'

interface Topic {
  title: string
  content: string
}

interface ContentProps {
  contentRef: RefObject<HTMLDivElement>
  stickyRef: RefObject<HTMLDivElement>
}

const topics: Topic[] = [
  { title: 'Topic 1', content: 'Detailed information about Topic 1.' },
  { title: 'Topic 2', content: 'Detailed information about Topic 2.' },
  { title: 'Topic 3', content: 'Detailed information about Topic 3.' },
  { title: 'Topic 4', content: 'Detailed information about Topic 4.' },
]

export const Content: React.FC<ContentProps> = ({ contentRef }) => {
  const eventsRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  const handleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  useGSAP(
    () => {
      if (eventsRef.current) {
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
              onEnter: () => gsap.set('.event-box', { y: 300 }),
            },
            y: 0,
            ease: 'power3.out',
          },
        )

        gsap.fromTo(
          '.event-box',
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
    { dependencies: [eventsRef], scope: eventsRef },
  )

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
          ref={eventsRef}
          className="flex flex-wrap justify-center gap-8 p-8"
        >
          {topics.map((topic, index) => (
            <div
              key={index}
              className="event-box mb-4 w-full max-w-[600px] cursor-pointer rounded-lg bg-white text-black shadow-md"
              onClick={() => handleExpand(index)}
            >
              <div className="border-b border-gray-300 p-4 font-bold ">
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
        <section className="absolute bottom-0 flex h-[100vh] w-full items-center justify-center bg-gray-200 lg:h-[160vh]">
          <AdditionalContent />
        </section>
      </section>
    </>
  )
}
