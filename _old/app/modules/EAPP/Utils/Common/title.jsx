class Title extends React.Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired
	}

	constructor(props){
		super(props);
	}

	render() {
		return (
        <div className="title-margin">
          <div className="title-center panel-body">
            <div>Admin Tool</div>
            <div className="color_grey">{this.props.title}</div>
          </div>
        </div>
      )
	}

}

export default Title;