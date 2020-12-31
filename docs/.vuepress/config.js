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
          '/guide/events',
          '/guide/custom-node-properties',
          '/guide/internal-node-properties',
        ]
      },
      {
        title: 'Advanced',
        collapsable: false,
        children: [
          '/advanced/node-evaluators',
          '/advanced/tree-traversal',
        ]
      },
    ]
  },
  title: 'Perfomant Vue Tree',
  base: '/Performant-Vue-Tree/'
}