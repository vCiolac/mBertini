import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        humane: ['var(--font-humane)'],
        swansea: ['var(--font-swansea)', 'sans-serf'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#5546ff',
        secondary: '#bfff00',
        tertiary: '#ff7bca',
      },
      animation: {
        'rotate-eyes': 'rotateEyes 10s infinite linear',
        'wonder-face':
          'wonderFace 3s infinite cubic-bezier(0.075, 0.82, 0.165, 1)',
        'wonder-face-sm':
          'wonderFaceSm 3s infinite cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
      keyframes: {
        rotateEyes: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        wonderFace: {
          '0%': {
            height: '40px',
            width: '40px',
          },
          '50%': {
            height: '80px',
            width: '50px',
          },
          '100%': {
            height: '40px',
            width: '40px',
          },
        },
        wonderFaceSm: {
          '0%': {
            height: '25px',
            width: '25px',
          },
          '50%': {
            height: '50px',
            width: '35px',
          },
          '100%': {
            height: '25px',
            width: '25px',
          },
        },
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '990px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
export default config
