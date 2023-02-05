# eslint-config-epsvue

These are my settings for ESLint and Prettier that you can use for Vuejs app

You might like them - or you might not. Don't worry you can always change them.

## What it does

- Lints JavaScript and TypeScript based on the latest standards
- Fixes issues and formatting errors with Prettier
- Lints + Fixes inside of html script tags
- You can see all the [rules here](https://github.com/IT-WIBRC/eslint-config-epsvue/blob/master/.eslintrc.js). You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## Project install

It's recommended you install this once per every project. ESLint used to have global configs, but no longer.

1. Installation

```js
 npm install -D eslint-config-epsvue
```

2. Extend the configuration

create the `.eslintrc.*` file in the root of your project. after copy this in the file:

```js
 {
   extends: ["eslint-config-epsvue"]
 }
```

3. You can add two scripts to your package.json to lint and/or fix:

```json
 "scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
 },
```

6. Now you can manually lint your code by running `npm run lint` and fix all fixable issues with `npm run lint:fix`. You probably want your editor to do this though.

## Settings

If you'd like to overwrite eslint or prettier settings, you can add the rules in your `.eslintrc` file. The [ESLint rules](https://eslint.org/docs/rules/) go directly under `"rules"`.

```json
{
  "extends": ["eslint-config-epsvue"],
  "rules": {
    "no-console": 2
  }
}
```

### Prettier Rules

There are only 2 prettier rules included in my config - `singleQuote: true` and `endOfLine: 'auto'`.

If you want custom [prettier options](https://prettier.io/docs/en/options.html), it's recommended to create a `.prettierrc` file in your root directory like so:

```js
 {
   "singleQuote": true,
   "endOfLine": "auto",
   "tabWidth": 4
 }
```

You can also put this in your EsLint config as a rule like so:

```js
 {
   "extends": ["eslint-config-epsvue"],
   "rules": {
     ... any eslint rules here
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
```

Note if you are switching to double quotes, you'll also need to add this eslint rule, or they will fight to the death!

   ```js
    quotes: ["error", "double"];
   ```

### Stylelint

   create a `.stylelintrc` file and copy the rules in the rules in this repository in the file `.stylelintrc` into you project. And the script

   ```json
   "scripts": {
     "stylelint": "stylelint '**/*.css'",
   }
   ```

## With VS Code

   You should read this entire thing. Serious!

Once you have done one, or both, of the above installs. You probably want your editor to lint and fix for you. Here are the instructions for VS Code:

- install `eslint` abd `prettier` extensions
- If you use `vetur`, you need to do this to avoid some `eslint` issues
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
1. Select **Automatic ESLint Configuration**
1. Check **Run eslint --fix on save**

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
