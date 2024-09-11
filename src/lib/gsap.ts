import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase)

gsap.defaults({})

export * from 'gsap'
export { CustomEase, ScrollTrigger, useGSAP }
