/*!
 * Morus v1.0.0
 * http://github.com/bemson/morus/
 *
 * Copyright, Bemi Faison
 * Released under the MIT License
 */
/* global define, module */
!function (inAMD, inCJS, scope, undefined) {

  // dependent module initializer
  function initMorus() {
    var
      ASCII_MAP = {},
      ASCII_CHARS = [],
      ASCII_STRING,
      JSONstringify = JSON.stringify,
      JSONparse = JSON.parse,
      mathRandom = Math.random,
      mathRound = Math.round,
      protoHas = Object.prototype.hasOwnProperty,
      codeAffix = 'c',
      r_printables = /[ -~]/g,
      r_cipher = /^(\d+)({.+})$/
    ;

    // build ASCII character maps
    !function () {
      var
        ln = 95,
        code,
        character;

      while (ln--) {
        code = ln + 32;
        character = String.fromCharCode(code);

        ASCII_MAP[code + codeAffix] =
        ASCII_CHARS[ln] =
          character;
        ASCII_MAP[character] = code;
      }
      ASCII_STRING = ASCII_CHARS.join('');
    }();


    // generate substitution table
    function genKey() {
      var
        cipher = {},
        chars = ASCII_CHARS.concat(),
        character,
        code,
        idx,
        ln = 95;

      while (ln--) {
        idx = mathRound(mathRandom() * ln);
        code = ln + 32;
        character = chars[idx];
        cipher[code + codeAffix] = character;
        cipher[character] = code;
        chars.splice(idx, 1);
      }
      return cipher;
    }

    function Morus () {
      // generate random index and key
      this.randomize();
    }

    // obfuscate text
    Morus.prototype.encode = function (str) {
      var
        me = this,
        key = me.key,
        pos = me.index,
        code;

      return str.replace(r_printables, function (character) {

        code = ASCII_MAP[character];
        code -= 32 - pos;
        code %= 95;
        code += 32;

        pos++;
        return key[code + codeAffix];
      });
    };

    // defuscate text
    Morus.prototype.decode = function (str) {
      var
        me = this,
        key = me.key,
        pos = me.index,
        code;

      return str.replace(r_printables, function (character) {

        code = key[character];
        code -= 32 + pos;
        if (code < 0) {
          code %= 95;
          if (code) {
            code = 95 + code;
          }
        }
        code += 32;

        pos++;
        return ASCII_MAP[code + codeAffix];
      });
    };

    // generate random properties
    Morus.prototype.randomize = function () {
      var me = this;
      me.key = genKey();
      me.index = mathRound(mathRandom() * 95);
      return me;
    };

    // set or get given key/index
    Morus.prototype.cipher = function (val) {
      var
        me = this,
        parts;

      if (arguments.length) {
        // setter
        if (
          typeof val == 'string' &&
          (parts = r_cipher.exec(val))
        ) {
          me.index = +parts[1];
          me.key = JSONparse(parts[2]);
          return true;
        }
        return false;
      } else {
        // getter
        return me.index + JSONstringify(me.key);
      }
    };

    // expose statics
    Morus.genKey = genKey;
    Morus.ASCII = ASCII_STRING;

    return Morus;
  }

  // initialize and expose module, based on the environment
  if (inAMD) {
    define(initMorus);
  } else if (inCJS) {
    module.exports = initMorus();
  } else if (!scope.Morus) {
    scope.Morus = initMorus();
  }
}(
  typeof define == 'function',
  typeof exports != 'undefined',
  this
);