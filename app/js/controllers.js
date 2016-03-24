'use strict';

/* Controllers */

angular.module('Controllers', [])


.controller('MainCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$exceptionHandler', 'MockData', '$uibModal',
  function($scope, $rootScope, $routeParams, $http, $exceptionHandler, data, $uibModal) {

    $scope.date = new Date();
    $scope.Math = window.Math;
    $('[data-toggle="tooltip"]').tooltip();

    $scope.myteam = [{
      name: 'Joan Smith',
      image: 'url("./img/team1.png")',
      header_image: './img/team1-header.png',
      info_image: './img/team1-info.png',
      title: 'Relationship Manager',
      email: 'Email Joan',
      phone1: '(415) 831-6688',
      location: 'Laurel Village',
      phone2: '(415) 831-6688'
    }, {
      name: 'Roy Chang',
      image: 'url("./img/team2.png")',
      header_image: './img/team2-header.png',
      info_image: './img/team2-info.png',
      title: 'Personal Banker',
      email: 'Email Roy',
      phone1: '(415) 876-4656',
      location: 'Laurel Village',
      phone2: '(903) 943-4633'
    }, {
      name: 'Bob Stevens',
      image: 'url("./img/team3.png")',
      header_image: './img/team3-header.png',
      info_image: './img/team3-info.png',
      title: 'Relationship Manager',
      email: 'Email Bob',
      phone1: '(510) 431-1388',
      location: 'Laurel Village',
      phone2: '(903) 943-4566'
    }, {
      name: 'Melanie Stephanie',
      image: 'url("./img/team4.png")',
      header_image: './img/team4-header.png',
      info_image: './img/team4-info.png',
      title: 'Loan Officer',
      email: 'Email Melanie',
      phone1: '(415) 123-6688',
      location: 'Laurel Village',
      phone2: '(903) 831-6688'
    }];
    // Das Ubermodal

    // $scope.customForm = [
    //   {
    //     name: 'fraudAlert',
    //     attributes: [
    //       {
    //         label: 'Name as it appears on the card'
    //       },
    //       {
    //         label: 'First 4 digits of card number'
    //       },
    //       {
    //         label: 'Last 4 digits of card number'
    //       },
    //       {
    //         label: 'Travel start date',
    //         split: true
    //       },
    //       {
    //         label: 'Travel end date',
    //         split: true;
    //       },
    //       {
    //         label: 'Where are you traveling to?'
    //       },
    //       {
    //         label: 'First 4 digits of card number'
    //       },
    //       {
    //         label: 'First 4 digits of card number'
    //       },
    //     ]
    // }
    // ]

    $rootScope.bankType = {
      short: "First Republic",
      long: "First Republic Bank"
    }

    $rootScope.makeAwesome = function() {
      setTimeout(function() {
        $rootScope.$apply(function() {
          if ($routeParams.awesome) {
            $rootScope.bankType = {
              short: "Awesome",
              long: "AwesomeBank"
            }
          }
        });
      }, 1);
    }

    $scope.openOverpanel = function(overpanelClass) {
      $uibModal.open({
        templateUrl: 'views/partials/overpanel.html',
        controller: ["$scope", "$modalInstance", "overpanelClass",
          function($scope, $modalInstance, overpanelClass) {
            $scope.overpanelClass = overpanelClass
          }
        ],
        backdrop: 'static',
        keyboard: false,
        size: 'overpanel',
        resolve: {
          overpanelClass: function() {
            return overpanelClass;
          }
        }
      });
    }

    $scope.openOverpanelx = function(overpanelClass) {
      $uibModal.open({
        templateUrl: 'views/partials/overpanel.html',
        controller: ["$scope", "$modalInstance", "overpanelClass",
          function($scope, $modalInstance, overpanelClass) {
            $scope.overpanelClass = overpanelClass
          }
        ],
        backdrop: 'static',
        keyboard: false,
        size: 'fraud-alerts',
        resolve: {
          overpanelClass: function() {
            return overpanelClass;
          }
        }
      });
    }
    // My Team **JAZZHANDS** Modal
    $scope.openMyTeamModal = function(banker_idx) {
      $uibModal.open({
        templateUrl: 'views/partials/myteam-modal.html',
        controller: ["$scope", "$uibModalInstance", "banker_idx", "myteam",
          function($scope, $uibModalInstance, banker_idx, myteam) {
            $scope.banker_idx = banker_idx;
            $scope.myteam = myteam;
          }
        ],
        size: 'myteam',
        resolve: {
          banker_idx: function() {
            return banker_idx;
          },
          myteam: function() {
            return $scope.myteam;
          }
        }
      });
    }

    // $scope.openCustomFormModal = function(banker_idx) {
    //   $uibModal.open({
    //     templateUrl: 'views/partials/custom-form.html',
    //     controller: 'MainCtrl'
    //     }
    //   });
    // }

    // MYTEAM PICTURE ROTATION - this organizes myteam pictures so that, on click, the smaller picture becomes the large picture, the large takes the smaller's place

    $scope.collection = ['summary-account-shown', 'summary-quickpeek-shown']
    $scope.currentOpenStatusIndex = 0;
    $scope.changeOpenStatus = function() {
      var cur = $scope.currentOpenStatusIndex;
      cur == 1 ? cur = 0 : cur = 1;
      $scope.currentOpenStatusIndex = cur;
      return $scope.currentOpenStatusIndex;
    }

    $scope.goldBorder = '.1em solid #DAAC45';
    $scope.grayBorder = '.1em solid lightgray;';

    $scope.currentBorder = $scope.goldBorder;

    $scope.switchBottomBorder = function() {
      if ($scope.currentBorder === $scope.goldBorder) {
        $scope.currentBorder = $scope.grayBorder
      } else {
        $scope.currentBorder = $scope.goldBorder
      }
    }

    $scope.myteamSwitch = function($event) {
        var target = $event.toElement.classList[0];
        var index = target.substr(target.length - 1);
        console.log(index);
        var temp = $scope.myteam[index];
        $scope.myteam[index] = $scope.myteam[0];
        $scope.myteam[0] = temp;
      }
      // END MYTEAM

    // JSON CALLS - set the scope variables for each json file
    data.accountsPromise.then(function(data) {
      $rootScope.Accounts = data;
      return $rootScope.Accounts;
    });

    data.accountdocsPromise.then(function(data) {
      $rootScope.Accountdocs = data;
      return $rootScope.Accountdocs;
    });

    data.billsPromise.then(function(data) {
      // This keeps the dates current for payments
      for (var i = 0; i < data.length; i++) {
        var day = new Date();
        day.setDate(day.getDate() + i);
        data[i].pay_date = (day)
      }
      $rootScope.Bills = data;

      // this provides a total of upcoming payments in the STATUS CENTER
      $rootScope.Bills.scheduled = function() {
        var total = 0;
        for (var i = 0; i < $rootScope.Bills.length; i++) {
          if ($rootScope.Bills[i].scheduled) {
            total = total + $rootScope.Bills[i].next_payment_amount
          }
        }
        return total
      }
      return $rootScope.Bills
    });

    $scope.bucketsPromise = data.bucketsPromise.then(function(data) {
      // Buckets encapsulates the categories that show on the summary
      $rootScope.Buckets = data;
      return $rootScope.Buckets;
    });

    $scope.transactionsPromise = data.transactionsPromise.then(function(data) {
      $rootScope.Transactions = data;
      return $rootScope.Transactions;
    });

    $scope.accountTotal = function(category) {
      var end = $scope.Accounts.length,
        total = 0;
      for (var i = 0; i < end; i++) {
        if ($scope.Accounts[i].accounttype == category) {
          total += $scope.Accounts[i].balance;
        }
      }
      return total;
    };
  }
])

.controller("NavCtrl", ["$scope", function($scope){
  $scope.makeActive = function(array, index) {
    for(var i = 0; i < array.length; i ++) {
      array[i].active = false
    }
    array[index].active = true
  }

  $scope.siteCategories = [
    //Input the different buckets for the navigation bar
    //IF OPTIONS ARE ENTERED - a caret will appear and a dropdown will be toggled
    {
      title: 'Accounts',
      active: true,
      urlAlias: 'main'
    },

    {
      title: 'Bill pay',
      active: false,
      urlAlias: 'bills'
    },

    {
      title: 'Transfers',
      active: false,
      options: [
        {
          title: 'Between my First Republic accounts',
          separator: false
        },
        {
          title: 'To my account at another bank',
          separator: true
        },
        {
          title: 'To another person',
          separator: false
        }
      ],
      urlAlias: 'transfers'
    },

    {
      title: 'Statements & Documents',
      active: false,
      urlAlias: 'docs'
    },

    {
      title: 'Budgets & Spending',
      active: false,
      urlAlias: 'budgets-and-spending'
    }
  ]
  $scope.acctsnav = true;
  $scope.firstNavOption =
    {
      name: 'Support & Settings',
      items: [
        {
          title: 'Help',
          separator: false
        },
        {
          title: 'FAQs',
          separator: true
        },
        {
          title: 'Location',
          separator: true
        },
        {
          title: 'Messages',
          separator: true
        },
        {
          title: 'Order checks',
          separator: false
        },
        {
          title: 'Stop payments',
          separator: false
        },
        {
          title: 'Activate fraud alerts',
          separator: false
        },
        {
          title: 'Let you know about my travel plans',
          separator: true
        },
        {
          title: 'Go to Turbo Tax',
          separator: false
        }
      ]
    }

  $scope.secondNavOption =
    {
      name: 'Settings',
      items: [
        {
          title: 'User profile',
          separator: false,
          urlAlias: 'user-profile'
        },
        {
          title: 'Account preferences',
          separator: true,
          urlAlias: 'account-preferences'
        },
        {
          title: 'Security preferences',
          separator: false,
          urlAlias: 'security-preferences'
        },
        {
          title: 'Mobile authorization',
          separator: false,
          urlAlias: 'user-profile'
        }
      ]
    }
  }
])


.controller("StatusCenterController", ["$scope", "$rootScope", "MockData", "Accounts", "$http", "$filter",
    function($scope, $rootScope, data, accountRules, $http, $filter) {

      $scope.Date = Date;
      $scope.showAddPayment = false;
      $scope.showPayments = false;
      $scope.showAddTransfer = false;
      $scope.showTransfers = false;
      $scope.isToday = function(date) {
        var testDay = new Date(Date.parse(date)).getDate();
        var todayDay = $scope.date.getDate();

        if (testDay == todayDay) {
          return true;
        } else {
          return false;
        }

        // console.log(
        // 	"Today is the " + todayDay + "." +
        //  	"\n the passed date is " + testDay + "." +
        //  	"\n " + "These are" + futureBinary + " the same dates")
      };
      $scope.showMemo = false;
      $scope.schedule = false;
      $scope.spinner = false;
      $scope.dt = "";
      $scope.atmRebate = true;
      $scope.paymentType = "Regular";
      $scope.today = new Date();
      $scope.tomorrow = ($scope.today + 86400000);
      $scope.today.setHours(0, 0, 0, 0);
      $scope.paymentDate = "";
      $scope.transferDate = "";
      $scope.atmRebate = true;
      $scope.futureDate = null;
      $scope.reviewed = false;
      $scope.$watch('transferDate', function() {});

      $scope.transfersPromise = function() {
        data.transfersPromise.then(function(data) {
          // This keeps the dates current for transfers
          for (var i = 0; i < 4; i++) {
            var day = new Date();
            day.setDate(day.getDate() + i);
            data[i].created_at = day;
          }

          $rootScope.Transfers = data;

          // This creates a subtotal of scheduled transactions
          $rootScope.Transfers.scheduled = function() {
            var total = 0;
            for (var i = 0; i < data.length; i++) {
              if (data[i].transaction_type == "internal") {
                total = total + data[i].amount;
              }
            }
            return total;
          }

          return $rootScope.Transfers;
        });
      }

      $scope.runme = function(){
        console.log($scope.paymentSinks + "Is the payment sink list")
      }

      $scope.runme();

      $scope.selectAccount = function(account) {
        $scope.selection = account;
      }

      $scope.resetFormsPayment = function(fromAccount, toAccount, amount, date) {

        $scope.fadeIn = false;
        $rootScope.secondarySpinnerPaymentsX = true;
        // $scope.hideSchedule = false;


        setTimeout(function() {
          $scope.$apply(function() {
            $scope.confirmationBox = false;
            $scope.hidePayment = false;
            $scope.transferMortgage = false;
            $scope.fadeOut = false;
            $rootScope.secondarySpinnerPayments = true;
            $rootScope.secondarySpinnerPaymentsX = false;
          });
        }, 1000);

        setTimeout(function() {
          $scope.$apply(function() {
          $rootScope.secondarySpinnerPayments = false;
          $rootScope.Bills.push({
              "name": fromAccount.name,
              "amount": amount,
              "scheduled": true,
              "pay_date": date
          })
            $rootScope.Bills.totalIsUpdating = null;
            $scope.paymentSink = null;
            $scope.paymentDate = null;
            $scope.firstAccount = null;
            $scope.amount = null;
            $scope.secondAccount = null;
          })
        }, 2002);
      }

      $scope.resetFormsTransfers = function(fromAccount, toAccount, amount, date) {

        $scope.fadeIn = false;
        // $scope.hideSchedule = false;

        setTimeout(function() {
          $scope.$apply(function() {
            $scope.confirmationBox = false;
            $scope.transferDate = null;
            $scope.firstAccount = null;
            $scope.amount = null;
            $scope.secondAccount = null;
            $scope.transferMortgage = false;
          });
        }, 500);

        setTimeout(function() {
          $scope.$apply(function() {
            $scope.hideTransfer = false;
            $scope.fadeOut = true;
          });
        }, 1001);

        setTimeout(function() {
          $scope.$apply(function() {
            $scope.fadeOut = false;
            $rootScope.Transfers.totalIsUpdating = null;
            $rootScope.Transfers.push({
              "recipient": toAccount.nickname,
              "amount": amount,
              "transaction_type": "internal",
              "created_at": date
            })
          });
        }, 1002);
      }

      accountRules.watchDrawableFrom($scope, function(drawableFrom) {
        // console.log("Transfer sources", drawableFrom);
        $scope.transferSources = drawableFrom;
      });

      $scope.$watch('transferSource', function() {
        if ($scope.transferSource) {
          accountRules.depositableFrom($scope.transferSource).then(function(sinks) {
            $scope.transferSinks = sinks;
          });
        }
      });

      data.transfersPromise.then(function(transfers) {
        var transactions = transfers.filter(function(transfer) {
          return transfer.transaction_type == 'internal';
        });
      });

      data.billsPromise.then(function(bills) {
        $scope.paymentSinks = bills.filter(function(bill) {
          return bill.name != "Tahoe House Mortgage";
        });
      });

      data.accountsPromise.then(function(accounts) {
        $scope.paymentSources = accountRules.payableFrom(accounts);

        accountRules.watchDrawableFrom($scope, function(drawableFrom) {
          $scope.transferSources = drawableFrom;
        });
        $scope.$watch('transferSource', function() {
          if ($scope.transferSource) {
            accountRules.depositableFrom($scope.transferSource).then(function(sinks) {
              $scope.transferSinks = sinks;
            });
          }
        });
        // This keeps the dates current for payment due dates
        for (var i = 0; i < accounts.length; i++) {
          if (accounts[i].next_payment && accounts[i].next_payment.startsWith("Regular payment due")) {
            var day = new Date();
            day.setDate(day.getDate() + 2);
            var m = day.getMonth() + 1;
            var dd = day.getDate();
            accounts[i].next_payment = "Regular payment due " + m + "/" + dd;
          }
        }
      });

      $scope.toggleAddPayment = function() {
        // MAKE A PAYMENT FORM SHOULD OPEN ONLY WHEN SHOWPAYMENTS ARE CLOSED
        $scope.showAddPayment = false;
      }

      $scope.toggleAddTransfer = function($event) {
        $scope.showAddTransfer = !$scope.showAddTransfer;
        $event.stopPropagation();
      }

      $scope.firstPlaceholder = "Select account";
      $scope.secondPlaceholder = "Please select";
      $scope.date = new Date();
      $scope.yesterday = ($scope.date - 86400000)
      $scope.$watch('firstAccount', function() {
        //console.log("First account selected", $scope.firstAccount);
        if ($scope.firstAccount) {
          //console.log("reset");
          $scope.resetFromError();
        } else {}
      });

      $scope.datedif = Math.ceil(new Date() - ($scope.transferDate) / (60 * 60 * 24 * 1000));

      // This posts a money movement
      $scope.confirmPayment = function(date) {
        $scope.secondAccount ?
          $scope.toRequiredError = false : $scope.toRequiredError = true;
        $scope.amount ?
          $scope.amountRequiredError = false : $scope.amountRequiredError = true;
        $scope.dt ?
          $scope.dt : $scope.dt = new Date();
        // Requires date isn't in the past
        (($scope.dt > $scope.date - 86400000) || $scope.dateRequiredError == true) ?
        $scope.pastDateError = false: $scope.pastDateError = true;
        // Requires "from" account balance is greater than the amount sent
        ($scope.amount && ($scope.amount > $scope.secondAccount.available_balance)) ?
        $scope.exceedsBalanceError = true: $scope.exceedsBalanceError = false;

        if (!$scope.toRequiredError &&
          !$scope.amountRequiredError &&
          !$scope.dateRequiredError &&
          !$scope.pastDateError &&
          !$scope.exceedsBalanceError)

        {
          var today = new Date(),
            // difference = Math.floor((date - today)/(60*60*24*1000)),
            scheduled = true;

          // If the date selected is < 7 days, it is a "scheduled within the next week" in the STATUS CENTER
          // difference < 7 ? scheduled = true : scheduled = false;

          $scope.fadeOut = true;
          $rootScope.Bills.totalIsUpdating = '...updating...';

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.hidePayment = true;
            });
          }, 500);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = true;
              if (!$scope.paymentDate) {
                $scope.paymentDate = $scope.today;
              }
            });
          }, 501);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = false;
            });
          }, 1002);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.confirmationBox = true;
            });
          }, 2003);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.fadeIn = true;
            });
          }, 2004);

        }
      };

      $scope.postTransfer = function(fromAccount, toAccount, amount, date) {
        console.log("in postTransfer...");

        $scope.transferSource ?
          $scope.transferSinkError = false : $scope.transferSinkError = true;
        $scope.amount ?
          $scope.amountRequiredError = false : $scope.amountRequiredError = true;
        $scope.dt ?
          $scope.dateRequiredError = false : $scope.dateRequiredError = true;
        // Requires date isn't in the past
        (($scope.dt > $scope.date - 86400000) || $scope.dateRequiredError == true) ?
        $scope.pastDateError = false: $scope.pastDateError = true;
        // Requires "from" account balance is greater than the amount sent
        ($scope.amount && ($scope.amount > $scope.transferSource.available_balance)) ?
        $scope.exceedsBalanceError = true: $scope.exceedsBalanceError = false;

        if (!$scope.toRequiredError &&
          !$scope.amountRequiredError &&
          !$scope.dateRequiredError &&
          !$scope.pastDateError &&
          !$scope.exceedsBalanceError)
        {
          var today = new Date(),
            difference = Math.floor((date - today) / (60 * 60 * 24 * 1000)),
            scheduled;

          // If the date selected is < 7 days, it is a "scheduled within the next week" in the STATUS CENTER
          difference < 7 ? scheduled = true : scheduled = false;

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.transferReviewPage = true;
            });
          }, 1);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.fadeOut = true;
            });
          }, 500);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = true;
            });
          }, 501);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = false;
            });
          }, 1001);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.fadeIn = true;
            });
          }, 502);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.confirmationBox = true;
            });
          }, 1002);
        };
      };

      $scope.postQuickTransfer = function(fromAccount, toAccount, amount, date) {
        console.log("in postQuickTransfer...");
        // Transform placeholder date into real value as returned by datepicker
        if (!date || date === "Today (now)") {
          date = $scope.today.getMonth()+1 + "/" +
                 $scope.today.getDate() + "/" +
                 $scope.today.getFullYear();
        }

        //if the passed date is NOT today, go straight to confirmation box

        if (!$scope.isToday(date)) {
          console.log("Future-dated, no review");
          $scope.fadeOut = true;
          $rootScope.Transfers.totalIsUpdating = '...updating...';

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.hideTransfer = true;
            });
          }, 500);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = true;
            });
          }, 501);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = false;
            });
          }, 1002);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.confirmationBox = true;
            });
          }, 2003);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.fadeIn = true;
            });
          }, 2004);
        }

        // if the passed date is today, run the review flow and set $scope.reviewed to true
        else if (($scope.isToday(date) && !$scope.reviewed)) {
          console.log("Same day, reviewing");
          $scope.review(date)
        } else {
          console.log("Confirming");

          $scope.firstAccount ?
            $scope.transferSinkError = false : $scope.transferSinkError = true;
          $scope.amount ?
            $scope.amountRequiredError = false : $scope.amountRequiredError = true;
          date ?
            $scope.dateRequiredError = false : $scope.dateRequiredError = true;
          // Requires date isn't in the past
          // ((date > ($scope.date - 86400000)) || $scope.dateRequiredError == true) ?
          // 	$scope.pastDateError = false : $scope.pastDateError = true;
          // Requires "from" account balance is greater than the amount sent
          ($scope.amount && ($scope.amount > $scope.firstAccount.available_balance)) ?
          $scope.exceedsBalanceError = true: $scope.exceedsBalanceError = false;

          if (!$scope.toRequiredError &&
            !$scope.amountRequiredError &&
            !$scope.dateRequiredError &&
            !$scope.pastDateError &&
            !$scope.exceedsBalanceError)

          {
            var today = new Date(),
              difference = Math.floor((date - today) / (60 * 60 * 24 * 1000)),
              scheduled;

            // If the date selected is < 7 days, it is a "scheduled within the next week" in the STATUS CENTER
            difference < 7 ? scheduled = true : scheduled = false;
            // $rootScope.Transfers.totalIsUpdating = '...updating...';

            $scope.fadeIn = false;
            setTimeout(function() {
              $scope.$apply(function() {
                $scope.reviewWindow = false;
              });
            }, 1);

            setTimeout(function() {
              $scope.$apply(function() {
                $scope.spinner = true;
              });
            }, 501);

            setTimeout(function() {
              $scope.$apply(function() {
                $scope.spinner = false;
              });
            }, 502);

            setTimeout(function() {
              $scope.$apply(function() {
                $scope.confirmationBox = true
              });
            }, 1401);

            setTimeout(function() {
              $scope.$apply(function() {
                $scope.fadeIn = true;
                // $rootScope.Transfers.unshift({
                //   "recipient": toAccount.nickname,
                //   "amount": amount,
                //   "transaction_type": "internal",
                //   "created_at": date
                // })

                $scope.reviewed = false;
              });
            }, 1402);
          }
        };
      };

      $scope.$watch('dt', function() {
        //console.log("the date changed to " + $scope.dt);
      })

      $scope.toggleReview = function() {
        $scope.transferReviewPage = false;
      }

      $scope.testQuad = function() {
        //console.log("Quad working")
      }

      $scope.selectedPaymentSink = function(payment) {
        $scope.paymentSink = payment;
      }

      $scope.$watch('paymentSink', function() {
        if ($scope.paymentSink) {
          $scope.paymentPlaceholder = $scope.paymentSink.name;
          $scope.requirePaymentSink = false;
        } else {
          $scope.paymentPlaceholder = "Select account";
        }
      });

      $scope.selectTo = function(account) {
        $scope.depositing = account;
        $scope.depositablePlaceholder = account.nickname;
      }

      $scope.verifyFromSelectedTransfer = function($event) {
        if (!$scope.transferSource) {
          showFromRequiredError()
          console.log($event);
          $event.stopPropagation();
        }
      };

      $scope.verifyFromSelected = function($event) {
        if (!$scope.firstAccount) {
          showFromRequiredError()
          console.log($event);
          $event.stopPropagation();
        }
      };

      $scope.checkIfMortgage = function() {
        try {
          if ($scope.secondAccount.next_payment_amount) {
            if ($scope.secondAccount.next_payment_amount == 'none') {
                $scope.noPaymentDue = true;
                $scope.amount = "";
              } else {
              $scope.transferMortgage = true;
              $scope.amount = $scope.secondAccount.next_payment_amount;
             }
            }
           } catch (err) {
          console.log("yo this error is being HANDLED")
        }
        if (!$scope.secondAccount.next_payment) {
          $scope.transferMortgage = false;
        }
      };

      $scope.populateAmount = function(bill) {
        if (bill.amount && !bill.scheduled) {
          $scope.amount = bill.amount;
        }

        if (bill.paytype === 'electronic') {
          var d = new Date();
          $scope.paymentDate = (d.getMonth() + 1) + '/' + ((d.getDate() + 1))
        }
//REFACTOR THIS TO MAKE THE DATE MOD OF THE NUMBER OF DAYS IN MONTH
        if (bill.paytype === 'paper') {
          var d = new Date();
          $scope.paymentDate = (d.getMonth() + 1) + '/' + ((d.getDate() + 4))
        }
      }

      $scope.toggleMovement = function() {
        if ($scope.showPayments == false) {
          $scope.showPayments = true;
        } else if ($scope.showPayments == true) {
          $scope.showPayments;
        }
      }

      $scope.closeTransfers = function() {
        $scope.showTransfers = false;
        $scope.showAddTransfer = false;
      }

      $scope.closePayments = function() {
        $scope.showPayments = false;
        $scope.showAddPayment = false;
      }

      $scope.openPayments = function() {
        $scope.showPayments = true;
        $scope.showAddPayment = true;
      }

      $scope.addDate = function(num) {
        var myDate = new Date();
        myDate.setDate(myDate.getDate() + num);
        $scope.paymentDate = myDate;
      }

      // hides the schedule screen
      $scope.hideScheduleToReview = function() {
        if (!$scope.toRequiredError &&
          !$scope.amountRequiredError &&
          !$scope.dateRequiredError &&
          !$scope.pastDateError &&
          !$scope.exceedsBalanceError) {
          $scope.fadeOut = true;
          setTimeout(function() {
            $scope.$apply(function() {
              $scope.hideTransfer = true;
            });
          }, 501);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = true;
              if (!$scope.transferDate) {
                $scope.transferDate = $scope.today;
              }
            });
          }, 502);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.spinner = false;
            });
          }, 503);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.reviewWindow = true;
            });
          }, 1503);

          setTimeout(function() {
            $scope.$apply(function() {
              $scope.fadeIn = true;
            });
          }, 1504);
        }
      }

      // validates inputs in the STATUS CENTER add payment / add transfer
      $scope.review = function(date) {

        //console.log("the date is " + date);
        $scope.secondAccount ?
          $scope.toRequiredError = false : $scope.toRequiredError = true;
        $scope.amount ?
          $scope.amountRequiredError = false : $scope.amountRequiredError = true;
        $scope.dt ?
          $scope.dt : $scope.dt = new Date();
        // Requires date isn't in the past
        (($scope.dt > $scope.date - 86400000) || $scope.dateRequiredError == true) ?
        $scope.pastDateError = false: $scope.pastDateError = true;
        // Requires "from" account balance is greater than the amount sent
        ($scope.amount && ($scope.amount > $scope.secondAccount.available_balance)) ?
        $scope.exceedsBalanceError = true: $scope.exceedsBalanceError = false;

        console.log($scope.secondAccount.available_balance > $scope.amount);
        $scope.hideScheduleToReview();
        $scope.reviewed = true;
      }

      $scope.startSpinner = function() {
        $scope.spinner = true;
        return $scope.spinner;
      }

      $scope.endSpinner = function() {
        $scope.spinner = false;
        return $scope.spinner;
      }

      $scope.$watch('spinner', function() {
        //console.log("The spinner has changed!");
      })

      function showFromRequiredError() {
        $scope.fromRequiredError = true;
      }

      $scope.resetErrors = function() {
        $scope.toRequiredError = false;
        $scope.amountRequiredError = false;
        $scope.dateRequiredError = false;
        $scope.fromRequiredError = false;
        $scope.pastDateError = false;
        $scope.exceedsBalanceError = false;
      }

      $scope.resetToError = function() {
        $scope.toRequiredError = false;
      }

      $scope.resetAmountError = function() {
        $scope.fromRequiredError = false;
      }

      $scope.resetFromError = function() {
        $scope.fromRequiredError = false;
      }

      $scope.regularPayment = function(originalamount) {
        $scope.noPaymentDue = false;
        $scope.amount = originalamount;
      }

      $scope.principal = function() {
        $scope.noPaymentDue = true;
        $scope.amount = "";
      }

      $scope.populateDate = function(acct) {
        $scope.paymentDate = new Date();
      }
    }
  ])
  .controller("SummaryCategoryController", ["$scope", "$location", function($scope, $location) {}])

.controller("SummaryAccountController", ["$scope", "$location", "$uibModal",
  function($scope, $location, $uibModal) {

    $scope.openOverpanel = function(overpanelClass) {
      $uibModal.open({
        templateUrl: 'views/partials/overpanel.html',
        controller: ["$scope", "$modalInstance", "overpanelClass",
          function($scope, $modalInstance, overpanelClass) {
            $scope.overpanelClass = overpanelClass
          }
        ],
        backdrop: 'static',
        keyboard: false,
        size: 'overpanel',
        resolve: {
          overpanelClass: function() {
            return overpanelClass;
          }
        }
      });
    }

    $scope.gotoAccount = function() {
      if (!$scope.account.is_investments) {
        $location.path("/accounts/" + $scope.account.acct_no.substr(1));
      } else {
        $scope.openOverpanel('pershing');
      }
    }
  }
])

.controller("ViewAccountRoute", ["$scope", "$rootScope", "$routeParams", "MockData", function($scope, $rootScope, $routeParams, data) {
    $scope.transfersPromise = data.transfersPromise;
    data.transactionsPromise.then(function(transactions) {
      $scope.Transactions = transactions;
    });
    data.accountsPromise.then(function(accounts) {
      var matching = accounts.filter(function(account) {
        return account.acct_no.substr(1) == $routeParams.accountNumber;
      });
      if (matching.length > 0) {
        $scope.current_account = matching[0];
      }
    });
  }])
  .controller("AccountDropDownSelector", ["$scope", "MockData", function($scope, data) {
    data.accountsPromise.then(function(accounts) {
      $scope.Accounts = accounts;

    });


  }])
  .controller("TransactionFilterController", ["$scope", function($scope) {
    $scope.displayFilters = false;
    $scope.displaySearch = false;

    $scope.toggleFilter = function() {
      $scope.displayFilters = !$scope.displayFilters;
    }

    $scope.toggleSearch = function() {
      $scope.displaySearch = !$scope.displaySearch;
    }
  }])

.controller("AccountsController", ["$scope",
  function($scope) {

    $scope.showAccountDetails = false;
    $scope.showAccountActivity = true;
    $scope.showAccountNumber = false;

    $scope.date = new Date();

    $scope.routingTooltip = "Use this routing number to set up direct deposits, incoming transfers, outgoing payments to other financial institutions, and for all incoming wire transfers."
  }
])

.controller("AccountDropDownController", ["$scope", "$rootScope", function($scope, $rootScope) {
  $scope.selectAccount = function(account) {
    $scope.selection = account;
  }

  $scope.$watch('selection', function() {
    if ($scope.selection && $scope.selection['nickname']) {
      $scope.selectedText = $scope.selection.nickname;
    } else {
      $scope.selectedText = $scope.placeholder;
    }
  });
}])

  .controller("OnDemandCtrl", ["$scope", function($scope) {
    $scope.onDemandTitle = "I would like to...";
    $scope.onDemandOptions = [
      {
        name: 'Order checks and deposit slips',
        isSelected: true
      },
      {
        name: 'Activate fraud alerts',
        isSelected: false
      },
      {
        name: 'Let you know about my travel plans',
        isSelected: false
      },
      {
        name: 'Put a hold on my debit card',
        isSelected: false
      }
    ]

    $scope.frequencyOptions = [
      {
        name: 'Once',
        isSelected: true
      },
      {
        name: 'Weekly',
        isSelected: false
      },
      {
        name: 'Monthly',
        isSelected: false
      },
      {
        name: 'Bi-monthly',
        isSelected: false
      },
      {
        name: 'Semi-annually',
        isSelected: false
      },
      {
        name: 'Annually',
        isSelected: false
      }
    ]
    $scope.findSelected = function(array) {
      for(var i = 0; i < array.length; i++){
        if(array[i].isSelected === true){
          return array[i].name
        }
      }
    }

    $scope.changeSelected = function(array, selectedIndex){
      for(var i = 0; i < array.length; i++){
        array[i].isSelected = false;
      }
      array[selectedIndex].isSelected = true;
    }
  }])
  .controller("MarketingCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.marketingOptions = [
      {
        title: "Private Wealth Management",
        description: "At " + $rootScope.bankType.short + " Bank, we understand that every client is unique. Customizing solutions with a firm commitment to responsiveness and action, our goal is to deliver exceptional service to you each and every time."
      },
      {
        title: "Certificate of Deposit promotion",
        description: "Special limited time CD offer good through Jan 1st!  Earn .25% over our published CD yields."
      }
    ]

    $scope.rotateCarousel = function(array, direction) {
      if(direction = "right") {
        array.unshift(array.pop(0))
      }
      else if(direction == "left") {
        array.push(array.pop(0))
      }
      else {
        console.log("Wasn't left or right!")
      }
    }
  }])
  .controller("ContactCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.contactTitle = "Contact " + $rootScope.bankType.long;
    $scope.contactOptions = [
      {
        name: "Banking Online",
        phone: "(888)-372-4891",
        tooltipDescription:
          "<p>Questions about Banking Online?</p>" +
          "<p>Get help with your profile including username &amp; password," +
          " your accounts and other online services.</p>" +
          " Monday &ndash; Friday 5am &ndash; 9pm<br />" +
          " Saturday 6am &ndash; 8pm<br/> " +
          " Sunday 7am &ndash; 5pm"
      },
      {
        name: "Loan Servicing",
        phone: "(888)-408-0288",
        tooltipDescription:
          "<p>Questions about Loans?</p>" +
          "<p>Get help with your existing loans, including" +
          " payments and advances, verification of mortgage and" +
          " general loan inquiries</p>" +
          " Monday-Friday 5am - 9pm <br/>"
      },
      {
        name: "Customer Care",
        phone: "(888)-408-0288",
        tooltipDescription:
          "<p>Customer Care Questions?</p>" +
          "<p>Get help with your accounts" +
          " including varying transactions," +
          " ATM card increases, and other" +
          " general account inquiries</p>" +
          " Monday &ndash; Friday 5am &ndash; 9pm<br/>" +
          " Saturday 6am &ndash; 8pm<br/> " +
          " Sunday 7am &ndash; 5pm"
      }
    ]
  }])
