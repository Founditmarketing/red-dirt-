/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand': {
                    red: '#E31837', // Red Dirt / Mahindra Red
                    dark: '#B00E26',
                },
                'charcoal': {
                    DEFAULT: '#1A1A1A',
                    light: '#2A2A2A',
                },
                'accent': {
                    blue: '#004B8D', // Yanmar
                    yellow: '#FFCD00', // Wacker Neuson
                },
                'off-white': '#F5F5F7',
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
