import { defineConfig } from 'vocs'

export default defineConfig({
  description: `☄️ An extremely light-weight react transition hook which is simpler and easier to use than react-transition-group.`,
  title: 'Transition-hooks',
  editLink: {
    pattern: 'https://github.com/Daydreamer-riri/transition-hooks/edit/main/docs/pages/:path',
    text: 'Suggest changes to this page',
  },
  sidebar: [
    {
      text: 'Getting Started',
      items: [
        {
          text: 'Introduction',
          link: '/docs',
        },
      ],
    },
    {
      text: 'Hooks',
      items: [
        {
          text: 'useTransition',
          link: '/docs/useTransition',
        },
      ],
    },
  ],
})
