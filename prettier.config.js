/** @type {import('prettier').Options} */
const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  singleQuote: true,
  semi: false,
  ...styleguide,
  plugins: ['prettier-plugin-tailwindcss'],
}
