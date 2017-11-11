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
		const color = this.props.color? this.props.color : PUJYellow
		return(
			<Button
				circular
				style={fabStyle(color)}
				icon={<Icon name={'plus'} />}
				size={'huge'}
				onClick={this.props.onClick}
			/>
		);
	}
}

export default FAB;
