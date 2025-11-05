import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['-apple-system', 'BlinkMacSystemFont', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'sans-serif'],
  			serif: ['Georgia', '"Yu Mincho"', 'YuMincho', '"Hiragino Mincho ProN"', 'serif'],
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			'pg-blue': '#0693e3',
  			'pg-gray': '#32373c',
  			'success-green': '#10b981',
  			'revenue-orange': '#f97316',
  			'trust-navy': '#1e3a8a'
  		},
  		fontSize: {
  			'pg-sm': '13px',
  			'pg-base': '20px',
  			'pg-lg': '36px',
  			'pg-xl': '42px'
  		},
  		spacing: {
  			'pg-1': '0.44rem',
  			'pg-2': '0.67rem',
  			'pg-3': '1rem',
  			'pg-4': '1.5rem',
  			'pg-5': '2.25rem',
  			'pg-6': '3.38rem',
  			'pg-7': '5.06rem'
  		},
  		gap: {
  			pg: '0.5em'
  		},
  		borderRadius: {
  			'pg-pill': '9999px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
} satisfies Config;
