import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import vuePrettierConfig from "@vue/eslint-config-prettier";

export default [
  js.configs.recommended,
  ...eslintPluginVue.configs["flat/base"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  vuePrettierConfig,
];
