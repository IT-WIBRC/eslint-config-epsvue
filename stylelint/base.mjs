export default {
  extends: ["stylelint-config-standard"],
  overrides: [
    {
      files: ["*.scss", "**/*.scss"],
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss",
      ],
    },
    {
      files: ["*.vue", "**/*.vue"],
      extends: ["stylelint-config-recommended-vue"],
    },
  ],
  rules: {
    "no-empty-source": null,
    "lightness-notation": ["number", "percentage"],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extends",
          "tailwind",
          "layer",
          "apply",
          "responsive",
          "variants",
          "screen",
        ],
      },
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested", "after-single-line-comment"],
        ignore: ["after-comment"],
      },
    ],
  },
};
