import { logger } from "./logger.js"; // Assuming this is your logger
import { readdirSync, statSync, existsSync } from "fs";
import { resolve, extname } from "path";
import { cwd } from "process";

/**
 * Helper function to check for JS/TS files in the project root, excluding common directories and config files.
 * Now detects and differentiates between JS and TS projects.
 * @returns {string} 'js', 'ts', or '' (empty string)
 */
function getProjectType() {
  const jsExtensions = [".js", ".jsx", ".mjs", ".cjs"]; // Include module extensions
  const tsExtensions = [".ts", ".tsx"];
  const configExtensions = [".js", ".cjs", ".mjs", ".ts", ".cts"]; // Include module extensions
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
  const excludedFiles = ["tsconfig.json"]; // Explicitly exclude tsconfig.json

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
  let typescriptEslintPlugin = null;
  let typescriptEslintParser = null;
  let vueEslintConfigTypescript = null;
  let typescript = null;
  let typescriptEslint = null;
  let displayWarning = false;

  try {
    typescript = await import("typescript");
    const projectType = getProjectType();

    if (projectType === "ts") {
      try {
        typescriptEslintPlugin = await import(
          "@typescript-eslint/eslint-plugin"
        );
        typescriptEslintParser = await import("@typescript-eslint/parser");
        vueEslintConfigTypescript = await import(
          "@vue/eslint-config-typescript"
        );
        typescriptEslint = await import("typescript-eslint");
      } catch (missingDependencyError) {
        displayWarning = true;
      }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Cannot find package")
    ) {
      //  TypeScript is not installed, which is fine if the project is JS.
      const projectType = getProjectType();
      if (projectType === "ts") {
        displayWarning = true;
      }
    } else {
      // Re-throw other errors.  This is important for debugging.
      throw error;
    }
  }

  if (displayWarning) {
    const missingPackages = [
      "@typescript-eslint/eslint-plugin@'>=8.0.0'",
      "@typescript-eslint/parser@'>=8.0.0'",
      "@vue/eslint-config-typescript@'>=14.0.0'",
      "typescript-eslint@'>=8.32.0'",
      "typescript@'>=5.0.0'",
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
    typescriptEslintPlugin,
    typescriptEslintParser,
    vueEslintConfigTypescript,
    typescript,
    typescriptEslint,
  };
}
