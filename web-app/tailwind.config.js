export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      pc: '769px', // => @media (min-width: 769px) { ... }
    },
    extend: {
      colors: {
        'dark-side-bar': '#0f0529',
        'light-header': '#9e72c3',
        'dark-moderate-blue': '#4653a2',
        'moderate-blue': '#4653a2',
        'dark-gray': '#a3a3a3',
        'bright-blue': '#307be7',
        'strong-gray': '#949292',
        'light-grayish-blue': '#e7e7ed',
      },
    },
  },
};
