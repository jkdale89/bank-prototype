'use strict';

/* Filters */
angular.module('Filters', [])

.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('asDate', function() {
  return function(input) {
    return new Date(input);
  }
})

/* Returns just the fractional amount */
.filter('cents', function() {
  return function(input) {
    return input ? (input.substring(input.indexOf('.') + 1)) : null;
  };
})

.filter('dollars', function() {
  return function(input) {
    return input ? (input.substring(0, input.indexOf('.'))) : null;
  };
})
