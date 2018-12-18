var webpack = require('webpack');
var path = require('path');
const {
  spawn
} = require('child_process');
const {
  dependencies: externals
} = require('./app/package.json');
const fs = require('fs')
// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './app');
var outPath = path.join(__dirname, './app/dist');
const port = process.env.PORT || 3000;

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

// const theme = lessToJs(fs.readFileSync(inProjectSrc('styles/themes/csair.less'), 'utf8'))


module.exports = {
  context: sourcePath,
  entry: [
    './app.tsx'
  ],
  output: {
    path: outPath,
    filename: 'bundle.js',
    //publicPath: '/'
    publicPath: !isProduction ? `http://localhost:${port}/dist/` : './',
    libraryTarget: 'commonjs2'
  },

  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, 'app'),
      '@renderer': path.resolve(__dirname, 'app/renderer'),
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: isProduction 
          ? [{
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({ libraryName: "antd", libraryDirectory: 'es', style: 'css' })]
                })
              }
            }] 
          : ['babel-loader?plugins=react-hot-loader/babel',
            {
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({ 
                    libraryName: "antd",
                    libraryDirectory: 'es',
                    style: 'css' })]
                })
              }
            }
            ],
        
      },
      // css
      // antd不支持css module，血的教训
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                // modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                // localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({
                    addDependencyTo: webpack
                  }),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({
                    disabled: isProduction
                  })
                ]
              }
            },
            {
              loader : "less-loader",
              options: {
                  // modifyVars: theme,
                  modifyVars: { "@primary-color": "#1DA57A" },
                  javascriptEnabled: true
              }
            },
          ]
        })
      },
      // static assets
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.png$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.jpg$/,
        use: 'file-loader'
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     name: true,
  //     cacheGroups: {
  //       commons: {
  //         chunks: 'initial',
  //         minChunks: 2
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         priority: -10
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // },
  plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    // new HtmlWebpackPlugin({
    //   template: 'assets/index.html'
    // })
  ],

  externals: Object.keys(externals || {}),

  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    after: function (app) {
      spawn('npm', ['run', 'start-hot'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
  }
};