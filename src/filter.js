'use strict'

// 示例
// export function repayFormat(value) {
//   	if (!value) return
//   	switch(value*1){
// 		case 1:
// 		  value='等额本息';
// 		  break;
// 		case 2:
// 		  value='等额本金';
// 		  break;
// 		case 3:
// 		  value='先息后本';
// 		  break;
// 		case 4:
// 		  value='到期结清';
// 		  break;
// 	}
//     return value
// };

export function dateFormat(value, format) {
	if (!value) {
		return;
	}
	if(!value.getMonth){
		value = new Date(value*1);
	}
	var o = {
			"M+": value.getMonth() + 1,
			"d+": value.getDate(),
			"h+": value.getHours(),
			"m+": value.getMinutes(),
			"s+": value.getSeconds(),
			"q+": Math.floor((value.getMonth() + 3) / 3),
			"S":  value.getMilliseconds()
		}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

export function monthFormat(value) {
	if (value==='') {
		return;
	}
	let mapperArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	return mapperArr[value-1];
};

export function weekdayFormat(value) {
	if (value==='') {
		return;
	}
	let mapperArr = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
	return mapperArr[value];
};

export function countdownFormat(value) {
	if (!value) {
		return;
	}
	let time_h= Math.floor(value/60),
		  time_s= value % 60;

   	time_h= time_h < 10 ? "0" +time_h : time_h;
   	time_s= time_s < 10 ? "0" +time_s : time_s;

	return time_h+':'+time_s;
};