# wibrc-eslint-config-vue
An eslint shareable configuration for Vuejs app
## 1. Install since github as dev dependency

- http
```
  npm install -D git+https://github.com/IT-WIBRC/wibrc-eslint-config-vue.git
```

- ssh
```
npm install -D git+ssh://git@github.com:IT-WIBRC/wibrc-eslint-config-vue.git
```

other
```
npm install -D repository-name
```

for a specific branch
```
  npm install -D repository#branch
```

## 2. Extend the configuration
create the `.eslintrc` file in the root of your project. after copy this in the file:
```
{
  extends: "@wibrc/eslint-config-vue"
}
```