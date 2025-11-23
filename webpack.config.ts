import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
    publicPath: "/",
  },
  mode: "development",
  devServer: {
    static: path.join(process.cwd(), "dist"),
    compress: true,
    port: 8000,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
