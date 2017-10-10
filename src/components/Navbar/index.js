import React from 'react'
import { navStyle } from '../../resources/Styles'
import { Menu , Icon } from 'semantic-ui-react'

class Navbar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			active: false
		}
	}

	onMenu = () =>{
		this.props.onMenuClick()
	}

	render(){
		return(
			<Menu
				fixed="top"
				size="huge"
				borderless
				inverted
				style={ navStyle }
				>
				<Menu.Item onClick={this.onMenu} >
					<Icon name="content" />
				</Menu.Item>
				<Menu.Item>
					CampusFinder
				</Menu.Item>
			</Menu>
		);
	}
}

export default Navbar;
