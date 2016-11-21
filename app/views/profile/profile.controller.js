(function () {
    angular.module('angularMobileApp').controller("profileController", ['$scope', "$state", function ($scope, $state) {
        console.log("this is my profile controller");
        console.log("我的天");
        $scope.myName = "what   yi";
        $scope.goUserCenter = function () {
            $state.go("profile.usercenter", {sort: 'desc', from: 10, to: 40});
        };
    }]);
    angular.module("angularMobileApp").controller("usercenterControler", ["$scope", "$http", "$q", "$location", "$interval", "$state", "$stateParams", "SharedState", function ($scope, $http, $q, $location, $interval, $state, $stateParams, SharedState) {
        console.log("this is my  user center controller");
        console.log($stateParams);

        /* 测试   $Q*/
        function syncGreet(name) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.notify("这是 什么鬼" + name);
                if (1 == 1) {
                    deferred.resolve("hello word " + name);

                } else {
                    deferred.reject("hello" + name);
                }


            }, 1000);

            return deferred.promise;
        }

        console.log("=-============================")
        var promise = syncGreet("what yi");
        promise.then(function (gName) {
            console.log("======================================1")
            console.log(gName);
        }, function (gName) {
            console.log("======================================2")
            console.log(gName);
        });

        console.log("=-============================")


        $interval(function () {
            $scope.test = "this is  test";
        }, 5000);
        //setInterval(function(){
        //    $scope.test = "this is  test";
        //    console.log($location.absUrl())
        //    $scope.$apply();
        //},5000);
        console.log($scope.config.server)
        $http.post($scope.config.server + "/renyimen/m/aboutus/findAboutusList").success(function (res) {
            console.log(res)
        });


        $http({method: "post", url: $scope.config.server + '/renyimen/m/aboutus/findAboutusList'}).then(function (res) {
            console.log("http?");
            console.log(res);
        });

        $scope.back = function () {
            $state.go('^');
        };
        $scope.getState = function () {
            var p = $state.get("profile");
            console.log(p);
        };
        $scope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            console.group("change start   改变开始");
            console.log(evt);
            console.log(toState);
            console.log(toParams);
            console.log(fromState);
            console.log(fromParams);
        });

        SharedState.initialize($scope, "myName", {
            defaultValue: 'lanlan'
        });
        console.log(SharedState.get("myName"));

        SharedState.initialize($scope, "mySwitch", {
            defaultValue: true
        });

        $scope.changeSwitch = function () {
            SharedState.toggle("mySwitch");
        }


        var testCount = {
            input: null,
            init: function (config) {
                this.input = document.getElementById(config.id);
                console.log(this.input);
                this.bind();
                return this;
            },
            test: function () {
                console.log("test 123");
                var input = document.getElementById("test_input");
                this.input = input;
            },
            getValue: function () {
                return this.input.value;
            },
            getLength: function () {
                return this.input.value.length;
            },
            bind: function () {
                var self = this;
                self.input.addEventListener("keyup", function () {
                    self.render();
                });
            },
            render: function () {
                var length = this.getLength();

                if (!(document.getElementById("j_input_count") instanceof Object)) {
                    var append = document.createElement("span");
                    append.id = "j_input_count";
                    console.log(this.input.parentNode);
                    this.input.parentNode.appendChild(append);
                }

                document.getElementById("j_input_count").innerHTML = length;
            }
        };


        // testCount.init({id: 'test_input'}).render();

        var testCount2 = (function () {
            var testCountFun = function () {
            };
            var _bind = function (that) {
                that.input.on("keyup", function () {
                    that.render();
                });
            };
            var _getLength = function (that) {
                console.log(that.input.length);
                return that.input.val().length;
            };
            testCountFun.prototype = {
                init: function (config) {
                    console.log(config.id);
                    this.input = $(config.id);
                    _bind(this);

                    return this;
                },
                render: function () {
                    var length = _getLength(this);

                    if (this.input.parent().find(".j_input_count2").length == 0) {
                        this.input.after("<span class='j_input_count2'></span>");
                    }
                    this.input.parent().find(".j_input_count2").html(length);

                }
            };

            return testCountFun;
        })();

        var countFun = function (id) {
            new testCount2().init({id: id}).render();
        };

        countFun("#test_input2");
        countFun("#test_input2");
        function a(c) {
            this.b = c;
            this.d = function () {
                console.log(this.b)
            }
        }

        a.prototype.test = function () {
            console.log(this.b)
        };


        var obj = function () {
        };


        obj.prototype = new a('test');
        obj.prototype.constructor = obj;
        obj.prototype.test1 = function () {
            console.log('test22222 ')
        };


        var t = new obj('test');
        t.test();//alert('test');
        /* var o = {};

         o = _.bind(func, o, 'hi  ~~~');

         new o('xx').getName()
         console.log(o);

         console.log("================测试    bind");

         var func_q = function (name) {
         this.name = name;
         this.getName = function () {
         console.log(this.name + "=====");
         }
         };*/


        //练习
        var arr = ["1", "2", "3"].map(parseInt);
        console.log(arr);

        //测试 reduce
        var total = [0, 1, 2, 3].reduce(function (prev, next) {
            console.log("prev=" + prev);
            console.log("next=" + next);
            return prev + next;
        }, 5);

        console.log(total);
        [].splice()

        //在数组 arr 中，查找值与 item 相等的元素出现的所有位置
        function findAllOccurrences(arr, target) {
            var result = [];
            for (var i = 0, length = arr.length; i < length; i++) {
                arr[i] === target && result.push(i);
            }
            return result;
        }

        var b = findAllOccurrences('abcdefabc'.split(''), 'a').sort();
        console.log(b)

        /*实现一个打点计时器，要求
         1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
         2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
         3、第一个数需要立即输出*/
        function count(start, end) {
            var time = setInterval(function () {
                start === end && clearInterval(time);
                console.log(start++);
            }, 500);

            var timer = function () {
            };
            timer.prototype.cancel = function () {
                clearInterval(time);
            };
            timer.prototype.init = function () {
                console.log(start++);
                return this;
            }
            return new timer().init();
        }

        var s = count(1, 10);
        s.cancel();

        /*实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
         1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
         2、如果 num 能被 3 整除，返回字符串 fizz
         3、如果 num 能被 5 整除，返回字符串 buzz
         4、如果参数为空或者不是 Number 类型，返回 false
         5、其余情况，返回参数 num*/

        function fizzBuzz(num) {
            if (num == null || typeof num !== 'number')return false;
            if (num % 3 == 0 && num % 5 == 0) return "fizzbuzz";
            if (num % 3 == 0) return "fizz";
            if (num % 5 == 0) return "buzz";
            return num;
        }

        console.log(fizzBuzz(NaN));

        /*实现函数
         functionFunction，调用之后满足如下条件：
         1、返回值为一个函数
         f
         2、调用返回的函数
         f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即
         ', '
         3、所有函数的参数数量为
         1，且均为
         String
         类型*/
        function functionFunction(str) {
            return function (txt) {
                return str + ',' + txt;
            }
        }

        var a = functionFunction('Hello')('world');
        console.log(a);

        /*将数组 arr 中的元素作为调用函数 fn 的参数*/
        function argsAsArray(fn, arr) {
            return fn.apply('', arr);
        };
        argsAsArray(function (greeting, name, punctuation) {
            return greeting + ', ' + name + (punctuation || '!');
        }, ['Hello', 'Ellie', '!']);

        //Hello, Ellie!
    }]);

    //将函数 fn 的执行上下文改为 obj 对象
    function speak(fn, obj) {
        return fn.apply(obj);
    }

    var a = speak(function () {
        return this.greeting + ', ' + this.name + '!!!';
    }, {greeting: 'Hello', name: 'Rebecca'});

    //Hello, Rebecca!!!
    console.log(a);

    /* 实现函数 makeClosures，调用之后满足如下条件：
     1、返回一个函数数组 result，长度与 arr 相同
     2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同*/
    function makeClosures(arr, fn) {
        var result = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            result[i] = function (j) {
                return function () {
                    return fn(j);
                }
            }(arr[i]);
        }
        return result;
    }

    var arr = [1, 2, 3];
    var square = function (x) {
        return x * x;
    };
    var funcs = makeClosures(arr, square);
    funcs[1]();
    //4

    /*已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
     1、返回一个函数 result，该函数接受一个参数
     2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致*/
    function partial(fn, str1, str2) {
        return function (str1, str2) {
            return function (str3) {
                return fn(str1, str2, str3);
            }
        }(str1, str2);
    }

    var sayIt = function (greeting, name, punctuation) {
        return greeting + ', ' + name + (punctuation || '!');
    };
    partial(sayIt, 'Hello', 'Ellie')('!!!');
    //Hello, Ellie!!!

    /* 函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。*/
    function useArguments() {
        return Array.prototype.reduce.call(arguments, function (a, b) {
            return a + b;
        });
    }

    /*实现函数 callIt，调用之后满足如下条件
     1、返回的结果为调用 fn 之后的结果
     2、fn 的调用参数为 callIt 的第一个参数之后的全部参数*/
    function callIt(fn) {
        //return Array.prototype.shift.call(arguments).apply(null, arguments);
        return fn.apply(this, Array.prototype.slice.call(arguments, 1));
    }

    var a = 1;
    var b = 2;
    var test = function (first, second) {
        return first === a && second === b;
    };
    callIt(test, a, b);

    /*实现函数 partialUsingArguments，调用之后满足如下条件：
     1、返回一个函数 result
     2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
     3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的*/
    function partialUsingArguments(fn) {
        var arg = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(this, [].concat(arg, Array.prototype.slice.call(arguments)))
        }
    }

    var a = 1;
    var b = 2;
    var c = 3;
    var d = 4;
    var test = function (first, second, third, forth) {
        return first + second + third + forth;
    };
    partialUsingArguments(test, a, b)(c, d);
    //10

    /*已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
     1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
     2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
     3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
     4、调用 c 之后，返回的结果与调用 fn 的返回值一致
     5、fn 的参数依次为函数 a, b, c 的调用参数*/
    function curryIt(fn) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return fn(a, b, c);
                }
            }
        }
    }

    var fn = function (a, b, c) {
        return a + b + c
    };

    var test = curryIt(fn)(1)(2)(3);
    console.log(test)

    //6
    console.log(curryIt(fn)(1).length)

    function createModule(str1, str2) {
        return {
            greeting: str1,
            name: str2,
            sayIt: function () {
                return this.greeting + ',' + this.name;
            }
        }
    }

    /* 获取数字 num 二进制形式第 bit 位的值。注意：
     1、bit 从 1 开始
     2、返回 0 或 1
     3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1*/
    createModule("what", 'yi').sayIt();

    function valueAtBit(num, bit) {
        return num.toString(2).split('').reverse()[bit - 1];
    }

    valueAtBit(128, 8);

    function base10(str) {
        return parseInt(str, 2);
    }

    var test = base10('11000000');
    console.log(test);
    /*将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。 */
    function convertToBinary(num) {
        var arr = [0, 0, 0, 0, 0, 0, 0, 0];
        var arr2 = arr.concat(num.toString(2).split(''));
        return arr2.slice(arr2.length - 8).join("");
    }

    convertToBinary(65);
    //01000001

    /*求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题*/
    function multiply(a, b) {
        console.log(new Number(a * b));
        return new Number(a * b);
    }

    multiply(3, 0.0001);
    //0.0003

    //将函数 fn 的执行上下文改为 obj，返回 fn 执行后的值
    function alterContext(fn, obj) {
        return fn.bind(obj)();
    }

    alterContext(function () {
        return this.greeting + ', ' + this.name + '!';
    }, {name: 'Rebecca', greeting: 'Yo'});


    //Yo, Rebecca

    //给定一个构造函数 constructor，请完成 alterObjects 方法，将 constructor 的所有实例的 greeting 属性指向给定的 greeting 变量
    function alterObjects(constructor, greeting) {
        constructor.prototype.greeting = greeting;
    }

    var C = function (name) {
        this.name = name;
        return this;
    };
    var obj1 = new C('Rebecca');
    alterObjects(C, 'What\'s up');
    obj1.greeting;

    //What's up

    /*找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
     1、返回数组，格式为 key: value
     2、结果数组不要求顺序*/
    function iterate(obj) {
        var arr = [];
        for (o in obj) {
            if (obj.hasOwnProperty(o)) {
                arr.push(o + ": " + obj[o]);
            }
        }
        return arr;
    }

    var C = function () {
        this.foo = 'bar';
        this.baz = 'bim';
    };
    C.prototype.bop = 'bip';
    iterate(new C());

    //["foo: bar", "baz: bim"]

    /*给定字符串 str，检查其是否包含数字，包含返回 true，否则返回 false*/
    function containsNumber(str) {
        var rex = /\d+/
        return rex.test(str)
    }

    containsNumber('abc123');


    //true

    /*给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false*/
    function containsRepeatingLetter(str) {
        return /([a-zA-Z])\1/.test(str);
    };
    containsRepeatingLetter('rattler');


    /*给定字符串 str，检查其是否以元音字母结尾
     1、元音字母包括 a，e，i，o，u，以及对应的大写
     2、包含返回 true，否则返回 false*/
    function endsWithVowel(str) {
        return /[a,e,i,o,u]$/i.test(str);
    }

    var test = endsWithVowel('gorilla');

    //true


    /*给定字符串 str，检查其是否包含 连续3个数字
     1、如果包含，返回最新出现的 3 个数字的字符串
     2、如果不包含，返回 false*/
    function captureThreeNumbers(str) {
        var arr = str.match(/\d{3}/);
        if (arr) {
            return arr[0];
        } else {
            return false;
        }

    }

    var test = captureThreeNumbers('9876543')

    //987

    /*给定字符串 str，检查其是否符合如下格式
     1、XXX-XXX-XXXX
     2、其中 X 为 Number 类型*/
    function matchesPattern(str) {
        var rex = /^\d{3}-\d{3}-\d{4}$/;
        return rex.test(str);
    }

    matchesPattern('8xx-555-1212');

    /*给定字符串 str，检查其是否符合美元书写格式
     1、以 $ 开始
     2、整数部分，从个位起，满 3 个数字用 , 分隔
     3、如果为小数，则小数部分长度为 2
     4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3*/

    function isUSD(str) {
        var rex = /^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$/;
        return rex.test(str);
    }

    var test = isUSD('$20,933,209.93')


    //找出元素 item 在给定数组 arr 中的位置
    function indexOf(arr, item) {
        return arr.indexOf(item);
    }

    indexOf([1, 2, 3, 4], 5);
    console.log("+======================");
    console.log(test);


    //移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
    function remove(arr, item) {
        return arr.filter(function (value) {
            return value !== item;
        });
    }

    var test = remove([1, 2, 3, 4, 2], 2);

    //[1, 3, 4]

    //移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
    function removeWithoutCopy(arr, item) {
        while (arr.indexOf(item) !== -1) {
            arr.splice(arr.indexOf(item), 1);
        }
        return arr;
    }

    removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2);


    /*在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组*/
    function append(arr, item) {
        return arr.concat(item);
    }

    var test = append([1, 2, 3, 4], 10)
    console.log("+======================");
    console.log(test);
    //[1, 2, 3, 4, 10]

    //是否是 类数组
    var isArrayLike = function (arr) {
        var length = arr != null && arr.length;
        return typeof length == 'number' && length >= 0;
    };
    var isArray = function (arr) {
        return toString.call(arr) === "[object Array]";
    };

    //要求  扁平化数组
    var flatten = function (arr) {
        var output = [], idx = 0;
        for (var i = 0, length = arr.length; i < length; i++) {
            var value = arr[i];
            if (isArrayLike(value) && isArray(value)) {
                value = flatten(value);
                var j = 0, len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else {
                output[idx++] = value;
            }
        }
        return output;
    };

    var arr = [1, 2, [1, 2, 3, 4], [3, 4, 5, 6, ['7', '5', '4']]];

    var arr2 = flatten(arr);
    console.log(arr2);


    function destroyer(arr) {
       var arr_arg=Array.prototype.slice.call(arguments, 1);
        // Remove all the values
        arr = arr.filter(function (val) {
            return arr_arg.indexOf(val) == -1;
        });
        return arr;
    }

    var s= destroyer([1, 2, 3, 1, 2, 3], 2, 3);

    console.log(s)

})();