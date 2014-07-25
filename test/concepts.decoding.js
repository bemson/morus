describe('Decoding', function () {
  
  var
    phrase = 'The quick brown fox jumps over the lazy dog.',
    coded,
    cipher;

  beforeEach(function () {
    cipher = new Morus();
    coded = cipher.encode(phrase);
  });

  it('should reveal original value from encoded text', function () {
    cipher.decode(coded).should.equal(phrase);
  });

  it('should not work with previous encodes when .shift changes', function () {
    cipher.shift++;
    cipher.decode(coded).should.not.equal(phrase);
  });

  it('should not work with previous encodes when .map changes', function () {
    cipher.map = Morus.genCipher();
    cipher.decode(coded).should.not.equal(phrase);
  });

  it('should not work with previous encodes after calling #randomize()', function () {
    cipher.randomize();
    cipher.decode(coded).should.not.equal(phrase);
  });

  it('should undo any number of encodings', function () {
    var
      ln = 100,
      coded = phrase;

    while (ln--) {
      coded = cipher.encode(coded);
    }

    coded.should.not.equal(phrase);

    ln = 100;
    while (ln--) {
      coded = cipher.decode(coded);
    }

    coded.should.equal(phrase);
  });

});