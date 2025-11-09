/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
    {
        text: '算法',
        link: '/algorithm/start/intro.md',
        icon: 'icon-park-outline:guide-board',
        activeMatch: '^/guide/',
    },
    {
        text: '博客',
        link: '/blog/'
    },
    {
        text: '文化课',
        link: '/study/'
    },
    {
        text: '标签',
        link: '/blog/tags/'
    },
    {
        text: '归档',
        link: '/blog/archives/'
    },
])
