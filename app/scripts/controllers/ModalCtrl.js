(function() {
	app.controller("ModalCtrl", ["$scope", "$uibModal", "$log", function($scope, $uibModal, $log) {
		console.log("model ctrl");
		var $ctrl = this;
		console.log($ctrl);
		console.log(event);
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = true;

		$ctrl.open = function(size) {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				controllerAs: '$ctrl',
				size: size,
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$ctrl.openComponentModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				component: 'modalComponent',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('modal-component dismissed at: ' + new Date());
			});
		};

		$ctrl.toggleAnimation = function() {
			$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
	}]);

	app.controller('ModalInstanceCtrl', function($uibModalInstance, items) {
		var $ctrl = this;
		console.log($ctrl);
		console.log("zheshi sha ")
		$ctrl.items = items;
		$ctrl.selected = {
			item: $ctrl.items[0]
		};

		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	});

})();