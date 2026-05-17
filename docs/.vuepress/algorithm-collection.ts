import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const algorithm: ThemeCollectionItem = defineCollection({
    type: 'doc',
    dir: 'algorithm',
    linkPrefix: '/algorithm/',
    title: '算法',
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
            text: '基础算法',
            collapsed: true,
            icon: 'icon-park-outline:puzzle',
            prefix: 'basic',
            items: [
                'prefix-sum',
            ]
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
                        'weight',
                    ]
                },
                {
                    text: '可持久化数据结构',
                    collapsed: true,
                    prefix: 'persistent',
                    items: [
                        'trie',
                        'seg',
                    ],
                },
                {
                    text: '二叉搜索树 & 平衡树',
                    collapsed: true,
                    prefix: 'balanced',
                    items: [
                        'bst',
                        'treap',
                        'splay',
                    ]
                }
            ],
        },
        {
            text: '图论',
            collapsed: true,
            icon: 'icon-park-outline:map-draw',
            prefix: 'graph',
            items: [
                'concept',
                {
                    text: '树上问题',
                    collapsed: true,
                    prefix: 'tree',
                    items: [
                        'lca',
                        'hld',
                    ]
                },
                'topo',
                {
                    text: '最短路问题',
                    collapsed: true,
                    prefix: 'shortest-path',
                    items: [
                        'floyd',
                        'bellman-ford',
                        'diff-constraints',
                    ]
                },
                {
                    text: '生成树问题',
                    collapsed: true,
                    prefix: 'spanning-tree',
                    items: [
                        'mst',
                    ]
                },
                {
                    text: '连通性相关',
                    collapsed: true,
                    prefix: 'connectivity',
                    items: [
                        'scc',
                        'dcc',
                    ]
                },
                'bipartite',
                'euler',
                'min-cycle',
            ]
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
        {
            text: '字符串',
            collapsed: true,
            icon: 'icon-park-outline:text',
            prefix: 'string',
            items: [
                'kmp',
                'ac-automaton',
            ]
        },
        {
            text: '数论',
            collapsed: true,
            icon: 'icon-park-outline:arithmetic-buttons',
            prefix: 'math',
            items: [
                'basic',
                {
                    text: '数论',
                    collapsed: true,
                    prefix: 'number-theory',
                    items: [
                        'prime',
                        'gcd',
                        'function',
                        'bezouts',
                    ]
                },
                {
                    text: '多项式与生成函数',
                    collapsed: true,
                    prefix: 'poly',
                    items: [
                        'ogf',
                        'egf',
                        'pgf',
                        'pentagonal-number-theorem',
                    ]
                },
                {
                    text: '组合数学',
                    collapsed: true,
                    prefix: 'combinatorics',
                    items: [
                        'combination',
                        'inclusion-exclusion-principle',
                        'derangement',
                        'catalan',
                        'vandermonde-convolution',
                        'generalized-binomial-theorem',
                    ]
                },
                {
                    text: '线性代数',
                    collapsed: true,
                    prefix: 'linear-algebra',
                    items: [
                        'matrix',
                    ]
                },
                {
                    text: '博弈论',
                    collapsed: true,
                    prefix: 'game-theory',
                    items: [
                        'icg',
                    ]
                },
                'order-theory',
                'abs-inequality',
            ],
        },
        {
            text: '计算几何',
            collapsed: true,
            icon: 'icon-park-outline:chart-line-area',
            prefix: 'geometry',
            items: [
                'scanning',
            ]
        },
        {
            text: '杂项',
            collapsed: true,
            icon: 'icon-park-outline:more-app',
            prefix: 'misc',
            items: [
                'bit',
                'recurrence',
            ]
        }
    ],
})