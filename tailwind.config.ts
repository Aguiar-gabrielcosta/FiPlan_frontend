import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        alertGreen: '#00AD30',
        alertRed: '#AD0000',
        alertYellow: '#A8A100',
        dashboardGreen: '#A7CFAB',
        dashboardRed: '#AE4A3D',
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
