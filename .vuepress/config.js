module.exports = {
  title: 'Ruanyq - Note',
  description: 'Stay Focused.',
  themeConfig: {
    logo:'/logo.jpg',
    lastUpdated: '最后更新时间', // string | boolean
    sidebarDepth: 1,
    nav: [
      {
        text: '日志',
        link: '/article/',
      },
      {
        text: '前端',
        link: '/front-end/'
      },
      {
        text: '面试',
        link: '/interview/'
      },
      {
        text: '5分钟商学院',
        link: '/business/'
      },
    ],
    sidebar: {
      '/article/': [
        '',
      ],

      '/front-end/' :[
        ''
      ],

      '/interview/' :[
        '',
      ],

      '/business/' :[
        ''
      ],

    }
  }
}
