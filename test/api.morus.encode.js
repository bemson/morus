describe( 'Morus#encode()', function () {

  var cipher;

  beforeEach(function () {
    cipher = new Morus();
  });

  it('should be an instance method', function () {
    Morus.should.respondTo('encode');
  });

  it('should throw when not passed a string', function () {
    expect(function () {
      cipher.encode();
    }).to.throw(Error);
  });

  it('should return a coded string, matching the original length', function () {
    var
      str = 'foo',
      ln = str.length,
      coded = cipher.encode(str);

    coded.should.be.a('string');
    coded.should.have.lengthOf(ln);
    coded.should.not.equal(str);
  });

  it('should encode all printable characters', function () {
    var
      chars = Morus.ASCII.split(''),
      ln = 100,
      passed = 0;

    // must pass once out of a 100 times
    while (ln--) {
      cipher = new Morus();
      if (
        chars.every(function (char) {
          return cipher.encode(char) !== char;
        })
      ) {
        passed = 1;
        break;
      }
    }

    passed.should.be.ok;
  });

  it('should encode the same character differently', function () {
    var
      ln = 100,
      pair = 'abcda',
      lastIdx = pair.length - 1,
      codedPair,
      passed = 0;

    pair.charAt(0).should.equal(pair.charAt(lastIdx));

    // one in a hundred attempts should pass
    while (ln--) {
      cipher = new Morus();
      codedPair = cipher.encode(pair);
      codedPair.should.not.equal(pair);
      if (codedPair.charAt(0) !== codedPair.charAt(lastIdx)) {
        passed = 1;
        break;
      }
    }

    passed.should.be.ok;
  });

});