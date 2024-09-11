import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'

export const Nav: React.FC = () => {
  useGSAP(() => {
    gsap.set('nav', { display: 'flex', delay: 0.2 })
  })

  return (
    <nav className="fixed top-0 left-0 z-10 h-screen w-64 p-4 flex flex-col bg-white shadow-lg">
      <div className="logo flex flex-col mb-8">
        <Link
          href="https://www.joinflowparty.com/"
          rel="noopener"
          target="_blank"
          className="pt-2 font-humane text-2xl uppercase !leading-[.7] text-black [text-decoration:none] md:text-3xl"
        >
          FLOW PARTY
        </Link>
        <Link
          href="https://josee-fernandes.vercel.app"
          rel="noopener"
          target="_blank"
          className="text-center text-sm uppercase leading-none text-gray-600 [text-decoration:none] md:text-left"
        >
          BY JOSÉ
        </Link>
      </div>
      <div className="links flex flex-col gap-4">
        <Link
          href="#"
          className="rounded-full border-[1px] border-black p-2 text-sm uppercase leading-none text-black transition-all [text-decoration:none] hover:bg-black hover:text-white"
        >
          JOIN COMMUNITY
        </Link>
        <Link
          href="#"
          className="rounded-full border-[1px] border-black p-2 text-sm uppercase leading-none text-black transition-all [text-decoration:none] hover:bg-black hover:text-white"
        >
          ENROLL NOW
        </Link>
      </div>
    </nav>
  )
}
