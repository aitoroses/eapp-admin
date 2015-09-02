import {Route, NotFoundRoute} from 'react-router'
import Router from 'react-router'

// TODO: Investigar por que es necesaria esta llamada en primer lugar
import API from 'core/API'

import NotFound from './NotFound'
import App from './AppHandler'
import Playground from './playground'
import ManageHandler from './ManageHandler'

// Routes
var routes =

  <Route handler={App}>
    {/* Admin Routes *//* Admin Routes */}
    <Route name='manage' path='/manage/:table' handler={ManageHandler} />
    <Route name='playground' path='/playground' handler={Playground} />
    <NotFoundRoute handler={NotFound}/>
  </Route>

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'))
})
