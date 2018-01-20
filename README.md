# escape

A simple library for escaping specical characters in strings for HTML, CSS, RegExp, String, URL.

## Start

Installing the package with `npm`.

```js
$ npm i @lvchengbin/escape --save
```

To use the package in nodejs code.

```js
const escape = require( '@lvchengbin/escape' );
```

If you want to use the package as a ES6 module, you can import it like this:

```js
import escape from '@lvchengbin/escape';
```

Sometimes, maybe you don't want to pack all the code in the library into your project with some bundle toolkits such as rollup, you can import the function that you want to import separately.

```js
import escapeHTML from '@lvchengbin/escape/src/html';
import escapeCSS from '@lvchengbin/escape/src/css';
import escapeRegExp from '@lvchengbin/escape/src/regexp';
import escapeString from '@lvchengbin/escape/src/string';
import escapeURL from '@lvchengbin/escape/src/url';
```

We also provide files for using in browsers with `<script>` tag, you can get it here [escape.js](https://raw.githubusercontent.com/LvChengbin/escape/master/dist/escape.js), and if you want to use it in browsers not supporting ES5 syntax, please use [escape.bc.js](https://raw.githubusercontent.com/LvChengbin/escape/master/dist/escape.bc.js).

```html
<script src="https://raw.githubusercontent.com/LvChengbin/escape/master/dist/escape.js"></script>
```

```html
<script src="https://raw.githubusercontent.com/LvChengbin/escape/master/dist/escape.bc.js"></script>
```

## Usage

```js
import escape from '@lvchengbin/escape';

// escape html special chars
escape.html( '<p>content</p>' );

// escape css special chars
// https://drafts.csswg.org/cssom/#common-serializing-idioms
escape.css( '@#.abc' );

// escape regex special chars
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
escape.regexp( '[abc]' );

// escape special chars in string
escape.string( '"\n\r\'' );

// escape URL
escape.url( 'http://xxx.xxx' );
```
