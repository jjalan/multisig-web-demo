angular
  .module('multiSigWallet')
  .controller('SendController', SendController);

function SendController ($scope, $uibModalInstance, wallet) {
  $scope.wallet = wallet;
  
  $scope.dismiss = function() {
    $uibModalInstance.dismiss('cancel');
  }
  
  $scope.confirm = function() {
    if ($scope.form.$valid) {
      $uibModalInstance.close({destination: $scope.destination, amount: $scope.amount});
    }
  }
}