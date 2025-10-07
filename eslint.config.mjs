import eslintConfig from "./lib/index.mjs";

export default [
  ...eslintConfig,
  {
    ignores: [
      "node_modules/**/*",
      "__tests__/**/*",
      "**/package-lock.json",
      ".idea/**/*",
      "**/.vscode",
      "!/.github",
      "!/.vscode",
      "test/fixtures",
    ],
  },
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
];
