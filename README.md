# Morus

**A progressive substitution cipher**

by Bemi Faison

[![Build Status](https://travis-ci.org/bemson/morus.png?branch=master)](https://travis-ci.org/bemson/morus)


## Description

Morus is a JavaScript library that uses a random substitution table (or cipher) along with a progressive index, to obfuscate text. The "progressive" part involves shifting the true substitution index by one, per character, in a string. Thus, while Morus is _not_ encryption the output is designed to reduce any decipheral character usage patterns.

### Why client-side text obfuscation?

Morus is a small effort in a larger project that necessitated secure [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) communications. While _sent_ messages are "private" (between the sending routine and recieving window), _received_ messages are "public" (any one can listen in).

Generally, there is no good reason for client-side obfuscation... So for all the bad reasons, Morus was designed to be lightweight and effective.


## Usage

Simply initialize a Morus instance, then encode and decode text (using the same-named methods).

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

### Cloning the cipher and initial index

Each Morus instance has a random substitution-table and initial index, via `.map` and `.shift` properties, respectively. These properties may be (1) passed to new instances, and/or (2) copied directly, between instances. Below demonstrates both ways which ensure multiple Morus instances encode and decode text in the same manner.

```
var
  cipherA = new Morus(),
  // (1) pass properties to the constructor
  cipherB = new Morus(cipherA.shift, cipherA.map),
  cipherC = new Morus();

// (2) directly copy properties between instances
cipherC.map = cipherB.map;
cipherC.shift = cipherB.shift;


console.log(cipherA.encode('obfuscate me'));
console.log(cipherB.encode('obfuscate me'));
console.log(cipherC.encode('obfuscate me'));
// outputs the same (encoded) string three times
```


## Download and Installation

Morus has no dependencies, works within modern JavaScript environments,
and is available on [bower](http://bower.io/search/?q=morus), [component](), and [npm](https://www.npmjs.org/package/morus) as a [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) ([Node](http://nodejs.org/)) or [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) ([RequireJS](http://requirejs.org)) module.

If Morus isn't compatible with your favorite runtime, please file a bug or pull-request (preferred).

### Web Browsers

Use a `<SCRIPT>` tag to load the _morus.min.js_ file in your web page. Doing so, adds `Morus` to the global scope.

```html
  <script type="text/javascript" src="path/to/morus.min.js"></script>
  <script type="text/javascript">
    // ... Morus dependent code ...
  </script>
```

### Node.js

  * `npm install morus` if you're using [npm](http://npmjs.org/)
  * `component install bemson/morus` if you're using [component](https://github.com/component/component)
  * `bower install morus` if you're using [Bower](http://bower.io)

### AMD

Assuming you have a [require.js](http://requirejs.org/) compatible loader, configure an alias for the morus module (the alias "morus" is recommended, for consistency). The _morus_ module exports a `Morus` constructor, not a module namespace.

```js
require.config({
  paths: {
    morus: 'libs/morus'
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

Morus has unit tests written with [Mocha](http://visionmedia.github.io/mocha), using [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org) (via the [Sinon-chai](http://chaijs.com/plugins/sinon-chai) plugin).

  * To browse test results, visit [Morus on Travis-CI](https://travis-ci.org/bemson/morus).
  * To run the tests in Node, install the module or clone the git repo, then invoke `npm test`
  * To run the tests in a browser: (1) install morus, then (2) load _test/index.html_ locally. (Unfortunately, the tests do not run in IE6, 7, or 8.)


## License

Morus is available under the terms of the [MIT-License](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright 2014, Bemi Faison
