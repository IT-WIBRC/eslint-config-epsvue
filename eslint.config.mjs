import eslintConfig from "./lib/index.mjs";

export default [
  ...eslintConfig,
  {
    ignores: [
      "node_modules/**/*",
      "**/package-lock.json",
      ".idea/**/*",
      "**/.vscode",
      "!/.github",
      "!/.vscode",
      "test/fixtures"
    ]
  }
];
