import {Route, NotFoundRoute} from 'react-router'
import Router from 'react-router'

import NotFound from './NotFound'
import App from './AppHandler'
import Playground from './Playground'
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
