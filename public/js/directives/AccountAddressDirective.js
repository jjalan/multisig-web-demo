angular
  .module('multiSigWallet')
  .directive('destination', AccountAddressDirective);

  function AccountAddressDirective() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.destination = function(modelValue, viewValue) {
          return isAddress(modelValue) && attrs.sender !== modelValue;
        };
      }
    };
  }
  
  // Logic to check if address is valid or not
  // https://ethereum.stackexchange.com/questions/12867/how-to-check-for-valid-contract-address-using-web3
  var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return "true
      return true;
    } else {
      // Otherwise check each case
      return isChecksumAddress(address);
    }
  }
  
  var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = web3.sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
        return false;
      }
    }
    return true;
  }