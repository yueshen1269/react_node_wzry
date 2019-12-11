
const { override, fixBabelImports, addWebpackAlias,addWebpackResolve} = require('customize-cra');
const path = require("path");

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, "./src")
  }),
  addWebpackResolve({
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  })
);
