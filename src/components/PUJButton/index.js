import React from 'react'
import { Button } from 'semantic-ui-react'
import { labelStyle } from '../../resources/Styles'

class PUJButton extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { label , color , onClick , textColor , fluid , type } = this.props
		return(
			<Button
				style={ labelStyle(color, textColor) }
				content={label}
				onClick={onClick}
				fluid={fluid}
				type={type}
			/>
		);
	}
}

export default PUJButton;
