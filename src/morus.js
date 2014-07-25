/*!
 * Morus v0.0.0
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
      mathRandom = Math.random,
      mathRound = Math.round,
      codeAffix = 'c',
      r_printables = /[ -~]/g;

    // build ASCII character maps
    !function () {
      var
        ln = 95,
        code,
        char;

      while (ln--) {
        code = ln + 32;
        char = String.fromCharCode(code);

        ASCII_MAP[code + codeAffix] =
        ASCII_CHARS[ln] =
          char;
        ASCII_MAP[char] = code;
      }
      ASCII_STRING = ASCII_CHARS.join('');
    }();


    // generate substitution table
    function genCipher() {
      var
        cipher = {},
        chars = ASCII_CHARS.concat(),
        char,
        code,
        idx,
        ln = 95;

      while (ln--) {
        idx = mathRound(mathRandom() * ln);
        code = ln + 32;
        char = chars[idx];
        cipher[code + codeAffix] = char;
        cipher[char] = code;
        chars.splice(idx, 1);
      }
      return cipher;
    }

    function Morus (shift, map) {
      var me = this;

      if (arguments.length) {
        me.shift = ~~shift;
        // only accept objects
        if (map && typeof map === 'object') {
          me.map = map;
        } else {
          me.map = genCipher();
        }
      } else {
        me.randomize();
      }
    }

    // obfuscate text
    Morus.prototype.encode = function (str) {
      var
        me = this,
        map = me.map,
        pos = me.shift,
        code;

      return str.replace(r_printables, function (char) {

        code = ASCII_MAP[char];
        code -= 32 - pos;
        code %= 95;
        code += 32;

        pos++;
        return map[code + codeAffix];
      });
    };

    // defuscate text
    Morus.prototype.decode = function (str) {
      var
        me = this,
        map = me.map,
        pos = me.shift,
        code;

      return str.replace(r_printables, function (char) {

        code = map[char];
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
      me.map = genCipher();
      me.shift = mathRound(mathRandom() * 95);
      return me;
    };

    // expose statics
    Morus.genCipher = genCipher;
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