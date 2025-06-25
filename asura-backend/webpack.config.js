const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next"); // Đổi sang package mới hơn
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/server.ts",
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js", // Đổi từ .ts sang .js
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      // Sửa từ 'plugin' (sai) thành 'plugins' (đúng)
      new TsconfigPathsPlugin({
        /* options */
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: process.env.NODE_ENV === "development" ? ["yarn runn"] : [],
        blocking: false,
        parallel: true,
      },
    }),
  ],
  node: {
    __dirname: false, // Tắt polyfill __dirname
    __filename: false, // Tắt polyfill __filename
  },
};
