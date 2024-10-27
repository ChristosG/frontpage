const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#004E89',
              '@font-family': 'Segoe UI, Arial, sans-serif',
              '@layout-header-background': '#001529',
              '@layout-body-background': '#f0f2f5',
              '@layout-footer-background': '#001529',
              '@menu-dark-bg': '#001529',
              '@menu-dark-item-active-bg': '#1890ff',
              '@border-radius-base': '4px',
              // '@white' :'#fff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, 
        },
      ],
    ],
  },
};
