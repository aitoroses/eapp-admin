import atom from 'lib/state';
import TableController from './TableController';

class ManageHandler extends React.Component {

	state = {
    width:0
  }

	getMeasures() {
    return {
      width: Math.floor($( "#routerComponent" ).width()*0.8)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateMeasures);
		this.setState(this.getMeasures());
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.updateMeasures);
  }

  updateMeasures() {

      console.log("New width of routerComponent: "+this.getMeasures().width);
      this.setState(this.getMeasures())

  }

	render() {
		return <TableController width={this.state.width} table={this.props.params.table}></TableController>
	}
}


export default ManageHandler;
