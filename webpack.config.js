// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

// module.exports = {
//     context: __dirname + "/app",

//     // Where the app starts - all other dependencies are bundled from this point.
//     entry: [
//       './components/main.js'
//     ],

//     output: {
//         filename: 'js/app.js',
//         path: __dirname + "/app"
//     },
      
//     plugins: [
//       new ExtractTextPlugin("./css/styles.css"),
//       new CommonsChunkPlugin("vendor", ".app/js/vendor.js", Infinity),
//     ],

//     module: {
//         loaders: [
//             // {
//             //     test:/\.js.?/,
//             //     loaders: [
//             //     // Converts jsx, and handles ES6 features
//             //         'jsx-loader?insertPragma=React.DOM&harmony'
//             //     ]
//             // },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel",
//                 query: {
//                     presets: ['react']
//                 }
//             },
//             // { test: /\.css$/, loader: "style-loader!css-loader" },
//             // { test: /\.png$/, loader: "url-loader?limit=100000"},
//             // { test: /\.jpg$/, loader: "file-loader" }
//             { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap") },
//             { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=assets/[name].[ext]" },
//             { test: /\.(woff|woff2)$/, loader:"url?name=assets/[name].[ext]&prefix=font/&limit=5000" },
//             { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
//             { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000&mimetype=image/svg+xml" }
//         ]
//     },

//     resolve: {
//         // so you don't have to put "require('../../../../utility/Component')"
//         modulesDirectories: ['app/components','utility','./node_modules']
//     },

//     // Use this if you're tired of slow compile times from webpack.
//     // devtool: 'cheap-source-map'

//     // Allows you to debug your original files rather than bundle.js
//     devtool: 'source-map'
// }

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: {
    javascript: "./components/main.js",
    html: "./index.html",
    vendor: ["jquery","react","react-router"],
  },
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new ExtractTextPlugin("./css/styles.css"),
    new CommonsChunkPlugin("vendor", "./js/vendor.js"),
  ],
  module: {
    loaders: [
      // loader for React JSX
      {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel",
    query: {
      presets: ['react']
    }
      },
      // loader for HTML
      {
    test: /\.html$/,
    loader: "file?name=[name].[ext]",
      },
      // loaders for Bootstrap CSS
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap") },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=assets/[name].[ext]" },
      { test: /\.(woff|woff2)$/, loader:"url?name=assets/[name].[ext]&prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000&mimetype=image/svg+xml" }
    ],
  },
}