// babel.config.js
export default function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        modules: false // ES 모듈 구문 유지
      }
    ]
  ];
  const plugins = [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '@/',
        rootPathSuffix: './src'
      }
    ],
    '@babel/plugin-transform-async-to-generator',
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    presets,
    plugins,
    comments: process.env.NODE_ENV === 'production' ? false : true
  };
}
