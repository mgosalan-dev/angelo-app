// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retroBeige: '#fdf4e3',    // fundo geral
        retroPaper: '#fef8e6',    // fundo das seções
        retroBrown: '#5b4636',    // textos principais
        retroAccent: '#f4ce8e',   // botões e detalhes
      },
      fontFamily: {
        retro: ['"EB Garamond"', 'serif'],
      },
    },
  },
  darkMode: false, // desativa tema escuro para não brigar com nosso retrô
  plugins: [],
}

export default config
