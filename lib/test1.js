/**
 * Created by toor on 17-4-1.
 */
var spydier = require('./spydata')({});

spydier.login().then(function (data) {
	if(data&&data.errcode==="0"){
		console.log('登录成功!');
		return spydier.calendarQuery()
	}else{
		throw new Error('登录失败!');
	}
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.log(error);
});