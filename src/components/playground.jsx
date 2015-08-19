import atom from 'lib/state';

import FlowsCreator from './flows/FlowsCreator';

class Playground extends atom.Component {
	render() {
		return <FlowsCreator />
	}
}


export default Playground;
