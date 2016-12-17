var expect = require('expect');


// import is real string


var {isRealString} = require('./valadation');


describe('isRealString', ()=> {

   it('Should reject non-string values', () => {
      var res = isRealString(98);
       expect(res).toBe(false);
   });
    it('should reject spaces', ()=> {
        var res = isRealString('         ');
        expect(res).toBe(false);
    });
    it('should allow string with non space characters', ()=> {
        var res = isRealString('  Deivis  ');
        expect(res).toBe(true);
    });
});