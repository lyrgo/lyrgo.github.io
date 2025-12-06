/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
    {
        text: '算法',
        link: '/algorithm/start/intro/',
        icon: 'icon-park-outline:guide-board',
    },
    {
        text: '博客',
        icon: 'icon-park-outline:align-text-left-one',
        link: '/blog/',
    },
    {
        text: '文化课',
        icon: 'icon-park-outline:bachelor-cap-one',
        link: '/study/',
    },
    {
        text: '标签',
        icon: 'icon-park-outline:tag-one',
        link: '/blog/tags/',
    },
    {
        text: '归档',
        icon: 'icon-park-outline:book-one',
        link: '/blog/archives/',
    },
])
