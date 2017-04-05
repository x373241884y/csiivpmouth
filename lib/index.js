var spydata = require('./spydata');
var generateXlsx = require('./generateXlsx');
var moment = require('moment');
var path = require('path');
var utils = require('./utils');
var sender = require('../lib/sendemail');
module.exports = function (config) {
	var yearMonth = config.yearmonth || moment().subtract(1, 'months').format('YYYY-MM');
	if (!/^(\d{4})[-\/]?(0?[1-9]|[0-1][0-2])$/.test(yearMonth)) {
		throw new Error('config of attr yearmonth must be like 201709,2017-09,2017/09$');
	}
	config.year = RegExp.$1;
	config.month = RegExp.$2;

	var spider = spydata(config);
	utils.log('starting login for user:' + config.username);
	spider.login().then(function (result) { //login
		utils.log('login success,you name is :' + result.UserName);
		config.UserName = result.UserName;
		config.filename = path.resolve(__dirname, '../temp', 'VX团队' + config.year + '年月报-' + result.UserName + '.xlsx');
		utils.log('starting query for year-month:' + yearMonth);
		return spider.calendarQuery(); //query info
	}).then(function (data) {
		utils.log('query data success of month ' + yearMonth);
		var operate = generateXlsx(config);

		utils.log('creating xlsx  ' + config.filename);
		operate.createXlsx().then(function () {
			setTimeout(function () {
				operate.saveData(data).then(function () {
					utils.log('save data ok,please check file is valid?:' + config.filename);
					if (config.send) { //send email
						sender({
							email: config.username,
							emailpwd: config.emailpwd,
							to: config.emailto||'liushanshan@csii.com.cn',
							UserName: config.UserName,
							file: config.filename
						}).then(function (result) {
							utils.log('exec command success!!');
						}, function (error) {
							console.log(error);
						});
					} else {
						utils.log('exec command success!!');
					}
				}, function (error) {
					utils.error('save data failed!');
				})
			}, 1000);
		},function (error) {
			utils.error(error);
		});
	});
};