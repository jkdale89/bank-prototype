'use strict';


/* Services */

angular.module('Services', ['ngResource'])



.service('MockData', ['$http', '$exceptionHandler', function($http, $exceptionHandler) {
  var self = this;



  self.accountsPromise = $http.get('data/accounts.json').then(function(data) {
    self.accounts = data.data;
    return self.accounts;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving transfers");
  });

  self.accountdocsPromise = $http.get("data/accountdocs.json").then(function(data) {
    self.accountdocs = data.data;
    return self.accountdocs;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving accountdocs");
  });

  self.billsPromise = $http.get("data/bills.json").then(function(data) {
    self.bills = data.data;
    return self.bills;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving transfers");
  });

  self.bucketsPromise = $http.get('data/accountBuckets.json').then(function(data) {
    self.buckets = data.data;
    return self.buckets;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving transfers");
  });

  self.recipientsPromise = $http.get('data/transactions.json').then(function(data) {
    self.recipients = data.data;
    return self.transactions;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving recipients");
  });

  self.transactionsPromise = $http.get('data/transactions.json').then(function(data) {
    self.transactions = data.data;
    return self.transactions;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving transfers");
  });

  self.transfersPromise = $http.get('data/transfers.json').then(function(data) {
    self.transfers = data.data;
    return self.transfers;
  }, function(problem) {
    $exceptionHandler(problem, "retrieving transfers");
  });
}])

.service("Accounts", ["MockData", function(data) {
  var self = this;

  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
      'use strict';
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {k = 0;}
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
           (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
          return true;
        }
        k++;
      }
      return false;
    };
  }

  // Accounts from which money may be sent to
  self.drawableFrom = [];

  // Accounts from which money may be drawable from
  // Source must always be determined...so this is commented out

  //self.despoitableTo = [];

  data.accountsPromise.then(function(accounts) {
    var prohibited = ["Mortgage", "Investments", "External Accounts", "Overdraft", "Term Loan"];
    self.drawableFrom = accounts.filter(function(account) {
      return !(prohibited.includes(account.accounttype) || prohibited.includes(account.account_type));
    });
  });

  self.payableTo = function(accounts) {
    var tags = ["Mortgage", "Investments", "External Accounts", "Term Loan"];
    return accounts.filter(function(account) {
      return tags.includes(account.accounttype) || tags.includes(account.account_type);
    });
  }

  self.payableFrom = function(accounts) {
    var tags = ["Checking"];
    return accounts.filter(function(account) {
      return tags.includes(account.account_type);
    });
  }

  self.watchDrawableFrom = function($scope, responder) {
    $scope.$watch(function() {
      return self.drawableFrom;
    }, responder);
  }

  self.depositableFrom = function(sourceAccount) {
    return data.accountsPromise.then(function(accounts) {
      return accounts.filter(function(account) {
        return sourceAccount != account && account.account_type != "Overdraft";
      });
    });
  }
}])
