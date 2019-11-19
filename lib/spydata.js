/**
 * Created by toor on 17-4-1.
 */
var vpinfo = {
	protocol: "http",
	host: "vp.gmail.com",
	ChannelId: "VPPC",
	login: "timesheet/login.json",
	calendarQuery: "timesheet/calendarQuery.json"
};

var common = {
	method: 'POST',
	jar: true,
	json: true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	}
};
var rp = require('request-promise');
var vpDesEncrypt = require('./encrypt');
var moment = require('moment');
/**
 *
 * @param config(username,password,yearMonth)
 *username:loginemail,
 * password:xxx
 * yearMonth:'2017-03'
 * @returns {{login: login, calendarQuery: calendarQuery}}
 */
module.exports = function (config) {
	var userinfo = {
		"loginid": config.username,
		"password": config.password,
		"sysDate": moment().format('YYYY-MM-DD'),
		"Random": Math.random()
	};
	var year = config.year;
	var month = config.month;
	var firstStr = year + '-' + month + '-01';
	var lastDay = moment(firstStr).endOf('month');
	var queryObj = {
		"intervalStart": firstStr,
		"intervalEnd": lastDay.format('YYYY-MM-DD'),
		"sysDate": moment().format('YYYY-MM-DD'),
		"Random": Math.random()
	};
	return {
		login: function () {
			var option1 = Object.create(common);

			option1.uri = vpinfo.protocol + '://' + vpinfo.host + '/' + vpinfo.login;
			option1.form = {
				ChannelId: vpinfo.ChannelId,
				DATA: vpDesEncrypt.encString(JSON.stringify(userinfo))
			};
			return rp(option1);
		},
		calendarQuery: function () {
			var option2 = Object.create(common);
			option2.uri = vpinfo.protocol + '://' + vpinfo.host + '/' + vpinfo.calendarQuery;
			option2.form = {
				ChannelId: vpinfo.ChannelId,
				DATA: vpDesEncrypt.encString(JSON.stringify(queryObj))
			};
			return rp(option2);
		}
	}
};