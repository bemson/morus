describe('Encoding', function () {

  var
    phrase = 'The quick brown fox jumps over the lazy dog.',
    cipher;

  beforeEach(function () {
    cipher = new Morus();
  });

  it('should be unique per instance', function () {
    var
      outputs = [],
      output,
      ln = 100;

    // ensure all 5 instances have different outputs
    while (ln--) {
      cipher = new Morus();
      output = cipher.encode(phrase);
      outputs.should.not.contain(output);
      outputs.push(output);
    }

  });

  it('should be unique after calling #randomize()', function () {
    var
      outputs = [],
      output,
      ln = 100;

    // ensure all 5 instances have different outputs
    while (ln--) {
      cipher.randomize();
      output = cipher.encode(phrase);
      outputs.should.not.contain(output);
      outputs.push(output);
    }

  });

  it('should be unique after changing .index', function () {
    var
      outputs = [],
      output,
      ln = 94;

    // ensure all 5 instances have different outputs
    while (ln--) {
      cipher.index++;
      output = cipher.encode(phrase);
      outputs.should.not.contain(output);
      outputs.push(output);
    }

  });

  it('should not be unique when .index is incremented by 95', function () {
    var output = cipher.encode(phrase);

    cipher.index += 95;
    cipher.encode(phrase).should.equal(output);
  });

  it('should work on already encoded text', function () {
    cipher.decode(cipher.decode(
      // double-encryption
      cipher.encode(cipher.encode(phrase))
    )).should.equal(phrase);
  });

  it('should not expose original text after multiple encodings', function () {
    var
      ln = 100,
      coded = phrase;

    while (ln--) {
      coded = cipher.encode(coded);
      coded.should.not.equal(phrase);
    }

  });

});