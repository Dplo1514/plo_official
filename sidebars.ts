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
      label: '01_Company',
      items:[
        // {
        //   type: 'category',
        //   label: '1. R&D',
        //   items: [
        //   ],
        // },
        {
          type: 'category',
          label: '2. Tech Stack',
          items: [
            {
              type: 'category',
              label: '2-1. Fast Api',
              link: {
                type: 'doc',
                id: 'company/tech-stack/fast-api/fast-api',
              },
              items: [
                {
                  type: 'doc',
                  label: 'A. Fast API 개요',
                  id: 'company/tech-stack/fast-api/fast-api'
                }
              ]
            }
          ],
        }
      ]
    },
    {
      type: 'category',
      label: '02_Study',
      items:[
          {
            type: 'category',
            label: '1. Language',
            items: [
              {
                type: 'category',
                label: '1-1. Python',
                items: [
                  {
                    type: 'category',
                    label: 'A. Test',
                    items: [
                      {
                        type: 'doc',
                        label: 'a. Test Container',
                        id: 'study/language/python/test-container'
                      }
                    ]
                  }
                ]
              }
            ],
          },
        {
          type: 'category',
          label: '2. AI',
          items: [
            {
              type: 'category',
              label: '2-1. Multi Agent',
              link: {
                type: 'doc',
                id: 'study/ai/system/multi-agent-system',
              },
              items: [
                // {
                //   type: 'doc',
                //   label: 'A. ',
                //   id: 'study/ai/system/multi-agent-system'
                // }
              ]
            },
            {
              type: 'doc',
              label: '2-2. Knowledge Base System',
              id: 'study/ai/system/knowledge-base-system'
            }
          ],
        },
        {
          type: 'category',
          label: '3. DATA',
          items: [
            {
              type: 'category',
              label: '3-1. Pipeline',
              items: [
                {
                  type: 'category',
                  label: 'A. ETL Pipeline',
                  link: {
                    type: 'doc',
                    id: 'study/data/pipeline/etl-pipeline',
                  },
                  items: [
                    // {
                    //   type: 'doc',
                    //   label: 'A. Air flow',
                    //   id: 'study/data/pipeline/air-flow'
                    // }
                  ]
                }
              ]
            }
          ],
        },
      ]
    },
  ]
};

export default sidebars;
