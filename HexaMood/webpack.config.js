const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const isDev = env === "development";

  return {
    mode: isDev ? "development" : "production",
    entry: {
      main: "./src/js/main.js",
      login: "./src/js/login.js",
      register: "./src/js/register.js",
      checkin: "./src/js/checkin.js",
      journaling: "./src/js/journaling.js",
      results: "./src/js/results.js",
      recommendations: "./src/js/recommendations.js",
      navbar: "./src/js/navbar.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: true,
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext][query]",
          },
        },
      ],
    },
    plugins: [
      ...[
        "index",
        "login",
        "register",
        "checkin",
        "journaling",
        "results",
        "recommendations",
      ].map(
        (name) =>
          new HtmlWebpackPlugin({
            template: `./src/${name}.html`,
            filename: `${name}.html`,
            chunks: [name === "index" ? "main" : name, "navbar"],
          })
      ),
      ...(isDev
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: "styles/[name].css",
            }),
          ]),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/images",
            to: "images",
            globOptions: {
              ignore: ["**/.*"],
            },
          },
          {
            from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
            to: "js/lib/",
          },
        ],
      }),
    ],
    devServer: {
      static: path.join(__dirname, "dist"),
      compress: true,
      port: 8080,
      historyApiFallback: true,
      hot: true,
    },
  };
};
