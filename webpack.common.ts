import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    psyche: path.resolve(__dirname, "src/Main.tsx")
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: "hashed",
    splitChunks: {
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      cacheGroups: {
        vendors: {
          chunks: "initial",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    },
    occurrenceOrder: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: [path.resolve(__dirname, "static/images")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "../fonts/",
              publicPath: "../fonts/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist/"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
      minify: true
    }),
    new webpack.BannerPlugin("Open Sesame")
  ]
};

export default config;
