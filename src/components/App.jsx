import {Route, NotFoundRoute} from 'react-router';
import Router from 'react-router';
import NotFound from './NotFound';
import App from './AppHandler';

import Playground from './Playground';
import ManageHandler from './ManageHandler';
// Routes
var routes = (

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
    <Route name="manage" path="/manage/:table" handler={ManageHandler} />
    <Route name="playground" path="/playground" handler={Playground} />

    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
