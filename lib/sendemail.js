/**
 * Created by toor on 17-4-2.
 */
var email = require("emailjs");
var Promise = require('bluebird');
var path = require('path');
var utils = require('./utils');
var emailHost = "smtp.263.net";
var message = {
	text: "" +
	"您好!\n" +
	"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月报见附件!\n\n"
};
/**
 * @param config
 * attr:
 *      email:required,
 *      emailpwd:required,
 *      from:
 *      to:required,
 *      UserName:required,
 *      file:required
 */
module.exports = function (config) {

	return new Promise(function (resolve, reject) {
		if(!config.email){
			return reject('email is required!');
		}
		if(!config.emailpwd){
			return reject('emailpwd is required!');
		}
		if (!config.to) {
			return reject('to is required!');
		}
		if (!config.UserName) {
			return reject('UserName is required!');
		}
		if (!config.file) {
			return reject('file is required!');
		}
		utils.log('connecting server ' + emailHost);
		var server = email.server.connect({
			user: config.email,
			password: config.emailpwd,
			host: emailHost,
			timeout:10000
			// ssl: true
		});
		if (!server) {
			return reject('failed to connect server ' + emailHost);
		}
		message.from = config.from || config.email;
		message.to = config.to;
		var file = config.file; //xlsx path
		var UserName = config.UserName; //
		message.subject = UserName + "的月报";
		message.attachment = [
			{
				path: file,
				name: path.basename(file)
			}
		];
		utils.log('sending email from user ' + config.email);
		utils.log('email body:'+JSON.stringify(message,null,4));
		server.send(message, function (err, message) {
			if (err) {
				reject(err);
			} else {
				utils.log('success send email to user ' + config.to);
				resolve(message);
			}
		});
	});
};