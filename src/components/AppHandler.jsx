import {RouteHandler} from 'react-router';
import MenuComponent from './MenuComponent';

// Main Handler
class Handler extends React.Component {
  render () {
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
}

export default Handler;
