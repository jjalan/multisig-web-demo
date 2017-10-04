angular
  .module('multiSigWallet')
  .factory('Wallet', ['$http', function ($http) {
  return {
    all: function () {
      return $http.get('https://multisig-api.herokuapp.com/wallets');
    },
    create: function () {
      return $http.post('https://multisig-api.herokuapp.com/wallet');
    }
  }
}]);