# Morus

**A progressive substitution cipher**

by Bemi Faison

[![Build Status](https://travis-ci.org/bemson/morus.png?branch=master)](https://travis-ci.org/bemson/morus)


## Description

Morus is a JavaScript library that uses a random substitution table (or cipher) along with a progressive index, to obfuscate text. The "progressive" part involves shifting the true substitution index by one, per character, in a string. Thus, while Morus is _not_ encryption the encoded output is designed to degrade [frequency analysis](http://en.wikipedia.org/wiki/Frequency_analysis).

### Why client-side text obfuscation?

Generally, there is no good reason for client-side obfuscation... So, for all the bad reasons, Morus was designed to be lightweight and effective.

## Usage

Simply initialize a Morus instance, then encode and decode text.

```js
var
  cipher = new Morus(),
  phrase = 'Hello world!',
  coded = cipher.encode(phrase);

console.log('original:', phrase);
// original: Hello world!

console.log('encoded:', coded, '(output will vary)');
// encoded: W1af)L@3VgaC (output will vary)

console.log('decoded:', cipher.decode(coded));
// decoded: Hello world!
```

### Copy the cipher

Each Morus instance has a unique "cipher" for translating strings. Morus ciphers consist of a _key_ (i.e., substitution-table) and _index_, stored in properties of the same name.

To _share_ a cipher, simply copy these properties between instances. To _clone_ a cipher use the `cipher()` method; it accepts and returns a (more) portable version of these properties. Either approach results in Morus instances that translate strings in the same manner.

Below demonstrates sharing and cloning a cipher between Morus instances, and how the encoded output is the same between all three.

```
var
  instA = new Morus(),
  instB = new Morus(),
  instC = new Morus();

// copy/reference the cipher properties
instB.key = instA.key;
instB.index = instA.index;

// use the cipher method
instC.cipher(instB.cipher());

// encode the string the same way using different instances
console.log(instA.encode('obfuscate me'));
console.log(instB.encode('obfuscate me'));
console.log(instC.encode('obfuscate me'));
```


## Download and Installation

Morus has no dependencies, works within modern JavaScript environments,
and is available on [bower](http://bower.io/search/?q=morus), [component](http://component.github.io/component.io), and [npm](https://www.npmjs.org/package/morus) as a [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) ([Node](http://nodejs.org/)) or [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) ([RequireJS](http://requirejs.org)) module.

If Morus isn't compatible with your favorite runtime, please file an issue or pull-request (preferred).

### Web Browsers

Use a `<SCRIPT>` tag to load the _morus.min.js_ file in your web page. Doing so, adds `Morus` to the global scope.

```html
  <script type="text/javascript" src="path/to/morus.min.js"></script>
  <script type="text/javascript">
    // ... Morus dependent code ...
  </script>
```

**Note:** The minified file was compressed by [Closure Compiler](http://closure-compiler.appspot.com/).

### Node.js

  * `npm install morus`
  * `component install bemson/morus`
  * `bower install morus`

### AMD

Assuming you have a [require.js](http://requirejs.org/) compatible loader, configure an alias for the morus module (the term "morus" is recommended, for consistency). The _morus_ module exports a constructor function, not a module namespace.

```js
require.config({
  paths: {
    morus: 'my/libs/morus'
  }
});
```

Then require and use the module in your application code:

```js
require(['morus'], function (Morus) {
  // ... Morus dependent code ...
});
```


## Testing

Morus has unit tests written for [Mocha](http://mochajs.org/), using [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org) (via the [Sinon-chai](http://chaijs.com/plugins/sinon-chai) plugin).

  * To review test results, visit [Morus on Travis-CI](https://travis-ci.org/bemson/morus).
  * To run the tests in Node, run `npm test`.
  * To run the tests in a browser, load _test/index.html_ locally. (Unfortunately, the test will not run in IE6, 7, or 8.)


## License

Morus is available under the terms of the [MIT-License](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright 2014, Bemi Faison
