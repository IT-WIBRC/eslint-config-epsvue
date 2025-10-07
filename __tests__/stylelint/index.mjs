import { fail } from "assert";
import cp from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STYLELINT = `.${path.sep}node_modules${path.sep}.bin${path.sep}stylelint`;

describe("Integration with `eslint-config-epsvue/stylelint`", () => {
  let originalCwd;

  before(() => {
    originalCwd = process.cwd();
    process.chdir(
      path.join(
        __dirname,
        "../fixtures/integrations/style/eslint-config-epsvue-stylelint",
      ),
    );
    cp.execSync("npm i", { stdio: "inherit" });
  });

  after(() => {
    process.chdir(originalCwd);
  });

  it("should lint without errors", () => {
    cp.execSync(`${STYLELINT} src/Valid.vue --fix`, {
      stdio: "inherit",
    });
  });

  it("should lint with errors", () => {
    try {
      cp.execSync(`${STYLELINT} src/Invalid.vue`, {
        stdio: "inherit",
      });
      fail("Expect an error, but without errors");
    } catch (err) {
      if (!err || !err.message) {
        fail("Expected an error message, but got none");
      }
      console.log("Error message:", err.message);
    }
  });

  it("should lint SCSS with errors", () => {
    try {
      cp.execSync(`${STYLELINT} src/SCSSInvalid.vue`, {
        stdio: "inherit",
      });
      fail("Expect an error, but without errors");
    } catch (err) {
      if (!err || !err.message) {
        fail("Expected an error message, but got none");
      }
      console.log("Error message:", err.message);
    }
  });
});
