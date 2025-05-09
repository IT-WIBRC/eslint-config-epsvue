import epsvueFull from "./index.mjs";
import vuePrettierConfig from "@vue/eslint-config-prettier";

export default [
  ...epsvueFull.slice(0, 3), // Include core JS, TS, and basic Vue
  epsvueFull.find(
    (config) => config.files && config.files.includes("**/*.vue"),
  ),
  vuePrettierConfig,
];
