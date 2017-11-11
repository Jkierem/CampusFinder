import React from 'react'
import FAB from '../FAB'

class ScheduleBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	render(){
		return(<FAB/>);
	}
}

export default ScheduleBody;
