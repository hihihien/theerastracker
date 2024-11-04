import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography'),], 
  daisyui: {
    themes: [
      {
        red: {
                    
          "primary": "#881337",
                    
          "primary-content": "#ebd1d3",
                    
          "secondary": "#881337",
                    
          "secondary-content": "#fecdd3",
                    
          "accent": "#be123c",
                    
          "accent-content": "#f8d5d6",
                    
          "neutral": "#be123c",
                    
          "neutral-content": "#f8d5d6",
                    
          "base-100": "#be123c",
                    
          "base-200": "#a50e33",
                    
          "base-300": "#8c0a2a",
                    
          "base-content": "#f8d5d6",
                    
          "info": "#be123c",
                    
          "info-content": "#f8d5d6",
                    
          "success": "#be123c",
                    
          "success-content": "#f8d5d6",
                    
          "warning": "#be123c",
                    
          "warning-content": "#f8d5d6",
                    
          "error": "#9f1239",
                    
          "error-content": "#f1d2d4",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
}
export default config
