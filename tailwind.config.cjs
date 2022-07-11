/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        code: '"Cascadia Code", Menlo, "Roboto Mono", "Consolas", monospace',
        display: 'Inter'
      }
    }
  },
  plugins: []
};
