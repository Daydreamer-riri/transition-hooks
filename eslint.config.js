import ririd, { markdown } from '@ririd/eslint-config'

export default ririd(
  {
    formatters: {
      markdown: true,
    },
  },
  markdown({ files: ['**/*.mdx'] }),
  {
    files: ['**/*.mdx/**/*.?([cm])[jt]s?(x)'],
    rules: {
      'style/no-multiple-empty-lines': 'off',
      'unused-imports/no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
)
