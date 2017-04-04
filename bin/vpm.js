/**
 * Created by toor on 17-4-4.
 */
var program = require('commander');
var fs = require('fs');
var path = require('path');
var main = require('../lib');
program.version('0.0.1')
	.usage('[options] <file> [yearmonth]')
	.option('-c,--config <file>', 'set config file of login vp system,default in package root config.json')
	.option('-M,--yearmonth [value]', 'set pull which year and which month vp data')
	.option('-s,--send', 'does need send to email');
program.on('--help', function () {
	console.log(' please email to x373241884y@email.com');
	console.log(' QQ:373241884');
});
program.parse(process.argv);



function start() {
	var file,config;
	file = program.config || path.resolve(__dirname, '../config.json');
	config = JSON.parse(fs.readFileSync(file, 'utf8'));
	config.yearmonth = program.yearmonth;
	config.send = program.send;
	main(config);
}

start();