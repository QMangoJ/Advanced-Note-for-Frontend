const path = require('path')
const fs = require('fs')

function travel(dir, callback) {
    fs.readdirSync(dir).forEach((file) => {
        callback('file---' + file)
        let pathname = path.join(dir, file)
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback)
        } else {
            callback(pathname)
        }
    })
}
let arr = []
// travel('../note/', (pathname) => {
//     console.log(pathname)
// })


let fakeSidebar = {}
let fakeNav = []
function ride(dir, oldDir = '') {
    fs.readdirSync(dir).forEach((file) => {
        let pathname = path.join(dir, file)
        let isDir = fs.statSync(pathname).isDirectory()
        if (isDir) {
            fakeNav.push({ text: file, items: [] })
            let sidebarKey = `/${pathname.replace('docs/', '')}/`
            fakeSidebar[sidebarKey] = []
            ride(pathname, path.join(dir))
        } else {
            console.log('2');
            // 获取md 文件名 
            let index = pathname.lastIndexOf("\/");
            let indexName = pathname.substring(index + 1, pathname.length);
            let mdName = indexName.slice(0, indexName.length - 3)
            // 获取文件目录名
            let substr = pathname.replace(oldDir, '')
            let first = substr.indexOf("\/");
            let keyStr = substr.substr(0, first)
            // 拼接链接地址
            let url = pathname.replace(pathname.substr(0, pathname.indexOf("\/")), '').replace('.md', '')
            fakeNav.forEach((item, id) => {
                if (item.text === keyStr) {
                    fakeNav[id].items.push({ text: mdName, link: url })
                }
            })

            // 生成sidebar路由
            let subSidebarKey = `/${pathname.replace('docs/', '').replace(indexName, '')}`
            Object.keys(fakeSidebar).forEach((item, index) => {
                if (item === subSidebarKey) {
                    fakeSidebar[subSidebarKey].push(mdName)
                }
            })
        }
    })
    return { fakeNav, fakeSidebar }
}

let aaa = {
    '/note/JS/': [
        '运行时',
        '类'
    ],
    '/note/浏览器工作原理/': [
        'HTML语法与词法'
    ]
}

let { fakeNav: navList, fakeSidebar: sideBar } = ride('./docs/note/')
console.log("sideBar", sideBar)
