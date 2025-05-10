/**
 * Comprehensive ESLint Flat Configuration for JavaScript and TypeScript
 * Vue.js plugins.
 *
 * This configuration provides a robust set of linting rules for plugin
 * development, supporting both JavaScript and TypeScript, and integrating
 * with Vue.js, Prettier, Cypress, Storybook, and security linting.
 *
 * To integrate this into your plugin:
 * 1. Save this content as `eslint.config.js` in your plugin's root directory.
 * 2. Ensure that the ESLint and plugin dependencies listed in the import
 * statements are specified as `peerDependencies` in your plugin's
 * `package.json`. This allows the consuming project to manage these
 * dependencies.
 */
import globals from "globals";
import js from "@eslint/js";
import vuePrettierConfig from "@vue/eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress/flat";
import storybook from "eslint-plugin-storybook";
import stylistic from "@stylistic/eslint-plugin";
import securityPlugin from "eslint-plugin-security";

import { checkTypeScriptDependencies } from "../utils/check-typescript-dependencies.js";

const {
  typescriptEslintPlugin,
  typescriptEslintParser,
  vueEslintConfigTypescript,
  typescriptEslint,
} = await checkTypeScriptDependencies();

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    ...(vueEslintConfigTypescript ? ["@vue/eslint-config-typescript"] : []),
    plugins: {
      ...(typescriptEslintPlugin
        ? { "@typescript-eslint": typescriptEslintPlugin }
        : {}),
    },
    languageOptions: {
      parserOptions: {
        parser: typescriptEslintParser,
        project: ["./tsconfig.json"],
        sourceType: "module",
      },
    },
    rules: {
      ...(typescriptEslint?.configs?.recommended?.rules || {}),
      ...typescriptEslint?.configs["recommended-type-checked"]?.rules,
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/restrict-plus-operands": "warn",
    },
  },
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    rules: {
      "vue/require-prop-types": "warn",
      "vue/require-default-prop": "warn",
      "vue/no-unused-components": "warn",
      "vue/no-template-shadow": "warn",
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/max-len": [
        "error",
        {
          code: 100,
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
          template: 200,
        },
      ],
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: [],
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    rules: {
      "storybook/no-unstable-default-export": "warn",
    },
  },
  pluginCypress.configs.recommended,
  {
    files: ["cypress/e2e/**/*.cy.{js,ts,jsx,tsx}"],
    rules: {
      "cypress/no-assigning-return-values": "warn",
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/no-async-tests": "warn",
    },
  },
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.vue",
      "*.vue",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.mts",
    ],
    plugins: {
      "@stylistic": stylistic,
      security: securityPlugin,
    },
    ignores: [
      "node_modules/**/*",
      "**/package-lock.json",
      ".husky/**/*",
      ".idea/**/*",
      "**/.vscode",
      "dist/**/*",
      "build/**/*",
      "deployment/**/*",
      "!**/.prettierrc.js",
      "coverage/",
    ],
    languageOptions: {
      globals: {
        ...globals.jquery,
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        parser: typescriptEslintParser,
        sourceType: "module",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/key-spacing": ["error", { afterColon: true }],
      "@stylistic/keyword-spacing": "error",
      "@stylistic/lines-around-comment": [
        "error",
        {
          beforeBlockComment: false,
          afterBlockComment: false,
        },
      ],
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          ImportDeclaration: {
            consistent: true,
            multiline: true,
          },
        },
      ],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": "error",
      "@stylistic/padding-line-between-statements": [
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
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always", { omitLastInOneLineBlock: true }],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-before-function-paren": "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-unused-vars": "off",
      "no-useless-escape": "warn",
      "class-methods-use-this": "warn",
      "sort-imports": "off",
      "security/detect-object-injection": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-possible-timing-attacks": "error",
      "security/detect-unsafe-regex": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
    settings: {
      "vue/multi-word-component-names": "warn",
    },
  },
  vuePrettierConfig,
];
