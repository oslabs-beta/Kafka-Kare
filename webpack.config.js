const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV,
  entry: "./client/src/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client", "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/public/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.join(__dirname, 'client'),
      publicPath: '/',
    },
    hot: true, // reload without a refresh
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
};

module.exports = config;