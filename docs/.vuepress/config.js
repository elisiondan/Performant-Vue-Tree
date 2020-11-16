module.exports = {
  dest: 'vuepress',
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
        ]
      },
    ]
  },
  title: 'performant-vue-tree',
  base: '/Performant-Vue-Tree/'
}