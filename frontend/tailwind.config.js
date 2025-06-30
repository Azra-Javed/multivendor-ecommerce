// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    
      fontFamily: {
        Roboto:["Roboto","sans-serif"],
        poppins: ['Poppins', 'sans-serif'],

      },
      extend: {
        screens:{
            "1000px":"1050px",
            "1100px":"1110px",
            "800px":"800px",
            "1300px":"1300px",
            "400px":"400px",
        }
    },

  },
  plugins: [],
}
