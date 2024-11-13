# eslint-config-epsvue

![NPM Version](https://img.shields.io/npm/v/eslint-config-epsvue) ![NPM Downloads](https://img.shields.io/npm/dm/eslint-config-epsvue)

These are my settings for ESLint, Prettier and Stylelint that you can use for Vuejs app

You might like them - or you might not. Don't worry you can always change them.

## What do you need to know before using this

This version `1.1.0` use `eslint version >= 9.0.0`, this support only the nodejs versions above `18.18.0` same as `stylelint 16` witch support `node 18.12.0`.

> [!WARNING]  
> Make sure you upgrade to at least `Node.js v18.18.0` when using `ESLint v9.0.0`. One important thing to double check is the Node.js version supported by your editor when using ESLint via editor integrations. If you are unable to upgrade, we recommend continuing to use ESLint v8.56.0 until you are able to upgrade Node.js. You can read it on the [eslint's official documentation](https://eslint.org/docs/latest/use/migrate-to-9.0.0#drop-old-node)

And you need to note that:

> [!NOTE]  
> If you want to know more about the new configurations, you can see the [Key Differences between Configuration Formats](https://eslint.org/docs/latest/use/configure/migration-guide#key-differences-between-configuration-formats)

## What it does

- Lints JavaScript and TypeScript based on the latest standards
- Fixes issues and formatting errors with Prettier
- Lints + Fixes inside of html script tags
- You can see all the [rules here](https://github.com/IT-WIBRC/eslint-config-epsvue/blob/1.1.0/eslint.config.mjs). You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## Project setup

It's recommended you install this once per every project. ESLint used to have global configs, but no longer.

1. Installation

   ```bash
     npm install -D eslint-config-epsvue@1.2.1
   ```

2. Extend the eslint configuration

   create a file called `eslint.config.mjs` file in the root of your project. after copy this in the file:

   ```javascript
   import pluginEpsVue from "eslint-plugin-epsvue";

   export default [...pluginEpsVue];
   ```

3. Extend the stylelint configuration by adding this in the `package.json`

    ```json
    "stylelint": {
        "extends": ["eslint-config-epsvue/.stylelintrc.json"]
      }
    ```

    You can also extends it in your own `.styelintrc.json` file

    ```json
      {
        "extends": ["eslint-config-epsvue/.stylelintrc.json"]
      }
    ```

4. You can add two scripts to your package.json to lint, lint fix, format and style css:

   ```json
    "scripts": {
      "lint": "eslint .", // Detect errors
      "lint:fix": "eslint src/ --fix", //fix all resolvable eslint problems found starting from the base directory
      "format": "prettier src/ -w", // format code starting from the base directory
      "stylelint": "stylelint '**/*.{css,vue,scss}'",
    },
   ```

## Settings

If you'd like to overwrite eslint or prettier settings, you can add the rules in your `.eslintrc` file. The [ESLint rules](https://eslint.org/docs/rules/) go directly under `"rules"`.

```javascript
import pluginEpsVue from "eslint-plugin-epsvue";

export default [
  ...pluginEpsVue,
  {
    rules: {
      "no-console": 2,
    },
  },
];
```

### Prettier Rules

There are only 2 prettier rules included in my config - `singleQuote: true` and `endOfLine: 'auto'`.

If you want custom [prettier options](https://prettier.io/docs/en/options.html), it's recommended to create a `.prettierrc` file in your root directory like so:

```json
{
  "singleQuote": true,
  "endOfLine": "auto",
  "tabWidth": 4
}
```

You can also put this in your EsLint config as a rule like so:

```javascript
import pluginEpsVue from "eslint-plugin-epsvue";

export default [
  ...pluginEpsVue,
  {
    "rules": {
      ... any eslint rules here
      "no-console": 2,
      "prettier/prettier": [
       "error",
       {
         "singleQuote": true,
         "endOfLine": "auto",
         "tabWidth": 4
       },
     ],
    }
  }
];
```

## With VS Code

You should read this entire thing. Serious!

Once you have done one, or both, of the above installs. You probably want your editor to lint and fix for you. Here are the instructions for VS Code:

- install `eslint` abd `prettier` extensions
- If you use `vetur`, you need to do this to avoid some `eslint` issues
  Now we need to setup some VS Code settings via `Code/File` → `Preferences` → `Settings`. It's easier to enter these settings while editing the `settings.json` file, so click the Open (Open Settings) icon in the top right corner:
  Now we need to setup some VS Code settings via `Code/File` → `Preferences` → `Settings`. It's easier to enter these settings while editing the `settings.json` file, so click the Open (Open Settings) icon in the top right corner:

  add this :

  ```json
   "vetur.validation.template": false,
   "vetur.validation.script": false,
   "vetur.validation.style": false,
  ```

## With WSL

It should work as above.

## With JetBrains Products (IntelliJ IDEA, WebStorm, RubyMine, PyCharm, PhpStorm, etc)

If you have previously configured ESLint to run via a File Watcher, [turn that off.](https://www.jetbrains.com/help/idea/using-file-watchers.html#enableFileWatcher)

### If you choose Local / Per Project Install Above

1. Open ESLint configuration by going to File > Settings (Edit > Preferences on Mac) > Languages & Frameworks > Code Quality Tools > ESLint (optionally just search settings for "eslint")
2. Select **Automatic ESLint Configuration**
3. Check **Run eslint --fix on save**

### If you choose Global Install

The following steps are for a typical Node / ESLint global installtion. If you have a customized setup, refer to JetBrains docs for more [ESLint Configuration Options](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_manual_configuration).

1. Open ESLint configuration by going to File > Settings (Edit > Preferences on Mac) > Languages & Frameworks > Code Quality Tools > ESLint (optionally just search settings for "eslint")
2. Select **Manual ESLint configuration**
3. Choose your **Node interpreter** from the detected installations
4. Select the global **ESLint package** from the dropdown
5. Leave Configuration File as **Automatic Search**
6. Check **Run eslint --fix on save**

### Ensure the Prettier plugin is disabled if installed

1. Open Prettier configuration by going to File > Settings (Edit > Preferences on Mac) > Languages & Frameworks > Code Quality Tools > Prettier (optionally just search settings for "prettier")
2. Uncheck both **On code reformat** and **On save**
3. _Optional BUT IMPORTANT:_ If you have the Prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already.
   1. Make sure the **Run for files** glob does not include `js,ts,jsx,tsx`.
   2. An example glob for styles, config, and markdown. `{**/*,*}.{yml,css,sass,md}`

There is also a section on the documentation about [💻Editor integrations](https://eslint.vuejs.org/user-guide/#editor-integrations)

## Resources

- [eslint-plugin-vue rules](https://eslint.vuejs.org/rules/block-lang.html)
- [Vue Macros](https://vue-macros.dev/)
- [Migrate to v9.x](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [How to Install an npm Package Directly From GitHub](https://www.baeldung.com/ops/github-npm-package-direct-installation)
- [Eslint Share Configurations](https://eslint.org/docs/latest/extend/shareable-configs)
- [Cypress ESLint Plugin](https://github.com/cypress-io/eslint-plugin-cypress)
- [Key Differences between Configuration Formats](https://eslint.org/docs/latest/use/configure/migration-guide#key-differences-between-configuration-formats)

## For any reports

For any report, problems encountered, please report on this discussion [feedbacks](https://github.com/IT-WIBRC/eslint-config-epsvue/discussions/16).
