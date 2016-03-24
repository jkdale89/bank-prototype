// 'use strict';

/* Directives */

// Custom directives. To make template changes, visit views/
  // KEEP THIS IN ALPHABETICAL ORDER, please :)

(function() {
  var
    accountsDashboard = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/accounts-dashboard.html',
        replace: false,
        controller: 'AccountDropDownSelector',
        link: function($scope, element, attr) {}
      }
    },

    accountDropdown = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/account-dropdown.html',
        controller: 'StatusCenterController',
        scope: {
          placeholder: '@',
          accounts: "=",
          selection: "=?",
          paymentDate: "=?",
          reviewTerm: "@",
          atmRebate: '@'
        },
        replace: true
      }
    },

    accountQuadSummary = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/account-quad-summary.html',
        replace: false,
        scope: {
          'account': '=',
          'subtext': '@',
          'reviewTerm': '@',
          'atmRebate': '@'
        }
      }
    },

    airdatepicker = function() {
      return {
        restrict: "EA",
        require: "ngModel",
        link: function(scope, elem, attrs, ngModelCtrl) {
          var updateModel = function(dateText) {
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(dateText);
            });
          };
          var options = {
            minDate: new Date(),
            autoClose: true,
            navTitles: {days: 'MM <i>yyyy</i>'},
            nextHtml: "<svg><path d='M 14,10 l 5,6 l -5,6'></path></svg>",
            prevHtml: "<svg><path d='M 17,10 l -5,6 l 5,6'></path></svg>",
            onSelect: function(dateText) {
              updateModel(dateText);
            }
          };
          elem.datepicker(options);
        }
      }
    },

    billDropdown = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/billdropdown.html',
        replace: false,
        scope: {
          options: "=",
          placeholder: '@',
          heading: '@',
          bill: '='
        },
        transclude: true
      }
    },

    contact = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/contact.html',
        replace: false,
        controller: 'ContactCtrl',
        link: function($scope, element, attr) {}
      };
    },

    customDropdown = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/custom-dropdown.html',
        controller: 'OnDemandCtrl',
        scope: {
          list: '=?',
          item: '=?',
          placeholder: '@',
          attribute: "=?"
        },
        replace: false
      }
    },

    chart = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/pie.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    footer = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/navigation/footer.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    fundPayment = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/fund-payment.html',
        controller: 'StatusCenterController',
        replace: false,
        scope: {
          'paymentDate': '=?',
          'amount': '=?',
          'dt': '=?',
          'showAddPayment': '@',
          'showPayments': '@',
          'fromRequiredError': '=?errorToggle',
          'schedule': '@',
          'atmRebate': '@',
          'reviewTerm': "@"
        }

      }
    },

    fundTransfer = function() {
      return {
        restrict: 'E',
        templateUrl: 'views/partials/fund-transfer.html',
        controller: 'StatusCenterController',
        replace: false,
        transclude: true,
        scope: {
          'onCancel': '&',
          'firstAccounts': '=?',
          'firstAccount': '=?',
          'secondAccounts': '=?',
          'secondAccount': '=?',
          'amount': '=?',
          'dt': '=?',
          'fromRequiredError': '=?errorToggle',
          'schedule': '@',
          'reviewTerm': "@"
        }
      }
    },

    gutter = function() {
      return {
        restrict: 'EA',
        template: "<div class='row'>" +
          "<div class='horizontal-gutter'></div>" +
          "</div>"

      }
    },

    marketing = function() {
      return {
        controller: 'MarketingCtrl',
        restrict: 'E',
        templateUrl: 'views/partials/marketing.html'
      }
    },

    marketingAlt = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/marketing-alt.html',
        replace: false
      }
    },

    navbar = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/navigation/navbar.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    mortgage = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/mortgage.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    myteam = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/myteam.html',
        replace: false,
        controller: 'MainCtrl',
        link: function($scope, element, attr) {}
      };
    },

    myteamAlt = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/myteam-alt.html',
        replace: false,
        controller: 'MainCtrl',
        link: function($scope, element, attr) {}
      };
    },

    ondemand = function() {
      return {
        controller: 'OnDemandCtrl',
        restrict: 'EA',
        templateUrl: 'views/partials/ondemand.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    payments = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/payments.html',
        controller: "StatusCenterController",
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    settingsNavigation = function(){
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/navigation/settingsNavigation.html',
        controller: 'NavCtrl',
        replace: false
      }
    },

    siteNavigation = function(){
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/navigation/siteNavigation.html',
        controller: 'NavCtrl',
        replace: false
      }
    },

    snapshot = function() {
        return {
          restrict: 'EA',
          templateUrl: 'views/partials/snapshot.html',
          replace: false,
          link: function($scope, element, attr) {}
        }
      },

    statusCenter = function() {
      return {
        restrict: 'EA',
        controller: 'StatusCenterController',
        templateUrl: 'views/partials/status-center.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    statusCenterAlt = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/status-center-alt.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    summary = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/summary.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    summaryAlt = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/summaryAlt.html',
        replace: false,
        link: function($scope, element, attr) {}
      }
    },

    transfers = function() {
      return {
        restrict: 'EA',
        templateUrl: 'views/partials/transfers.html',
        controller: 'StatusCenterController',
        replace: false,
        link: function($scope, element, attr) {}
      }
    }


  // This maps the above variables to their own elements, so we can use "<chart></chart>"
  // to insert the pie.html into the element. This gives direction to our html and separates our concerns
  angular.module('Directives', [])
    .directive('accountsDashboard', accountsDashboard)
    .directive('airdatepicker', airdatepicker)
    .directive('billDropdown', billDropdown)
    .directive('chart', chart)
    .directive('contact', contact)
    .directive('customDropdown', customDropdown)
    .directive('accountDropdown', accountDropdown)
    .directive('footer', footer)
    .directive('fundPayment', fundPayment)
    .directive('gutter', gutter)
    .directive('mortgage', mortgage)
    .directive('marketing', marketing)
    .directive('marketingAlt', marketingAlt)
    .directive('myteam', myteam)
    .directive('myteamAlt', myteamAlt)
    .directive('navbar', navbar)
    .directive('ondemand', ondemand)
    .directive('payments', payments)
    .directive('settingsNavigation', settingsNavigation)
    .directive('siteNavigation', siteNavigation)
    .directive('snapshot', snapshot)
    .directive('statusCenter', statusCenter)
    .directive('statusCenterAlt', statusCenterAlt)
    .directive('summary', summary)
    .directive('summaryAlt', summaryAlt)
    .directive('transfers', transfers)
    .directive('fundTransfer', fundTransfer)
    .directive('accountQuadSummary', accountQuadSummary)
}());
