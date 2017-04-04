/**
 * Created by toor on 17-4-3.
 */
var spy = require('../lib/spydata');
var options = {
	username: 'xuxihai@csii.com.cn',
	password: 'csii2015',
	yearMonth: '201702'
};
var spyinstance = spy(options);
spyinstance.login().then(function (result) {
	console.log('login success');
	console.log(result);
	return spyinstance.calendarQuery();
}).then(function (data) {
	console.log('get data of month '+options.yearMonth);
});