import React from 'react'
import { fabStyle } from '../../resources/Styles'
import { Icon , Button } from 'semantic-ui-react'
import { PUJYellow } from '../../resources/Colors'

class FAB extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		const { left , top , icon="plus" , color=PUJYellow} = this.props
		return(
			<Button
				circular
				style={fabStyle(color,left,top)}
				icon={<Icon name={icon} />}
				size={'huge'}
				onClick={this.props.onClick}
			/>
		);
	}
}

export default FAB;
