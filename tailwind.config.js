module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [],
    },
    theme: {
      colors: {
        'primary-background-color': '#064055',
        'primary-color': '#ffb451',
      },
    },
  },

  darkMode: `class`,
};
