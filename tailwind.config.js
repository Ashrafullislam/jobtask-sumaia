/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
             "primary": "#24001e",
                     
             "secondary": "#540417",
                     
             "accent": "#330110",
                     
             "neutral": "#7d0623",

             "error": "#b90404",

             "warning": "#d6169b",
                     
            
              },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
