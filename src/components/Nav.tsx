import Link from 'next/link'

import { gsap, useGSAP } from '@/lib/gsap'

export const Nav: React.FC = () => {
  useGSAP(() => {
    gsap.set('nav', { display: 'flex', delay: 0.2 })
  })

  return (
    <nav className="fixed top-0 z-10 hidden w-full items-center justify-between p-[3.5rem_1.5rem_2rem] mix-blend-difference md:p-[1.5rem_2rem]">
      <div className="logo flex flex-col">
        <Link
          href="https://www.joinflowparty.com/"
          rel="noopener"
          target="_blank"
          className="pt-2 font-humane text-5xl uppercase !leading-[.7] text-white mix-blend-difference [text-decoration:none] md:text-7xl"
        >
          FLOW PARTY
        </Link>
        <Link
          href="https://josee-fernandes.vercel.app"
          rel="noopener"
          target="_blank"
          className="text-center text-sm uppercase leading-none text-white [text-decoration:none] md:text-left"
        >
          BY JOSÉ
        </Link>
      </div>
      <div className="links flex items-center gap-2">
        <Link
          href="#"
          className="hidden rounded-full border-[1px] border-white p-[.7rem_1rem_.5rem] text-[.8rem] uppercase leading-none text-white transition-all [text-decoration:none] hover:bg-white hover:text-black sm:block lg:text-base"
        >
          JOIN COMMUNITY
        </Link>
        <Link
          href="#"
          className="rounded-full border-[1px] border-white p-[.7rem_1rem_.5rem] text-center text-[.8rem] uppercase leading-none text-white transition-all [text-decoration:none] hover:bg-white hover:text-black lg:text-base"
        >
          ENROLL NOW
        </Link>
      </div>
    </nav>
  )
}
