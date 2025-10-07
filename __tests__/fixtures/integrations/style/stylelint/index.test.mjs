import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import stylelint from "stylelint";

import config from "../../stylelint/index.mjs";

describe("With css file", () => {
  const validCss = readFileSync("./__tests__/stylelint/validCss.css", "utf-8");
  const invalidCss = readFileSync(
    "./__tests__/stylelint/invalidCss.css",
    "utf-8",
  );

  describe("flags no warnings with valid css", () => {
    let result;

    beforeEach(async () => {
      result = await stylelint.lint({
        code: validCss,
        config,
      });
    });

    it("has no errors", () => {
      assert.equal(result.errored, false);
    });

    it("flags no warnings", () => {
      assert.equal(result.results[0].warnings.length, 0);
    });
  });

  describe("flags warnings with invalid css", () => {
    let result;

    beforeEach(async () => {
      result = await stylelint.lint({
        code: invalidCss,
        config,
      });
    });

    it("includes an error", () => {
      assert.equal(result.errored, true);
    });

    it("flags one warning", () => {
      assert.equal(result.results[0].warnings.length, 1);
    });

    it("corrects warning text", () => {
      assert.equal(
        result.results[0].warnings[0].text,
        'Unexpected unknown type selector "madeup" (selector-type-no-unknown)',
      );
    });

    it("corrects rule flagged", () => {
      assert.equal(
        result.results[0].warnings[0].rule,
        "selector-type-no-unknown",
      );
    });

    it("corrects severity flagged", () => {
      assert.equal(result.results[0].warnings[0].severity, "error");
    });

    it("corrects line number", () => {
      assert.equal(result.results[0].warnings[0].line, 1);
    });

    it("corrects column number", () => {
      assert.equal(result.results[0].warnings[0].column, 1);
    });
  });
});

describe("With css inside vue file", () => {
  const validVueCss = readFileSync(
    "./__tests__/stylelint/TheValid.vue",
    "utf-8",
  );
  const invalidVueCss = readFileSync(
    "./__tests__/stylelint/TheInvalid.vue",
    "utf-8",
  );

  describe("flags no warnings with valid css", () => {
    let result;

    beforeEach(async () => {
      result = await stylelint.lint({
        code: validVueCss,
        config,
      });
    });

    it("flags one warnings", () => {
      assert.equal(result.results[0].warnings.length, 1);
      assert.equal(result.results[0].warnings[0].rule, "CssSyntaxError");
      assert.equal(
        result.results[0].warnings[0].text,
        "Unknown word (CssSyntaxError)",
      );
    });
  });

  describe("flags warnings with invalid css", () => {
    let result;

    beforeEach(async () => {
      result = await stylelint.lint({
        code: invalidVueCss,
        config,
      });
    });

    it("includes an error", () => {
      assert.equal(result.errored, true);
    });

    it("flags one warning", () => {
      assert.equal(result.results[0].warnings.length, 1);
    });

    it("corrects warning text", () => {
      assert.equal(
        result.results[0].warnings[0].text,
        "Unknown word (CssSyntaxError)",
      );
    });

    it("corrects rule flagged", () => {
      assert.equal(result.results[0].warnings[0].rule, "CssSyntaxError");
    });

    it("corrects severity flagged", () => {
      assert.equal(result.results[0].warnings[0].severity, "error");
    });

    it("corrects line number", () => {
      assert.equal(result.results[0].warnings[0].line, 5);
    });

    it("corrects column number", () => {
      assert.equal(result.results[0].warnings[0].column, 1);
    });
  });
});

describe("deprecated rules are excluded", () => {
  const ruleNames = Object.keys(config.rules);

  it("is not empty", () => {
    assert.ok(ruleNames.length > 0);
  });

  for (const ruleName of ruleNames) {
    it(`${ruleName}`, async () => {
      const rule = await stylelint.rules[ruleName];

      assert.ok(!rule.meta.deprecated);
    });
  }
});
