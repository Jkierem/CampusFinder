import React from 'react'

class ErrorText extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { text } = this.props
		return(<div style={{color:"#D00", display:"inline"}}>{text}</div>);
	}
}

export default ErrorText;
