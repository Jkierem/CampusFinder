import React from 'react'
import StyledLabel from '../StyledLabel'
import * as Colors from '../../resources/Colors'

class PUJLabel extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<StyledLabel
				content={this.props.content}
				textColor={Colors.PUJWhite}
				color={Colors.PUJYellow}
				attached={this.props.attached}
			/>
		);
	}
}

export default PUJLabel;
