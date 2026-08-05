/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 */

import { defineThemeConfig, ThemeCollectionItem, ThemeCollections } from 'vuepress-theme-plume'
import navbar from './navbar'
import { blog, study } from './collections'
import { algorithm } from './algorithm-collection'


/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
    logo: 'https://theme-plume.vuejs.press/plume.png',

    social: [
        { icon: 'github', link: 'https://github.com/lyrgo' },
    ],
    navbarSocialInclude: ['github'],
    aside: true,
    outline: [2, 3],
    copyright: true,
    createTime: true,

    profile: {
        avatar: 'https://cdn.luogu.com.cn/upload/usericon/1085280.png',
        name: 'lyrgo',
        description: 'Never think of yourself as a failure',
        circle: true,
    },

    navbar,
    collections: [
        blog,
        study,
        algorithm,
    ],

    transition: {
        page: true,
        postList: true,
        appearance: 'circle-clip',
    },
})
