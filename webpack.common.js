const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  entry: "./src/index.ts",
  target: "web",
  output: {
    filename: '[name].js',
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        exclude: [path.resolve(__dirname, "node_modules/excalibur")],
        enforce: "pre",
      },
      {
        test: /\.tsx?$/,
        // use: "ts-loader",
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "Excalibur Webpack Sample",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: '/Users/ts-matthewjam.molloy/rakuten/template-ts-webpack/tsconfig.json'
      }
    }),
  ],
};
