const path = require("path");
const webpack = require("webpack");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  entry: {
    test: "./src/client/index.tsx"
  },
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "bundle.[name].js",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".d.ts"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false
        },
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
