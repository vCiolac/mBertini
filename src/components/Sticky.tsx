import { RefObject, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { splitToSpan } from '@/utils/gsap'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface StickyProps {
  stickyRef: RefObject<HTMLDivElement>
  contentRef: RefObject<HTMLDivElement>
}

export const Sticky: React.FC<StickyProps> = ({ stickyRef }) => {
  useGSAP(() => {
    gsap.set(stickyRef.current, { display: 'block' })
  })

  useEffect(() => {
    const elements = document.querySelectorAll('.flow-char')

    gsap.fromTo(
      elements,
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
  }, [])

  return (
    <section
      ref={stickyRef}
      className="fixed left-0 top-0 h-screen w-screen bg-primary"
    >
      <div className="container w-full h-full flex flex-col md:flex-row items-center justify-center mx-auto">
        {/* Texto no canto esquerdo */}
        <div className="flex-1 text-white ">
          {splitToSpan(
            <h2 className="pointer-events-none overflow-hidden whitespace-nowrap pt-16 font-humane text-[4rem] font-bold uppercase leading-[.7] text-white xs:block md:text-[34vw] lg:text-[5rem] 2xl:text-[6rem]">
              Texto
            </h2>,
            'flow-char translate-y-[115%]',
          )}
          {splitToSpan(
            <span className="pointer-events-none overflow-hidden whitespace-nowrap pt-16 font-humane text-[4rem] font-bold uppercase leading-[.7] text-white xs:block md:text-[34vw] lg:text-[5rem] 2xl:text-[6rem]">
              Outro texto na esquerda
            </span>,
            'flow-char translate-y-[115%]',
          )}
        </div>

        {/* Imagem no centro */}
        <div className="flex-1 flex items-center justify-center m-10">
          <div className="relative w-full max-w-[800px] h-[auto]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="relative w-full h-full"
            >
              <Image
                src="/malu.jpg"
                alt="Psicóloga"
                width={800}
                height={800}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Texto no canto direito */}
        <div className="flex-1 text-white text-right">
          {splitToSpan(
            <h2 className="pointer-events-none overflow-hidden whitespace-nowrap pt-16 font-humane text-[4rem] font-bold uppercase leading-[.7] text-white xs:block md:text-[34vw] lg:text-[5rem] 2xl:text-[6rem]">
              Texto Direito
            </h2>,
            'flow-char translate-y-[115%]',
          )}
        </div>
      </div>
    </section>
  )
}
