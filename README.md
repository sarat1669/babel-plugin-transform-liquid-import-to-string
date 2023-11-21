# babel-plugin-transform-liquid-import-to-string
[![Build Status](https://travis-ci.com/yeiniel/babel-plugin-transform-liquid-import-to-string.svg?branch=master)](https://travis-ci.com/yeiniel/babel-plugin-transform-liquid-import-to-string)

Turn liquid imports (and export from) into strings.

## Example

Given the following _example.liquid_.

```liquid
<h1>Hello {{ user.name }}</h1>
```

#### in

```js
import liquid from './example.liquid';
```

#### out

```js
const liquid = '<h1>Hello {{ user.name }}</h1>';
```

and if using export

#### in

```js
export * as liquid from './example.liquid';
```

#### out

```js
const liquid = "<h1>Hello {{ user.name }}</h1>";
export { liquid };
```


## Installation

```sh
$ npm install babel-plugin-transform-liquid-import-to-string
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-liquid-import-to-string"]
}
```

### Via CLI

```sh
$ babel --plugins transform-liquid-import-to-string script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-liquid-import-to-string"]
});
```
