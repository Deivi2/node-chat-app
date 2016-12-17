var expect = require('expect');
var {generateMessage} = require('./message.js');
var {generateLocationMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct mesage object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        })
    })
});

describe('generate location message', () => {
    it('shoukd generate correct location object', () => {
        var from = 'Admin';
        var latitude = 1;
        var longitude = 1;
        var url =`https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        })
    })
});