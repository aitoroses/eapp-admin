// Import the configuration file
//import './module.conf';

// Import Items module
import './Items';

// Import Countries module
import './Countries';

// Import Tas module
import './Tas';

// Import Items Permission module
import './ItemsPermission';

// Import Disclaimers module
import './Disclaimers';

// Import Flows module
import './Flows';

// Import Stores
import './Stores';

// Import Utils
import './Utils';

// Mocked Identity
angular.module('main').service('IdentityStore', function() {
	this.getUserLanguage = function() {};
})