/*时间戳转换*/
function timestamp(time) {
	var tip = Date.parse(time);
	return tip / 1000;
}
//格式化时间戳
function dateFormatTime(timestamp, format) {
	date = new Date(parseInt(timestamp) * 1000); //转换数据类型  如果时间戳是后端生成 要 * 1000
	var map = {
		"M": date.getMonth() + 1, //月份 
		"d": date.getDate(), //日 
		"h": date.getHours(), //小时 
		"m": date.getMinutes(), //分 
		"s": date.getSeconds(), //秒 
		"q": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
		var v = map[t];
		if(v !== undefined) {
			if(all.length > 1) {
				v = '0' + v;
				v = v.substr(v.length - 2);
			}
			return v;
		} else if(t === 'y') {
			return(date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	return format;

};
/*校验手机号码格式*/
function checkMobile(str) {
	var re = /^(1(([34578][0-9])|(47)))\d{8}$/; //匹配 13x/15x/18x/17x 号段，如有遗漏请自行添加
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}
//是否微信登录
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
/*校验验证码格式*/
function checkCode(str) {
	var re = /^\d{6}$/; //匹配6位数字，如有遗漏请自行添加
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

function getLocalTime(nS, fmt) {
	if(fmt == undefined) {
		fmt = "yyyy-MM-dd hh:mm:ss"
	}
	return new Date(parseInt(nS)).Format(fmt).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function myMsg(title, time) {
	if(time == undefined) {
		time = 1000;
	}
	var html = "";
	html += '<div class="my-dimmer_msg" ></div> \
			<div class="my-modal_msg"> \
				<div class="my-modal-dialog am-radius-10"> \
					<div class="my-modal_msg-hd">' + title + '</div> \
				</div> \
			</div>';
	$("body").append(html);
	$(".my-modal").css("marginTop", -$(".my-modal").height() / 2);
	$(".my-modal_msg").fadeOut(time);
	$(".my-dimmer_msg").fadeOut(time);
}

function myAlert(title, body, callFn) {
	var html = "";
	html += '<div class="my-dimmer" ></div> \
			<div class="my-modal"> \
				<div class="my-modal-dialog am-radius-10"> \
					<div class="my-modal-hd">' + title + '</div> \
					<div class="my-modal-bd">' + body + ' </div> \
					<div class="my-modal-footer"> \
						<span class="my-modal-btn">确定</span> \
					</div> \
				</div> \
			</div>';
	$("body").append(html);
	$(".my-modal").css("marginTop", -$(".my-modal").height() / 2);

	$(".my-modal-btn").one("click", function() {
		if(callFn != undefined) {
			callFn();
		}
		closeAlert();

	});

	$('input[type=text],textarea,[type=search]').bind('input', filterIcon);

}

function closeAlert() {
	$(".my-modal").remove();
	$(".my-dimmer").remove();
}

function cutOut(str) {
	if(str.length > 6) {
		str = str.substr(0, 3) + "***" + str.substr(str.length - 3);
	}
	return str;
}

function myConfirm(title, body, okFn, closeFn, okTxt, closeTxt, checkOkFn) {
	if(okTxt == undefined) {
		okTxt = "确定"
	}
	if(closeTxt == undefined) {
		closeTxt = "取消";
	}
	var html = "";
	html += '<div class="my-dimmer" ></div>' +
		'<div class="my-modal">' +
		'	<div class="my-modal-dialog am-radius-10">' +
		'		<div class="my-modal-hd">' + title + '</div>' +
		'		<div class="my-modal-bd">' + body + ' </div>' +
		'		<div class="my-modal-footer">' +
		'			<span class="my-modal-btn border-right-default close">' + closeTxt + '</span>' +
		'			<span class="my-modal-btn ok">' + okTxt + '</span>' +
		'		</div>' +
		'	</div>' +
		'</div>';
	$("body").append(html);
	$(".my-modal").css("marginTop", -$(".my-modal").height() / 2);
	$(".ok").bind("click", function() {
		if(checkOkFn != undefined) {
			console.log();
			if(!checkOkFn()) {
				return;
			}
		}
		if(okFn != undefined) {
			okFn();
		}
		closeAlert();

	});
	$(".close").one("click", function() {
		if(closeFn != undefined) {
			closeFn();
		}
		closeAlert();

	});

	$('input[type=text],textarea,[type=search]').bind('input', filterIcon);
}

/*校验密码格式*/
function checkPassword(str) {
	var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,12}$/; //匹配6-12位字符，不能含空格，如有遗漏请自行添加
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

/*校验身份证格式*/
function checkIdcard(_id) {
	var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
	var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
	_id = _id + "";
	var _num = _id.substr(0, 17);
	var _parityBit = _id.substr(17);
	var _power = 0;
	for(var i = 0; i < 17; i++) {
		//校验每一位的合法性
		if(_num.charAt(i) < '0' || _num.charAt(i) > '9') {
			return false;
			break;
		} else {
			//加权
			_power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
		}
	}
	//取模
	var mod = parseInt(_power) % 11;
	if(parityBit[mod] == _parityBit) {
		return true;
	}
	return false;
}

/*校验真实姓名格式*/
function checkName(str) {
	var re = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/; //如有遗漏请自行添加
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}

function stringToDate(DateStr) {

	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if(isNaN(myDate)) {
		//var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
		var arys = DateStr.split('-');
		myDate = new Date(arys[0], --arys[1], arys[2]);
	}
	return myDate;
}

function addDate(date, days) {
	var d = new Date(date.replace(/-/g, "/"));
	d.setDate(d.getDate() + days);
	var m = d.getMonth() + 1;
	if(m < 10) {
		m = "0" + m;
	}
	var day = d.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	return d.getFullYear() + '-' + m + '-' + day;
}

//回显数据  1:data选择框的数据结构 2:具体的摸个id的值
function find(data, id, t) {
	var text;
	if(t === undefined) {
		t = '';
	}
	for(var i in data) {
		var obj = data[i];
		if(obj.value == id) {
			text = t + obj.text;
			break;
		} else {
			if(obj.hasOwnProperty('children')) {
				text = find(obj.children, id, t + obj.text + '-');
				if(text) {
					break;
				}
			}
		}
	}
	return text;
}

function find2(data, id, t) {
	var text;
	if(t === undefined) {
		t = '';
	}
	for(var i in data) {
		var obj = data[i];
		if(obj.value == id) {
			text = t + obj.text;
			break;
		} else {
			if(obj.hasOwnProperty('children')) {
				text = find(obj.children, id, t);
				if(text) {
					break;
				}
			}
		}
	}
	return text;
}

//匹配网站地址
function filterUrl(url) {
	var rex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
	if(url.match(rex)) {
		return true;
	} else {
		return false;
	}
}