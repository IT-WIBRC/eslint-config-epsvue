import { logger } from "./logger.js";

export async function checkTypeScriptDependencies() {
  let typescriptEslintPlugin = null;
  let typescriptEslintParser = null;
  let vueEslintConfigTypescript = null;
  let typescript = null;
  let typescriptEslint = null;

  try {
    // Check if the modules are installed
    await import("typescript");
    await import("@typescript-eslint/eslint-plugin");
    await import("@vue/eslint-config-typescript");
    await import("typescript-eslint");

    // If require.resolve doesn't throw, we can safely import them.
    typescriptEslintPlugin = await import("@typescript-eslint/eslint-plugin");
    typescriptEslintParser = await import("@typescript-eslint/parser");
    vueEslintConfigTypescript = await import("@vue/eslint-config-typescript");
    typescript = await import("typescript");
    typescriptEslint = await import("typescript-eslint");
  } catch (error) {
    // The modules are not installed. Handle this situation.
    const missingPackages = [
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "@vue/eslint-config-typescript",
      "typescript",
      "typescript-eslint",
    ];
    logger.error(`🔴 Error Details: ${error.message}`);
    logger.info(`👉 npm install --save-dev ${missingPackages.join(" ")}`);
    logger.warning(
      "[⚠️ eslint-config-epsvue] TypeScript support is disabled because the following TypeScript-related packages" +
        `are not installed: ${missingPackages.join(", ")}.Install them to enable full TypeScript support:`,
    );
  }

  return {
    typescriptEslintPlugin,
    typescriptEslintParser,
    vueEslintConfigTypescript,
    typescript,
    typescriptEslint,
  };
}
