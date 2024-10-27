const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, 
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#1890ff', 
      },
    },
  }),

  addPostcssPlugins([
    require('postcss-preset-env')({
      stage: 0,
    }),
  ])
);
