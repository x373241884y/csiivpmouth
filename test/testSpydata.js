/**
 * Created by toor on 17-4-3.
 */
var spy = require('../lib/spydata');
var options = {
    username: 'xuxihai@gmail.com',
    password: 'test2015',
    year: '2017',
    month: '01'
};
describe('spider data from vp system', function () {

    it('login system', function (done) {
        var spyinstance = spy(options);
        spyinstance.login().then(function (result) {
            if (result && result.UserName) {
                console.log('login success');
                return spyinstance.calendarQuery();
            } else {
                throw Error('login error');
            }
        }).then(function (data) {
            if (data && data.length) {
                console.log('get data of month ' + options.year + '-' + options.month);
                console.log(data);
            } else {
                throw Error('query error');
                done();
            }
        });
    });
});