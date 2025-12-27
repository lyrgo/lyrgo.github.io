import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const algorithm: ThemeCollectionItem = defineCollection({
    // doc 类型，该类型带有侧边栏
    type: 'doc',
    // 文档集合所在目录，相对于 `docs`
    dir: 'algorithm',
    // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `linkPrefix` 配置作为前缀
    // 如果 前缀不一致，则无法生成侧边栏。
    // 所以请确保  markdown 文件的 permalink 都以 `linkPrefix` 开头
    linkPrefix: '/algorithm/',
    // 文档标题，它将用于在页面的面包屑导航中显示
    title: '算法',
    // 根据文件结构自动生成侧边栏
    // sidebar: 'auto',
    // 手动配置侧边栏结构
    sidebar: [
        {
            text: '从这里开始',
            collapsed: false,
            icon: 'carbon:idea',
            prefix: 'start',
            items: [
                'intro',
            ],
        },
        {
            text: '数据结构',
            collapsed: true,
            icon: 'carbon:db2-database',
            prefix: 'ds',
            items: [
                'fenwick',
                {
                    text: '线段树',
                    collapsed: true,
                    prefix: 'seg',
                    items: [
                        'basic',
                    ]
                }
            ],
        },
        {
            text: '动态规划',
            collapsed: true,
            icon: 'icon-park-outline:bitcoin',
            prefix: 'dp',
            items: [
                'tree',
                'number',
                {
                    text: 'DP 优化',
                    collapsed: true,
                    prefix: 'opt',
                    items: [
                        'monotonous-queue',
                        'slope',
                    ],
                },
            ]
        },
        // {
        //     text: '贪心',
        //     collapsed: true,
        //     icon: 'icon-park-outline:balance-two',
        //     prefix: 'greedy',
        //     items: [
        //         'greedy-proof',
        //     ],
        // },
        {
            text: '数论',
            collapsed: true,
            icon: 'icon-park-outline:arithmetic-buttons',
            prefix: 'math',
            items: [
                'abs-inequality',
            ],
        },
    ],
})