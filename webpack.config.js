const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // entry: path.resolve(__dirname, "index.js"), //this will also work
  entry: {
    bundle: path.resolve(__dirname, "index.tsx"),
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name][contenthash].js",
    clean: true, //will not keep duplicate files
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "webpacktest",
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], ["@babel/preset-react"]],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
