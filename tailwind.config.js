module.exports = {
  content: [
    "./apps/**/*.{html,ts,scss}",
    "./libs/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Calibri", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b9d7ff",
          300: "#87bcff",
          400: "#5199ff",
          500: "#2a78f6",
          600: "#135ddd",
          700: "#104cb9",
          800: "#124295",
          900: "#153a77",
        },
      },
      boxShadow: {
        "agentj-sm": "0 1px 2px rgba(16, 24, 40, 0.08), 0 1px 1px rgba(16, 24, 40, 0.04)",
        "agentj-md": "0 6px 18px rgba(16, 24, 40, 0.08), 0 2px 6px rgba(16, 24, 40, 0.06)",
      },
      borderRadius: {
        agentj: "10px",
      },
    },
  },
  plugins: [],
};
