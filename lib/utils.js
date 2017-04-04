module.exports={
	log:function (message) {
		console.log('info====>'+message);
	},
	error:function (error) {
		if(error.stack){
			console.error(error.stack);
		}
	},
	timeCalc:function (tag,fn) {
		var start = Date.now();
		fn();
		this.log(tag + ' use time %s', Date.now() - start);
	}
};