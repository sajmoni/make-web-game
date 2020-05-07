module.exports = ({ projectName }) => {
  const packageJsonTemplate = {
    name: projectName,
    version: '0.0.0',
    private: true,
    main: './electron.js',
    scripts: {
      start: 'parcel src/index.html --no-autoinstall --no-cache',
      lab: 'parcel labs/index.html --no-autoinstall --no-cache',
      build: 'rm -rf dist && parcel build src/index.html --public-url ./',
      test: 'ava',
      plop: 'plop --plopfile plop/plopfile.js',
      qa: 'tsc && xo --fix',
      'validate-ci': 'circleci config validate',
      'check-all': 'yarn lint && yarn typecheck && yarn validate-ci',
      munch:
        'muncher --input asset/sprite --output static/spritesheet/spritesheet --flip',
      'add-locale': 'lingui add-locale',
      extract: 'lingui extract --clean --overwrite',
      compile: 'lingui compile',
      validate: 'babel-node ./script/validateData.js',
      'elec:start': 'electron .',
      'elec:build':
        'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      'elec:pack': 'yarn electron-packager . --overwrite',
      'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      'elec:all': 'yarn elec:build && yarn elec:pack && yarn elec:run',
    },
    ava: {
      require: ['./script/setupTests.js'],
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
      useTabs: false,
      bracketSpacing: true,
    },
    xo: {
      extends: 'xo-react',
      prettier: true,
      parser: '@typescript-eslint/parser',
      env: ['browser', 'es2020', 'node'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        'unicorn/no-fn-reference-in-iterator': 'off',
        'import/no-absolute-path': 'off',
        'react/prop-types': 'off',
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
        'dot-notation': 'off',
        'unicorn/prefer-node-remove': 'off',
        'import/extensions': [
          'error',
          'never',
          {
            png: 'always',
            wav: 'always',
            json: 'always',
          },
        ],
      },
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'yarn test && yarn validate',
      },
    },
    lingui: {
      srcPathDirs: ['src'],
    },
    browserslist: ['defaults', 'not IE 11', 'not IE_Mob 11'],
  }

  return packageJsonTemplate
}
