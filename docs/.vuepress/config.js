const { nav, sidebar } = require('./router')

module.exports = {
    base: '/',
    title: '前端进阶知识点',
    description: '从基础学习前端体系',
    plugins:[],
    themeConfig: {
        nav,
        sidebar,
    }
}

