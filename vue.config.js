const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const webpack = require('webpack')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    performance: {
      maxAssetSize: 1000000
    },
    module: {
      // loaders: [
      //   { test: /\.js$/, loader: 'babel', query: { compact: false } }
      // ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ]
  }
}
