import React from 'react'
import WorkingOnIt from '../WorkingOnIt'

class CalculatorBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	render(){
		return(<WorkingOnIt/>);
	}
}

export default CalculatorBody;
