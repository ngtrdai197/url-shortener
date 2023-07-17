module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  rules: {
    // Stylelint default rules
    'at-rule-no-unknown': null,
    // `color-hex-case` conflicts with `prettier`
    'block-no-empty': true,
    'no-invalid-double-slash-comments': null,
    'color-hex-length': 'long',
    'comment-empty-line-before': null,
    'comment-whitespace-inside': 'always',
    // `declaration-block-trailing-semicolon` conflicts with `prettier`
    // `declaration-colon-space-after` conflicts with `prettier`
    // `declaration-colon-space-before` conflicts with `prettier`
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    // `identation` conflicts with `prettier`
    // `media-feature-colon-space-after` is set by `stylelint-config-prettier`
    // `media-feature-colon-space-before` is set by `stylelint-config-prettier`
    'media-feature-name-no-vendor-prefix': true,
    // `media-feature-parentheses-space-inside` is set by `stylelint-config-prettier`
    // `number-leading-zero` conflicts with `prettier`
    'property-no-vendor-prefix': true,
    // `rule-empty-line-before` conflicts with `prettier
    // `selector-attribute-brackets-space-inside` is set by `stylelint-config-prettier`
    // `selector-attribute-quotes` is set by `stylelint-config-prettier`
    // 'selector-class-pattern': [
    //   '(?!(^|-|_)[0-9])(?!(^-|-$|^([uamot]|swiper|page)--|---|__-|-__))^([uamot]|swiper|page)-[0-9a-z-]+(__[0-9a-z-]+){0,2}(--[0-9a-z-]+)?$',
    //   {
    //     resolveNestedSelectors: true,
    //   },
    // ],
    // `selector-combinator-space-after` conflicts with `prettier`
    'selector-no-vendor-prefix': true,
    // `selector-pseudo-class-parentheses-space-inside` is set by `stylelint-config-prettier`
    // `string-quotes` conflicts with `prettier`
    'value-no-vendor-prefix': true,

    // `stylelint-scss` rules
    'function-no-unknown': null,
    'rule-empty-line-before': ['always', { ignore: ['first-nested', 'after-comment'] }],
    'shorthand-property-no-redundant-values': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'annotation-no-unknown': null,
    'value-keyword-case': null,
    'media-feature-range-notation': null,
    'import-notation': null,
    'color-no-hex': true,
    'color-named': "never",
  },
  overrides: [
    {
      files: ['src/**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'scss/at-rule-no-unknown': true,
        'scss/at-import-partial-extension': null,
        'scss/function-no-unknown': null,
      },
    },
  ],
};
