import { defineCollection, defineCollections } from 'vuepress-theme-plume'

export const blog = defineCollection({
    type: 'post',
    dir: 'blog',
    title: '博客',
    link: '/blog/',
    postList: true,
})

export const study = defineCollection({
    type: 'post',
    dir: 'study',
    title: '学习',
    link: '/study/'
})