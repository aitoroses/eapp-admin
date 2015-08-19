var Router = require('react-router');
var {
  Route,
  RouteHandler,
  NotFoundRoute,
} = Router

// 404
var NotFound = React.createClass({
  render: function () {
    return <p>Not found route.</p>;
  }
});

// Component Import
var {
 EappMenu,
 // Items,
 Countries,
 ItemsPermission,
 Tas,
 Disclaimers,
 MenuComponent
} = require('components');

// var Items = require('EAPP/Items/ItemsComponent/ItemsComponent');
// var ItemsTessel = require('EAPP/ItemsTessel/ItemsComponent/ItemsComponent');
// var Countries = require('EAPP/Countries/CountriesComponent/CountriesComponent');
// var CountriesTessel = require('EAPP/CountriesTessel/CountriesComponent/CountriesComponent');
// var Tas = require('EAPP/Tas/TasComponent/TasComponent');
// var ItemsPermission = require('EAPP/ItemsPermission/ItemsPermissionComponent/ItemsPermissionComponent');
// var Disclaimers = require('EAPP/Disclaimers/DisclaimersComponent/DisclaimersComponent');
// var Flows = require('EAPP/Flows/FlowsComponent/FlowsComponent');

import Playground from 'components/playground';

// Main Handler
var App = React.createClass({
  render: function () {
    return (
      <div className="container no-padding">
        <div className="row">
          <div className="col-xs-2 no-padding">
            <MenuComponent />
          </div>
          <div className="col-xs-10 no-padding">
            <RouteHandler/>
          </div>
        </div>
      </div>
    )
  }
});


// Routes
module.exports = (

  <Route handler={App}>

    {/* Admin Routes */}
    {/*<Route name="items" path="items" handler={Items} />
    <Route name="items-tessel" path="items-tessel" handler={ItemsTessel} />
    <Route name="countries" path="countries" handler={Countries} />
    <Route name="countries-tessel" path="countries-tessel" handler={CountriesTessel} />
    <Route name="tas" path="therapeuticalAreas" handler={Tas} />
    <Route name="ItemsPermission" path="ItemsPermission" handler={ItemsPermission} />
    <Route name="Disclaimers" path="Disclaimers" handler={Disclaimers} />
    <Route name="Flows" path="Flows" handler={Flows} />*/}

    <Route name="playground" path="playground" handler={Playground} />

    <NotFoundRoute handler={NotFound}/>
  </Route>
);
