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
        {
          type: 'category',
          label: '1. Tech Stack',
          items: [
            {
              type: 'category',
              label: '1-1. Elastic Search',
              items: [
                {
                  type: 'doc',
                  label: 'A. Elastic Search 개요',
                  id: 'company/tech-stack/elastic-search/elastic-search'
                }
              ]
            }
          ],
        },
        // {
        //   type: 'category',
        //   label: '2. R&D',
        //   items: [
        //     {
        //       type: 'category',
        //       label: '2-1.',
        //       items: [
        //         {
        //           type: 'doc',
        //           label: 'A. R&D 항목',
        //           id: 'company/tech-stack/elastic-search/elastic-search'
        //         }
        //       ]
        //     }
        //   ],
        // },
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
                label: '1-1. Java',
                items: [
                  {
                    type: 'category',
                    label: 'A. JVM',
                    items: [
                      {
                        type: 'doc',
                        label: 'a. JVM Memory Structure',
                        id: 'study/language/java/jvm-memory'
                      }
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
