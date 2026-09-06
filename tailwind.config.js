module.exports = {
  presets: [require('./libs/agent-j-style/tailwind-preset.cjs')],
  content: ['./apps/**/*.{html,ts,scss}', './libs/**/*.{html,ts,scss}'],
  plugins: [],
};
