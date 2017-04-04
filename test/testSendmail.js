/**
 * Created by toor on 17-4-4.
 */
var sender = require('../lib/sendemail');
var options = {
	username: 'xuxihai@csii.com.cn',
	password: 'csii2015',
	emailpwd: 'moming373241884'
};

sender({
	email:options.username,
	emailpwd:options.emailpwd,
	from:options.username,
	to:'xuxihai@csii.com.cn',
	UserName:'徐习海1',
	file:'/home/toor/oschina/csiivpmouth/temp/VX团队2017年月报-徐习海.xlsx'
}).then(function (result) {
	console.log(result);
},function (error) {
	console.log(error);
});