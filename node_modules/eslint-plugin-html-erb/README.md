# eslint-plugin-html-erb

Ignore Rails code in ERB template in order to avoid fatal errors like this one:

```
Parsing error: Unexpected token %= (Fatal)
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-html-erb`:

```
$ npm install eslint-plugin-html-erb --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-html-erb` globally.

## Usage

Add `html-erb` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "html-erb"
  ]
}
```
