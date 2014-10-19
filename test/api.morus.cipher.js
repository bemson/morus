describe( 'Morus#cipher()', function () {

  var inst;

  beforeEach(function () {
    inst = new Morus();
  });

  it('should be an instance method', function () {
    Morus.should.respondTo('cipher');
  });

  it('should return a value when called without arguments', function () {
    expect(inst.cipher()).to.not.be.undefined;
  });

  it('should return true when passed the output from another instance', function () {
    inst.cipher(new Morus().cipher()).should.be.true;
  });

  it('should return false when passed anything else', function () {
    [0, 1, -1, true, false, undefined, null, function () {}, '', 'foo', {}, []].forEach(
      function (val) {
        expect(inst.cipher(val)).to.be.false;
      }
    );
  });

});