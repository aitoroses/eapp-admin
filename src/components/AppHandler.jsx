import {RouteHandler} from 'react-router';
import MenuComponent from './MenuComponent';
import atom from 'lib/state';

// Main Handler
class Handler extends atom.Component {

  render () {
    return (
      <div className="container no-padding">
        <div className="row">
          <div className="menu-container no-padding">
            <MenuComponent />
          </div>
          <div id="routerComponent" className="col-xs-10 no-padding div-container">
            <RouteHandler/>
          </div>
        </div>
      </div>
    )
  }
}

export default Handler;
