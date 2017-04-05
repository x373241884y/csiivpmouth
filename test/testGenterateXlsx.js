/**
 * Created by toor on 17-4-3.
 */
var genxlsx = require('../lib/generateXlsx');
var fs = require('fs');
var handle = genxlsx({
	year: 2017,
	filename: '/tmp/xuxihai123.xlsx',
	force: true
});
handle.createXlsx().then(function (result) {
	var data = fs.readFileSync('pulldata.json');
	var vparray = JSON.parse(data.toString());
	handle.saveData(vparray);
});