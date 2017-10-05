import React from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<Menu
				fixed="top"
				size="huge"
				borderless
				>
				<Menu.Item>
					CampusFinder
				</Menu.Item>
			</Menu>
		);
	}
}

export default Navbar;
