import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryLR: '#BBD1E2',
        primaryL: '#70B0E0',
        primary: '#0085EA',
        primaryD: '#36546B',
        primaryDR: '#2B2F33',
        neutralWhite: '#ffffff',
        neutralBlack: '#000000',
        bgL: '#E6F4FF',
        alertGreen: '#128000',
        alertRed: '#A00000',
        alertYellow: '#858000',
        dashboardGreen: '#A7CFAB',
        dashboardRed: '#EA8C7F',
        dashboardYellow: '#C2BF7B',
      },
      fontFamily: {
        displayFont: ['Italian', 'serif'],
        textFont: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
