/**
 * Created by toor on 17-4-3.
 */
var fs = require('fs');
var path = require('path');
var genxlsx = require('../lib/generateXlsx');
describe('genterate xlsx', function () {
    it('should save data to file', function (done) {
        var handle = genxlsx({
            year: 2017,
            filename: '/tmp/xuxihai123.xlsx',
            force: true
        });
        handle.createXlsx().then(function (result) {
            var data = fs.readFileSync(path.resolve(__dirname,'pulldata.json'));
            var vparray = JSON.parse(data.toString());
            handle.saveData(vparray).then(function () {
                done();
            });
        });
    });
});


