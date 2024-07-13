module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'body-bg': '#5A6AA5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #6F5AA5, #955AA5, #5A6AA5)', // custom radial gradient
        'gradient-to-r-from-purple-400-to-blue-500': 'linear-gradient(to right, #9d4edd, #4d5bf9)', // existing linear gradient
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'satisfy': ['Satisfy', 'cursive'],
        'sacramento': ['Sacramento', 'cursive'],
        'allura': ['Allura', 'cursive'],
        'yellowtail': ['Yellowtail', 'cursive'],
        'tangerine': ['Tangerine', 'cursive'],
        'cookie': ['Cookie', 'cursive'],
        'parisienne': ['Parisienne', 'cursive'],
        'monoton': ['Monoton', 'cursive'],
        'righteous': ['Righteous', 'sans-serif'],
        'lobster': ['Lobster', 'cursive'],
        'playball': ['Playball', 'cursive'],
        'ranchers': ['Ranchers', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};