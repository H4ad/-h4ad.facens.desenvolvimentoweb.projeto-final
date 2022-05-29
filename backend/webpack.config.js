const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const path = require('path');
const { IgnorePlugin } = require('webpack');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015',
          tsconfigRaw: require('./tsconfig.json'),
        },
      },
      {
        test: /\.(db)$/i,
        type: 'asset/resource',
      },
    ],
  },
  externals: {
    sqlite3: 'sqlite3',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
      }),
    ],
  },
  plugins: [
    new ESBuildPlugin(),
    new IgnorePlugin({
      resourceRegExp: /^pg-native|node-pre-gyp$/,
    }),
  ],
};
