# eslint-config-epsvue

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/eslint-config-epsvue)
![NPM Version](https://img.shields.io/npm/v/eslint-config-epsvue) ![NPM Downloads](https://img.shields.io/npm/dm/eslint-config-epsvue) ![NPM Downloads](https://img.shields.io/npm/dw/eslint-config-epsvue) ![GA CI](https://github.com/IT-WIBRC/eslint-config-epsvue/actions/workflows/test.yml/badge.svg)

A comprehensive and shareable ESLint configuration tailored for Vue.js projects, incorporating best practices for JavaScript, TypeScript, Vue.js, Prettier, testing (Cypress, Jest/Vitest), Storybook, and security. This configuration aims to provide a solid foundation for clean, maintainable, and secure Vue.js code.

## Key Features

- **Pre-configured for Vue.js:** Includes specific rules and settings for Vue.js single-file components (`.vue`).
- **TypeScript Support:** Seamlessly handles both JavaScript (`.js`, `.mjs`, `.cjs`) and TypeScript (`.ts`, `.tsx`, `.mts`) projects.
- **Prettier Integration:** Designed to work smoothly with Prettier for automatic code formatting, minimizing conflicts.
- **Testing Framework Support:** Provides configurations optimized for Cypress end-to-end tests and Jest/Vitest unit tests.
- **Storybook Integration:** Includes linting rules specific to Storybook stories.
- **Security Focused:** Incorporates `eslint-plugin-security` to help identify potential security vulnerabilities.
- **Stylistic Enforcement:** Utilizes `@stylistic/eslint-plugin` for fine-grained control over code style.
- **Granular Control:** Offers a well-structured configuration with specific overrides for different file types.
- **Stylelint for Styling:** Enforces consistent styling for CSS, SCSS, and styles within Vue components.
- **Comprehensive Configuration:** Includes configurations for testing (Cypress, Jest/Vitest) and Storybook.
- **Shareable and Extendable:** Easy to adopt in your Vue.js projects.

## What do you need to know before using this

Start from the version `1.1.0`, you have to use `eslint version >= 9.0.0` as this support only the nodejs versions above `18.18.0` same as `stylelint 16` witch support `node 18.12.0`.

> [!WARNING]
> Make sure you upgrade to at least `Node.js v18.18.0` when using `ESLint v9.0.0`. One important thing to double check is the Node.js version supported by your editor when using ESLint via editor integrations. If you are unable to upgrade, we recommend continuing to use ESLint v8.56.0 until you are able to upgrade Node.js. You can read it on the [eslint's official documentation](https://eslint.org/docs/latest/use/migrate-to-9.0.0#drop-old-node)

> [!NOTE]
> The current version doesn't support the legacy .eslintrc\* configuration format. If ?you want to use this format, feel free to install this version [v1.0.4](https://www.npmjs.com/package/eslint-config-epsvue/v/1.0.4)

And you need to note that:

> [!NOTE]
> If you want to know more about the new configurations, you can see the [Key Differences between Configuration Formats](https://eslint.org/docs/latest/use/configure/migration-guide#key-differences-between-configuration-formats)

## Installation

To use `eslint-config-epsvue` in your project, follow these steps:

1.  **Install the package and its peer dependencies:**

    Using npm:

    ```bash
    npm install --save-dev eslint-config-epsvue
    ```

    Using yarn:

    ```bash
    yarn add --dev eslint-config-epsvue
    ```

    Using bun:

    ```bash
    bun add --dev eslint-config-epsvue
    ```

2.  **Configure ESLint:**

    Create an `eslint.config.js` (or `eslint.config.mjs`) file in the root of your project (if you don't have one already) and add the following:

    ```javascript
    import epsvue from "eslint-config-epsvue";

    export default [...epsvue];
    ```

    If you need to customize or extend the configuration, you can do so by adding additional configuration objects to the exported array. For example:

    ```javascript
    import epsvue from "eslint-config-epsvue";

    export default [
      ...epsvue,
      {
        files: ["src/**/*.js", "src/**/*.vue"],
        rules: {
          // Your project-specific rules or overrides
          "no-console": "warn",
        },
      },
    ];
    ```

3.  **Configure Stylelint:**

    Create a `stylelint.config.js` file in the root of your project and add the following:

    ```javascript
    import epsvueStylelint from "eslint-config-epsvue/stylelint";

    export default {
      extends: [epsvueStylelint],
      // Add project-specific Stylelint rules or overrides here (optional)
      rules: {
        "selector-class-pattern": null, // Example: Disable class name pattern
      },
    };
    ```

## Usage

This configuration provides linting for both JavaScript/TypeScript (via ESLint) and styling (via Stylelint).

### ESLint

You can import different flavors of this configuration based on your project's needs:

- **Full Configuration (Default):** Includes the complete set of linting rules for JavaScript, TypeScript, Vue.js, Prettier, testing (Cypress, Jest/Vitest), Storybook, security, and stylistic enforcement. This is the configuration you get when importing `eslint-config-epsvue` directly.

  ```javascript
  import epsvue from "eslint-config-epsvue";

  export default [...epsvue];
  ```

- **Recommended:** A generally recommended configuration that includes core JavaScript, TypeScript, and Vue.js linting, along with Prettier integration. This option omits some of the more specialized testing and Storybook rules.

  ```javascript
  import epsvueRecommended from "eslint-config-epsvue/recommended";

  export default [...epsvueRecommended];
  ```

- **TypeScript Specific:** Optimized for Vue.js projects primarily using TypeScript. It includes the core TypeScript linting rules along with basic Vue.js support and Prettier.

  ```javascript
  import epsvueTypescript from "eslint-config-epsvue/typescript";

  export default [...epsvueTypescript];
  ```

- **Minimal:** A very basic setup with essential JavaScript and Vue.js linting, plus Prettier. This is the lightest option for projects with simpler needs.

  ```javascript
  import epsvueMinimal from "eslint-config-epsvue/minimal";

  export default [...epsvueMinimal];
  ```

  You can still extend or customize these flavors as needed:

  ```javascript
  import epsvueRecommended from "eslint-config-epsvue/recommended";

  export default [
    ...epsvueRecommended,
    {
      files: ["src/**/*.js", "src/**/*.vue"],
      rules: {
        "no-console": "warn",
      },
    },
  ];
  ```

- **Running ESLint:** You can run ESLint from your terminal using the following command (usually defined in your `package.json` scripts):

  ```bash
  npx eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts
  # or
  yarn eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts
  # or
  bun eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts
  ```

- **Automatic Fixing:** ESLint can automatically fix many styling and some code quality issues:

  ```bash
  npx eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts --fix
  # or
  yarn eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts --fix
  # or
  bun eslint . --ext .vue,.js,.ts,.jsx,.tsx,.mjs,.cjs,.mts --fix
  ```

- **Editor Integration:** It's highly recommended to integrate ESLint with your code editor for real-time feedback as you write code. Most popular editors have ESLint plugins available.

### Stylelint

You can import different flavors of this configuration based on your project's needs:

- **Full Configuration (Default):** Includes the complete set of stylelint rules.

  ```javascript
  import epsvueStylelint from "eslint-config-epsvue/stylelint";

  module.exports = {
    extends: [epsvueStylelint],
    // Add project-specific Stylelint rules or overrides here (optional)
  };
  ```

- **Minimal:** A minimal stylelint configuration.

  ```javascript
  import epsvueStylelintMinimal from "eslint-config-epsvue/stylelint-minimal";

  export default {
    extends: [epsvueStylelintMinimal],
    // Add project-specific Stylelint rules or overrides here (optional)
  };
  ```

1.  **Configure Stylelint:**
    
    Create a `stylelint.config.js` file in the root of your project and extend the desired Stylelint configuration. The default is full.

    ```javascript
    import epsvueStylelint from "eslint-config-epsvue/stylelint";

    export default {
      extends: [epsvueStylelint],
      // Add project-specific Stylelint rules or overrides here (optional)
      rules: {
        "selector-class-pattern": null, // Example: Disable class name pattern
      },
    };
    ```

2.  **Running Stylelint:** 

    You can run Stylelint from your terminal using the following command (usually defined in your `package.json` scripts):

    ```bash
    npx stylelint  '**/*.{vue,css,scss}' --allow-empty-input
    #or
    yarn stylelint  '**/*.{vue,css,scss}' --allow-empty-input
    #or
    bun stylelint  '**/*.{vue,css,scss}' --allow-empty-input
    ```

3.  **Automatic Fixing:** 
  
    Stylelint can automatically fix many styling issues:

    ```bash
    npx stylelint  '**/*.{vue,css,scss}' --allow-empty-input --fix
    #or
    yarn stylelint  '**/*.{vue,css,scss}' --allow-empty-input --fix
    #or
    bun stylelint  '**/*.{vue,css,scss}' --allow-empty-input --fix
    ```

4.  **Editor Integration:** 

It's highly recommended to integrate Stylelint with your code editor for real-time feedback as you write code. Most popular editors have Stylelint plugins available.
Use the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension that [Stylelint] provides officially.

You have to configure the `stylelint.validate` option of the extension to check `.vue` files, because the extension does not check the `*.vue` file by default.

Example **.vscode/settings.json**:

```jsonc
{
  "stylelint.validate": [
      ...,
      // ↓ Add "vue" language.
      "vue"
  ]
```

## Peer Dependencies

The following packages are peer dependencies of `eslint-config-epsvue`. This means they need to be installed in your project alongside this configuration:

- `eslint`
- `@eslint/js`
- `eslint-plugin-vue`
- `@vue/eslint-config-typescript`
- `@vue/eslint-config-prettier`
- `eslint-plugin-prettier`
- `eslint-plugin-cypress`
- `eslint-plugin-storybook`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `globals`
- `@stylistic/eslint-plugin`
- `eslint-plugin-security`
- `prettier`
- `stylelint`
- `stylelint-config-recommended-vue`
- `stylelint-config-standard-vue`
- `stylelint-config-standard-scss`
- `stylelint-order`

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](https://github.com/IT-WIBRC/eslint-config-epsvue/blob/main/CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is open source and does not currently have a specific license file. All rights are reserved by the authors unless explicitly granted.

## Stay Updated

Follow [IT-WIBRC](https://github.com/IT-WIBRC) on GitHub for more updates and projects.
