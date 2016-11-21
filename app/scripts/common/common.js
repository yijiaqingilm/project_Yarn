(function () {
    var root = this;

    var c = function () {
    };
    /*校验手机号码格式*/
    c.checkMobile = function (str) {
        var re = /^(1(([34578][0-9])|(47)))\d{8}$/; //匹配 13x/15x/18x/17x 号段，如有遗漏请自行添加
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    };
    /*校验身份证格式*/

    c.checkIdcard = function (_id) {
        var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
        var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        _id = _id + "";
        var _num = _id.substr(0, 17);
        var _parityBit = _id.substr(17);
        var _power = 0;
        for (var i = 0; i < 17; i++) {
            //校验每一位的合法性
            if (_num.charAt(i) < '0' || _num.charAt(i) > '9') {
                return false;
                break;
            } else {
                //加权
                _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
            }
        }
        //取模
        var mod = parseInt(_power) % 11;
        if (parityBit[mod] == _parityBit) {
            return true;
        }
        return false;
    };

    //回显数据  1:data选择框的数据结构 2:具体的摸个id的值
    c.find = function (data, id, t, join) {
        var text;
        if (t === undefined) {
            t = '';
        }
        if (join == undefined) {
            join = false;
        }
        for (var i in data) {
            var obj = data[i];
            if (obj.value == id) {
                text = t + obj.text;
                break;
            } else {
                if (obj.hasOwnProperty('children')) {
                    text = find(obj.children, id, t + join ? obj.text + '-' : '');
                    if (text) {
                        break;
                    }
                }
            }
        }
        return text;
    };

    //匹配网站地址
    c.filterUrl = function (url) {

        var rex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
        if (url.match(rex)) {
            return true;
        } else {
            return false;
        }
    };


    //过滤表情
    function filterIcon() {
        var ranges = [
            '\ud83c[\udd00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ];

        var _this = $(this);
        var oldVal = _this.val();

        var newVal = oldVal.replace(new RegExp(ranges.join('|'), 'g'), '');

        if (oldVal != newVal) {
            closeAlert();
            myAlert("友情提示", '请不要输入表情');
            _this.blur();
            _this.val(newVal);
            return false;
        }
    }

    root.c = root.commont = c;
}.call(this));
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


