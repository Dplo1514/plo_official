import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    documentSidebar: [
        {
            type: 'category',
            label: 'Intro',
            link: {
                type: 'doc',
                id: 'intro',
            },
            items: []
        },
        {
            type: 'category',
            label: '1. Study',
            items: [
                {
                    type: 'category',
                    label: '1-1. Tech',
                    items: [
                        {
                            type: 'doc',
                            label: '1. Test Container',
                            id: 'study/tech/test-container'
                        },
                        {
                            type: 'doc',
                            label: '2. Fast Api',
                            id: 'study/tech/fast-api'
                        }
                    ],
                },
                {
                    type: 'category',
                    label: '1-2. AI',
                    items: [
                        {
                            type: 'doc',
                            label: '1. Knowledge Base System',
                            id: 'study/ai/knowledge-base-system'
                        },
                        {
                            type: 'doc',
                            label: '2. Multi Agent',
                            id: 'study/ai/multi-agent-system'
                        }
                    ],
                },
                {
                    type: 'category',
                    label: '1-3. DATA',
                    items: [
                        {
                            type: 'doc',
                            label: '1. ETL Pipeline',
                            id: 'study/data/etl-pipeline',
                        },
                        {
                            type: 'doc',
                            label: '2. Air Flow',
                            id: 'study/data/air-flow',
                        }
                    ],
                },
                {
                    type: 'category',
                    label: '1-4. CS',
                    items: [
                        {
                            type: 'category',
                            label: '1-4-1. Language',
                            items: [
                                {
                                    type: 'doc',
                                    label: '1. Compiler / Interpreter / JIT',
                                    id: 'study/cs/programming_language/compiler_interpreter_jit',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: '1-4-2. OS',
                            items: [
                                {
                                    type: 'doc',
                                    label: '1. Socket',
                                    id: 'study/cs/os/socket',
                                },
                                {
                                    type: 'doc',
                                    label: '2. DeadLock & Concurrency Issue',
                                    id: 'study/cs/os/deadLock&concurrencyIssue',
                                },
                                {
                                    type: 'doc',
                                    label: '3. Virtualization',
                                    id: 'study/cs/os/virtualization',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: '1-4-3. Algorithm',
                            items: [
                                {
                                    type: 'doc',
                                    label: '1. Dynamic Programming',
                                    id: 'study/cs/algorithm/dynamic_programming',
                                }
                            ],
                        },
                        {
                            type: 'category',
                            label: '1-4-4. DB',
                            items: [
                                {
                                    type: 'doc',
                                    label: '1. Index',
                                    id: 'study/cs/db/index',
                                }
                            ],
                        }
                    ],
                },
                {
                    type: 'category',
                    label: '1-5. Design Pattern',
                    items: [
                        {
                            type: 'doc',
                            label: '1. OOP SOLID',
                            id: 'study/design_pattern/solid',
                        }
                    ],
                },
            ]
        },
        {
            type: 'category',
            label: '2. Fast Api',
            items: [
                {
                    type: 'category',
                    label: '2-1. FastAPI 실전 시리즈',
                    items: [
                        {
                            type: 'doc',
                            label: '1. Layered Architecture와 DI 패턴',
                            id: 'fastapi/series/fast-api-layered'
                        }
                    ],
                },
            ]
        },
    ]
};

export default sidebars;
