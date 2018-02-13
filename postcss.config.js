const AutoPrefixer = require("autoprefixer");
const Nested = require("postcss-nested");

module.exports = {
  plugins: [AutoPrefixer, Nested]
};
