angular
  .module('multiSigWallet')
  .controller('WalletController', WalletController);

function WalletController ($scope, $timeout, toaster, Wallet) {
  $scope.wallets = [];
  
  // This function creates a new wallet
  $scope.createNewWallet = function () {
    var toastInstance = toaster.pop({type: 'wait', title: 'Creating wallet ...', timeout: 0});
    Wallet.create()
      .then(function (response) {
        // Add this new wallet to the top of the array
        // so it shows up in the list view
        toaster.clear(toastInstance);
        toaster.pop({type: 'success', title: 'Wallet created successfully'});
        $scope.wallets.unshift(response.data);
        
        // If the original was empty, after adding an element
        // change the status to loaded
        $scope.status = 'Loaded';
        
        populateWalletInfo(response.data.txHash);
      }, function (error) {
        toaster.clear(toastInstance);
        toaster.pop({type: 'error', title: 'Unable to create wallet'});
      });
  }
  
  $scope.status = 'Loading';
  Wallet.all()
    .then(function (response) {
      if (response.data && response.data.length > 0) {
        $scope.status = 'Loaded';
        $scope.wallets = response.data.concat($scope.wallets);
        for (var i=0;i<response.data.length; i++) {
          if (!response.data[i].walletAddress) {
            populateWalletInfo(response.data[i].txHash);
          }
        }
      } else {
        $scope.status = 'LoadedNoData';
        $scope.statusMessage = 'Please click on "New Wallet" to create a new multi sig wallet';
      }
    }, function (error) {
      $scope.status = 'Error';
      if (error && error.message) {
        $scope.statusMessage = 'Unable to get wallets: ' + error.message;
      } else {
        $scope.statusMessage = 'Unable to get wallets.';
      }
    });
    
    function populateWalletInfo(txHash) {
      Wallet.getFromTransactionHash(txHash)
        .then(function (response) {
          if (response 
            && response.data
            && response.data.walletAddress) {
            
            // Find the entry in array and update it
            for (var i=0;i<$scope.wallets.length;i++) {
              if ($scope.wallets[i].txHash === response.data.txHash) {
                $scope.wallets[i] = response.data;
                break;
              }
            }
          } else {
            $timeout(function() {populateWalletInfo(txHash)}, 5000);
          }
        }, function (error) {
          $timeout(function() {populateWalletInfo(txHash)}, 5000);
        });
    }
}