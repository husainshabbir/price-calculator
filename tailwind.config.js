/* eslint-disable global-require */

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
