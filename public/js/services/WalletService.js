angular
  .module('multiSigWallet')
  .factory('Wallet', ['$http', function ($http) {
    //var baseURL = "https://multisig-api.herokuapp.com";
    var baseURL = "http://localhost:8080";
    
    return {
      all: function () {
        return $http.get(baseURL+'/wallets');
      },
      create: function () {
        return $http.post(baseURL+'/wallet');
      },
      getFromTransactionHash: function (txHash) {
        return $http.get(baseURL+'/wallet/tx/'+txHash);
      },
      sendMoney: function (origin, destination, amount) {
        return $http({
          method: 'POST',
          url: baseURL+'/wallet/'+origin+'/send',
          data: {
            destination: destination,
            amount: amount
          }});
      }
    }
  }]);