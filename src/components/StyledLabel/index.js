import React from 'react'
import { Label } from 'semantic-ui-react'
import { labelStyle } from '../../resources/Styles'

class StyledLabel extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<Label
				style={labelStyle(this.props.color,this.props.textColor)}
				content={this.props.content}
				attached={this.props.attached}
			/>
		);
	}
}

export default StyledLabel;
