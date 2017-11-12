import React from 'react'

class LimitedCalculatorBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	render(){
		return(<div/>);
	}
}

export default LimitedCalculatorBody;
