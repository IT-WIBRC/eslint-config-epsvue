import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import vuePrettierConfig from "@vue/eslint-config-prettier";
import { checkTypeScriptDependencies } from "../utils/check-typescript-dependencies.js";

const {
  vueEslintConfigTypescript,
} = await checkTypeScriptDependencies();


let vueEslintConfigTypescriptRecommended = null;
 if (vueEslintConfigTypescript) {
  vueEslintConfigTypescriptRecommended =  vueEslintConfigTypescript
  .defineConfigWithVueTs(
    vueEslintConfigTypescript.vueTsConfigs.recommended
  );
 }

export default [
  js.configs.recommended,
  ...eslintPluginVue.configs["flat/essential"],
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
  ...(vueEslintConfigTypescriptRecommended ?? []),
];
