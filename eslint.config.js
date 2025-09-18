import neo, { resolveIgnoresFromGitignore, plugins } from 'neostandard';

const stylisticRules = plugins['@stylistic'].configs['all-flat'];
const typescriptEslintRules = plugins['typescript-eslint'].configs.recommended;

export default [
  ...neo({
    ts: true,
    semi: true,
    ignores: resolveIgnoresFromGitignore()
  }),
  stylisticRules,
  ...typescriptEslintRules,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': [0, 'always'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/linebreak-style': 0,
      '@stylistic/multiline-comment-style': ['warn', 'separate-lines'],
      '@stylistic/function-call-argument-newline': 'off',
      '@stylistic/lines-around-comment': 'off',
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      '@stylistic/array-element-newline': [
        'warn',
        {
          minItems: 3,
          multiline: true,
          consistent: true
        }
      ],
      'import-x/order': [
        'warn',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'internal',
            'external',
            'sibling',
            'parent',
            'index'
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
];
