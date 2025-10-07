import { logger } from "./logger.js";
import { readdirSync, statSync } from "fs";
import { resolve, extname } from "path";
import { cwd } from "process";

/**
 * Helper function to check for JS/TS files in the project root, excluding common directories and config files.
 * Now detects and differentiates between JS and TS projects.
 * @returns {string} 'js', 'ts', or '' (empty string)
 */
function getProjectType() {
  const jsExtensions = [".js", ".jsx", ".mjs", ".cjs"];
  const tsExtensions = [".ts", ".tsx"];
  const configExtensions = [".js", ".cjs", ".mjs", ".ts", ".cts"];
  const projectPath = cwd();
  const excludedDirectories = ["node_modules", "dist", "build", "out"];
  const excludedConfigPrefixes = [
    "webpack.config",
    "vite.config",
    "rollup.config",
    "babel.config",
    "jest.config",
    "eslint.config",
    "postcss.config",
    "tailwind.config",
  ];
  const excludedFiles = ["tsconfig.json"];

  let hasJS = false;
  let hasTS = false;

  try {
    const files = readdirSync(projectPath);
    for (const file of files) {
      const filePath = resolve(projectPath, file);
      const fileStat = statSync(filePath);

      if (fileStat.isDirectory()) {
        if (excludedDirectories.includes(file)) {
          continue;
        }
      } else if (fileStat.isFile()) {
        const ext = extname(file).toLowerCase();
        const baseName = file.split(".").slice(0, -1).join(".");

        if (excludedFiles.includes(file)) continue;
        if (
          excludedConfigPrefixes.some((prefix) => baseName.startsWith(prefix))
        )
          continue;
        if (configExtensions.includes(ext) && baseName === "nuxt.config")
          continue;

        if (jsExtensions.includes(ext)) {
          hasJS = true;
        } else if (tsExtensions.includes(ext)) {
          hasTS = true;
        }
      }
    }
  } catch (error) {
    logger.error(`Error reading project directory: ${error.message}`);
    return "";
  }

  if (hasTS) {
    return "ts";
  } else if (hasJS) {
    return "js";
  }
  return "";
}

/**
 * Checks for TypeScript-related dependencies and logs a warning message if they are missing
 * in a project that uses TypeScript.  It attempts to dynamically import necessary modules.
 *
 * @returns {Promise<{
 * typescriptEslintPlugin: any | null,
 * typescriptEslintParser: any | null,
 * vueEslintConfigTypescript: any | null,
 * typescript: any | null,
 * typescriptEslint: any | null
 * }>} An object containing the imported modules (or null if they are not installed).
 * If TypeScript dependencies are missing, it also logs a warning to the console.
 */
export async function checkTypeScriptDependencies() {
  let typescriptEslintParser = null;
  let vueEslintConfigTypescript = null;
  let typescriptEslint = null;
  let typescriptEslintPlugin = null;
  let typescript = null;
  let displayWarning = false;

  try {
    typescript = await import("typescript");
    const projectType = getProjectType();

    if (projectType === "ts") {
      try {
        typescriptEslintParser = (await import("@typescript-eslint/parser"))
          .default;

        typescriptEslintPlugin = (
          await import("@typescript-eslint/eslint-plugin")
        ).default;

        vueEslintConfigTypescript = await import(
          "@vue/eslint-config-typescript"
        );

        typescriptEslint = await import("typescript-eslint");
        // oxlint-disable-next-line no-unused-vars
      } catch (missingDependencyError) {
        displayWarning = true;
      }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Cannot find package")
    ) {
      const projectType = getProjectType();
      if (projectType === "ts") {
        displayWarning = true;
      }
    } else {
      throw error;
    }
  }

  if (displayWarning) {
    const missingPackages = [
      "@typescript-eslint/eslint-plugin@'>=8.0.0'",
      "@typescript-eslint/parser@'>=8.0.0'",
      "@vue/eslint-config-typescript@'>=14.0.0'",
      "typescript-eslint@'>=8.32.0'",
      "typescript@'>=4.8.4'",
    ];
    const errorMessage =
      "[⚠️  eslint-config-epsvue] Partial TypeScript support.";
    const reasonMessage = "Reason: The following packages are not installed:";
    const solutionMessage = `Solution: Install them to enable full TypeScript support: npm install --save-dev ${missingPackages.join(" ")}`;

    logger.warning(errorMessage);
    logger.info(reasonMessage);
    logger.error(missingPackages.join(", "));
    logger.success(solutionMessage);
  }

  return {
    typescriptEslintParser,
    vueEslintConfigTypescript,
    typescriptEslintPlugin,
    typescript,
    typescriptEslint,
  };
}
