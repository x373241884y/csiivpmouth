/**
 * Created by toor on 17-4-3.
 */
var encdes = require('../lib/encrypt');
var assert = require('assert');
describe('encrypt', function () {
    var des_string = '51055856CCA89AC8EF252BBE35642C1BF57E5EB8ADBA0BF2D60464EC70DC6D727EC' +
        'C72B5B361FA32DCCAA345EA2DCF7076E72C7433239B1406971DBBA626F4F2835756749230' +
        '922FDF8B57D2E6A90B7759450B9B714EF814DA022C2BD4249D5A2472F8' +
        '78F439F3E331A44B5906BA1D2A08066A34B3DA1764FF0E9D2932' +
        '1F9D80A52830ED612243047520E6BC635C7BF5B4AAC0D72D72C93092A83E1' +
        '2490CD167914A82C8DBFBFE9F980E14A243426D538147E5C93514D0C80486740FE6FBEC4FF' +
        'AEF2A18F07A0DC9C05C210ADEB7C64064E8AE21D23F52ED23D04062D60590172C6255612A' +
        '97E0BEF3104AB911E47B3556576325949C36E434166707701141BC';
    var data = {
        intervalStart: '2017-02-01',
        intervalEnd: '2017-02-28',
        ChannelId: 'VPPC',
        sysDate: '2017-04-03',
        Random: 0.9582496485469447
    };
    it('should return a json string', function () {
        assert.equal(encdes.deString(des_string), JSON.stringify(data));
    });
    it('should return a encrypt string', function () {
        assert(encdes.encString(JSON.stringify(data)), des_string);
    });
});