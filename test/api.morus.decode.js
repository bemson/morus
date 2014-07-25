describe( 'Morus#decode()', function () {

  var cipher;

  beforeEach(function () {
    cipher = new Morus();
  });

  it('should be an instance method', function () {
    Morus.should.respondTo('decode');
  });

  it('should throw when not passed a string', function () {
    expect(function () {
      cipher.encode();
    }).to.throw(Error);
  });

  it('should return a decoded string, matching the original length', function () {
    var
      str = 'foo',
      ln = str.length,
      coded = cipher.decode(str);

    coded.should.be.a('string');
    coded.should.have.lengthOf(ln);
  });

  it('should decode an ecrypted string', function () {
    [
      'foo',
      'nonesense',
      'hello world',
      'The quick brown fox jumps over the white fence.',
      '"@#Ffslk *&""'
    ].forEach(function (str) {
      var coded = cipher.encode(str);
      coded.should.not.equal(str);
      cipher.decode(coded).should.equal(str);
    });
  });

  it('should decode all printable characters', function () {
    var
      chars = Morus.ASCII.split(''),
      ln = 100,
      passed = 0;

    // must pass once out of a 100 times
    while (ln--) {
      cipher = new Morus();
      if (
        chars.every(function (char) {
          return cipher.decode(cipher.encode(char)) === char;
        })
      ) {
        passed = 1;
        break;
      }
    }

    passed.should.be.ok;
  });

  it('should pass-thru characters not in ::ASCII', function () {
    var
      nonASCII = 'é',
      randomASCII = Morus.ASCII.charAt(
        Math.round(Math.random() * Morus.ASCII.length)
      );

    Morus.ASCII.should.not.contain(nonASCII);
    Morus.ASCII.should.contain(randomASCII);

    cipher.decode(randomASCII).should.not.equal(randomASCII);
    cipher.decode(nonASCII).should.equal(nonASCII);
  });

});