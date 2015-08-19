// Import the annotations
import {
	NgDirective,
	Register
} from 'annotations';

import {translate} from 'i18n';

@NgDirective({
	module: 'EAPP',
	name: 'eapp-menu',
	inject: ['MenuActions','MenuStore'],
	ddo: {
		replace: true,
		template:`
		<div>
			<ul class="top">
				<li ng-repeat="items in menu.menu">
					<a ng-click="menu.go(items.url);menu.toggle(items.child)">{{items.name}}</a>
					<ul ng-show="subview.active" ng-repeat="subview in items.child" ng-init="subview.active = false;">
						<a ng-click="menu.go(subview.url)">{{subview.name}}</a>
					</ul>
				</li>
			</ul>
		</div>
		`,
		controllerAs: 'menu',
		scope: {},
	}
})
class EappMenu{
	constructor() {
		this.menu = require('./menuDef');
	}

	go(url){
		this.MenuActions.go(url);
	}

	toggle(childs){
		childs.forEach( c => c.active = !c.active );
	}
}
Register(EappMenu)
