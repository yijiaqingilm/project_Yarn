(function () {
    angular.module('angularMobileApp').controller("profileController", ['$scope', "$state", function ($scope, $state) {
        console.log("this is my profile controller");
        console.log("我的天");
        $scope.myName = "what   yi";
        $scope.goUserCenter = function () {
            $state.go("profile.usercenter", {sort: 'desc', from: 10, to: 40});
        };
    }]);
    angular.module("angularMobileApp").controller("usercenterControler", ["$scope", "$state", "$stateParams", "SharedState", function ($scope, $state, $stateParams, SharedState) {
        console.log("this is my  user center controller");
        console.log($stateParams);
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
        })

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
        console.log($);

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


    }]);

})();