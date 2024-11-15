/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:storybook/recommended",
  ],
  env: {
    jquery: true,
    node: true,
    browser: true,
    jest: true,
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      files: ["cypress/integration/**.spec.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "arrow-spacing": 2,
    "class-methods-use-this": 0,
    "computed-property-spacing": ["error", "never"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "key-spacing": [
      2,
      {
        afterColon: true,
      },
    ],
    "keyword-spacing": 2,
    "linebreak-style": "off",
    "lines-around-comment": [
      "error",
      {
        afterBlockComment: false,
        beforeBlockComment: false,
      },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "no-useless-escape": "off",
    "object-curly-newline": [
      "error",
      {
        ImportDeclaration: {
          consistent: true,
          multiline: true,
        },
      },
    ],
    "object-curly-spacing": [2, "always"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "function",
        prev: "function",
      },
      {
        blankLine: "always",
        next: "class",
        prev: "class",
      },
    ],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: [
      "error",
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
    "quote-props": ["error", "as-needed"],
    "sort-imports": "off",
    "space-before-blocks": 2,
    "space-before-function-paren": "off",
    "space-in-parens": ["error", "never"],
    "vue/max-len": [
      "error",
      {
        code: 80,
        comments: 80,
        ignoreComments: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
        ignorePattern: "",
        ignoreRegExpLiterals: false,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        tabWidth: 4,
        template: 80,
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [],
      },
    ],
    "object-property-newline": "error",
  },
};
