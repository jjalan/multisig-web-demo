angular
  .module('multiSigWallet')
  .factory('Self', ['$http', function ($http) {
    //var baseURL = "https://multisig-api.herokuapp.com";
    var baseURL = "http://localhost:8080";
    return {
      info: function () {
        return $http.get(baseURL+'/me');
      }
    }
  }]);