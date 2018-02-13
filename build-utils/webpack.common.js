const commonPaths = require("./common-paths");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    vendor: [
      "apollo-cache-inmemory",
      "apollo-client",
      "apollo-link-http",
      "babel-plugin-syntax-dynamic-import",
      "graphql",
      "graphql-tag",
      "react",
      "react-apollo",
      "react-dom",
      "react-loadable",
      "react-prop-types",
      "react-redux",
      "react-router-dom",
      "recompose",
      "redux",
      "redux-define",
      "redux-logger"
    ]
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor"],
      minChunks: Infinity
    })
  ]
};

module.exports = config;
