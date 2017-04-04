/**
 * Created by toor on 17-4-1.
 */
var Excel = require('exceljs');
var moment = require('moment');
var Promise = require('bluebird');
var utils = require('./utils');
var fs = require('fs');
var weekMap = {
	0: "星期日",
	1: "星期一",
	2: "星期二",
	3: "星期三",
	4: "星期四",
	5: "星期五",
	6: "星期六"
};

var LeaveType = {
	1: '事假',
	2: '病假',
	3: '年假',
	4: '婚假',
	5: '产假',
	6: '陪产假',
	7: '慰唁假',
	8: '调休'
};
/**
 *
 * @param config({year:2016,filename:'xuxihai.xlsx',force:false})
 * @returns {{createXlsx: createXlsx, saveData: saveData}}
 */
function operateXlsx(config) {
	function dateToRowIndex(date) { //date or timestrap
		var index = 3, result = 3;
		var _day = moment(date);
		var days = _day.date();
		var year = _day.year();
		var month = _day.month();
		for (var i = 1; i <= days; i++) {
			var date = new Date(year, month, i);
			var weekday = moment(date).weekday();
			if (weekday === 1) {
				index += 2;
			}
			if (i === days) {
				result = index;
			}
			index += 1;
			if (weekday === 0) {
				index += 1;
			}
		}
		return result;
	}

	return {
		createXlsx: createXlsx,
		saveData: saveData
	};
	function createXlsx() {
		return new Promise(function (resolve, reject) {
			var year = config.year;
			var filename = config.filename;
			if (!config.force && fs.existsSync(filename)) {
				utils.log('using exist file:' + filename);
				return resolve('using exist file!');
			}
			utils.log('create file ' + filename);
			var workbook = new Excel.Workbook();
			workbook.views = [
				{
					x: 0, y: 0, width: 10000, height: 5000,
					firstSheet: 1, activeTab: 1, visibility: 'visible'
				}
			];
			for (var k = 0; k < 12; k++) {
				var month = k + 1;
				var firstday = new Date(year + '-' + month + '-01');
				var _day = moment(firstday);
				var sheet1 = workbook.addWorksheet(config.year + '.' + month);
				sheet1.properties.outlineLevelCol = 2;
				sheet1.properties.defaultRowHeight = 15;
				sheet1.columns = [
					{header: '开始日期', key: 'startDate', width: 15},
					{header: _day.format('YYYYMMDD'), key: 'startDateValue', width: 15},
					{header: '本月出差工作日天数:', key: 'daycq', width: 25},
					{header: 'xx天', key: 'outdays', width: 30},
					{header: '报工天数', key: 'null1', width: 45},
					{header: 'xx天', key: 'vpdays', width: 15}
				];
				var lastDay = _day.endOf('month');
				var days = lastDay.date();
				var index = 3;
				for (var i = 1; i <= days; i++) {
					var date = new Date(year, k, i);
					var weekday = moment(date).weekday();
					if (weekday === 1) {
						sheet1.getCell('A' + index).value = '开始日期';
						sheet1.getCell('B' + index).value = date.toLocaleDateString();
						sheet1.addRow(index).commit();
						index += 1;//next row
						sheet1.getCell('A' + index).value = '星期';
						sheet1.getCell('B' + index).value = '是否支持项目';
						sheet1.getCell('C' + index).value = '支持项目组';
						sheet1.getCell('D' + index).value = '事宜(具体描述所做工作)';
						sheet1.getCell('E' + index).value = '所列工作是否完成(如未完成，写明原因)';
						sheet1.getCell('F' + index).value = '工作耗时';
						sheet1.addRow(index).commit();
						index += 1;
					}
					sheet1.getCell('A' + index).value = weekMap[weekday];
					sheet1.addRow(index).commit();
					index += 1;
					if (weekday === 0) {
						sheet1.addRow(index).commit();
						index += 1;
					}
				}
			}
			workbook.xlsx.writeFile(filename).then(function (result) {
				utils.log('create file success');
				resolve('create file success');
			}, function (error) {
				utils.log('create file failed...');
				reject('create file failed...');
			});
		});
	}

	function saveData(monthData) {

		return new Promise(function (resolve, reject) {
			utils.log('saving data to ' + config.filename);
			if (monthData.length == 0) {
				return resolve('empty vp data!');
			}
			var filename = config.filename;
			var workbook = new Excel.Workbook();
			var travelCount = 0;
			return workbook.xlsx.readFile(filename).then(function () {
				var month = new Date(monthData[0].StartTime).getMonth() + 1;
				var sheet = workbook.getWorksheet(month);
				var rowIndex, rows;
				monthData.forEach(function (temp, index) {
					rowIndex = dateToRowIndex(temp.StartTime);
					rows = sheet.getRow(rowIndex);
					if (temp.ProId === 'YT-17-0052-002' || temp.ProId == '') {
						rows.getCell(2).value = '否';
					} else {
						rows.getCell(2).value = '是';
					}

					if (temp.TSTypeId === "6") {
						rows.getCell(3).value = '无';
						rows.getCell(4).value = LeaveType[temp.LeaveTypeId];
						rows.getCell(5).value = '无';
					} else {
						rows.getCell(3).value = temp.ProName;
						rows.getCell(4).value = temp.Context;
						rows.getCell(5).value = '完成';
					}
					rows.getCell(6).value = Number(temp.WorkTime) + Number(temp.DelayTime);
					if (temp.IsTravel) {
						travelCount++;
					}
				});
				rows = sheet.getRow(1);
				rows.getCell(4).value = travelCount + '天';
				rows.getCell(6).value = monthData.length + '天';
				return workbook.xlsx.writeFile(filename);
			}).then(function () {
				resolve('ok');
			}, function (err) {
				reject(err);
			});
		});
	}
}

module.exports = operateXlsx;