/**
 * Created by toor on 17-4-4.
 */
var sender = require('../lib/sendemail');
var options = {
    username: 'xuxihai@gmail.com',
    password: 'test2015',
    emailpwd: 'xxxx' //password
};
describe('send email', function () {
    it('should be success', function (done) {
        sender({
            email: options.username,
            emailpwd: options.emailpwd,
            from: options.username,
            to: 'xuxihai@gmail.com',
            UserName: '徐习海',
            file: '/home/toor/oschina/vpmouth/temp/VX团队17年月报-徐习海.xlsx'
        }).then(function (result) {
            done();
        }, function (error) {
            console.log(error);
        });
    });
});