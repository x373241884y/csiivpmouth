/**
 * Created by toor on 17-4-1.
 */
var vpinfo={
	protocol:"http",
	host:"vp.csii.com.cn",
	ChannelId:"VPPC",
	login:"timesheet/login.json",
	calendarQuery:"timesheet/calendarQuery.json"
};

var common={
	method: 'POST',
	jar: true,
	json:true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	}
};
var rp = require('request-promise');
var vpDesEncrypt = require('./encrypt');

module.exports= function (config) {
	var userinfo = {
		"loginid": "xuxihai@csii.com.cn",
		"password": "csii2015",
		"ChannelId": "VPPC",
		"sysDate": "2017-04-01",
		"Random": Math.random()
	};
	var queryObj = {
		"intervalStart": "2017-03-01",
		"intervalEnd": "2017-03-31",
		"ChannelId": "VPPC",
		"sysDate": "2017-04-01",
		"Random": Math.random()
	};
	return {
		login:function () {
			var option1 = Object.create(common);

			option1.uri = vpinfo.protocol+'://'+vpinfo.host+'/'+vpinfo.login;
			option1.form = {
				ChannelId: 'VPPC',
				DATA: vpDesEncrypt.encString(JSON.stringify(userinfo))
			};
			return rp(option1);
		},
		calendarQuery:function () {
			var option2 = Object.create(common);
			option2.uri = vpinfo.protocol+'://'+vpinfo.host+'/'+vpinfo.calendarQuery;;
			option2.form = {
				ChannelId: 'VPPC',
				DATA: vpDesEncrypt.encString(JSON.stringify(queryObj))
			};
			return rp(option2);
		}
	}
};