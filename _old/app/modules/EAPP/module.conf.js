import {Module} from 'helpers';

 /**
 * Module creation
 */
 var m = new Module('EAPP');

/**
 * States configuration
 */
m.config(function($stateProvider, $urlRouterProvider) {

  // Define application states
  $stateProvider

  // Items
  .state('items', {
    url: '/items',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<items-component></items-component>',
      }
    }
  })

  // Countries
  .state('countries', {
    url: '/countries',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<countries-component></countries-component>'
      }
    }
  })

  // Therapeutical Areas
  .state('therapeuticalAreas', {
    url: '/therapeuticalAreas',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<tas-component></tas-component>'
      }
    }
  })

  // Items Permission
  .state('itemsPermission', {
    url: '/itemsPermission',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<items-permission-component></items-permission-component>'
      }
    }
  })

  // Disclaimers
  .state('disclaimers', {
    url: '/disclaimers',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<disclaimers-component></disclaimers-component'
      }
    }
  })

  // Flows
  .state('flows', {
    url: '/flows',
    views: {
      c1: {
        template: '<eapp-menu></eapp-menu>'
      },
      c2: {
        template: '<flows-component></flows-component>'
      }
    }
  })

  // 404
  .state('404 Error', {
    url: '/404',
    views: {
      c2: {
        template: 'Not found',
      }
    }
  })

});


/**
 * Extra configuration
 */
 m.config(function($datepickerProvider, $collapseProvider) {

   /* Datepicker provider defaults configuration */
   angular.extend($datepickerProvider.defaults, {
     dateFormat: 'MM-dd-yyyy'
   });

   /* Collapse provider configuration */
   angular.extend($collapseProvider.defaults, {
     startCollapsed: true
   });

 });
