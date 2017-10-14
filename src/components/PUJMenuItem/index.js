import React from 'react'
import { Menu , Icon } from 'semantic-ui-react'

class PUJMenuItem extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleClick = () =>{
		const { name , id } = this.props;
		this.props.onClick(name,id)
	}

	render(){
		const { name , icon } = this.props
		return(
			<Menu.Item name={name} onClick={this.handleClick}>
				<Icon name={icon} />
				{name}
			</Menu.Item>
		);
	}
}

export default PUJMenuItem;
