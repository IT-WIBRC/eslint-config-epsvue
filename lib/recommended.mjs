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
import ignores from "../utils/ignoreFiles.js";

const { vueEslintConfigTypescript, typescriptEslint, typescriptEslintParser } =
  await checkTypeScriptDependencies();

let vueEslintConfigTypescriptRecommended = null;
if (vueEslintConfigTypescript) {
  vueEslintConfigTypescriptRecommended =
    vueEslintConfigTypescript.defineConfigWithVueTs(
      vueEslintConfigTypescript.vueTsConfigs.recommended,
    );
}

export default [
  {
    ignores,
  },
  {
    languageOptions: {
      globals: {
        ...globals.jquery,
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  js.configs.recommended,
  ...(vueEslintConfigTypescriptRecommended ?? []),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    rules: {
      ...(typescriptEslint?.configs?.recommended?.rules || {}),
      ...typescriptEslint?.configs["recommended-type-checked"]?.rules,
    },
  },
  ...eslintPluginVue.configs["flat/recommended"],
  ...storybook.configs["flat/recommended"],
  pluginCypress.configs.recommended,
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
    languageOptions: {
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
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-unused-vars": "off",
      "no-useless-escape": "warn",
      "class-methods-use-this": "warn",
      "security/detect-object-injection": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-possible-timing-attacks": "error",
      "security/detect-unsafe-regex": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "prettier/prettier": "warn",
    },
  },
  vuePrettierConfig,
];
