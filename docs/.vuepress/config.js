module.exports = {
  serviceWorker: true,
  themeConfig: {
    sidebar: [
     '/introduction',
      '/installation',
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/basic-usage',
          '/guide/options',
          '/guide/slots',
          '/guide/custom-node-properties',
          '/guide/internal-node-properties',
        ]
      },
      {
        title: 'Advanced',
        collapsable: false,
        children: [
          '/advanced/node-evaluators',
        ]
      },
    ]
  },
  title: 'Perfomant Vue Tree',
  base: '/Performant-Vue-Tree/'
}