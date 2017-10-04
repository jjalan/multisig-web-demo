angular
  .module('multiSigWallet', ['ngRoute', 'toaster'])
  .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/wallet', {
        templateUrl: '/public/views/wallet.html',
        controller: 'WalletController'
		  })
      .when('/transaction', {
        templateUrl: '/public/views/transaction.html',
        controller: 'TransactionController'
		  })
      .otherwise({
        redirectTo: '/wallet'
      });
  }