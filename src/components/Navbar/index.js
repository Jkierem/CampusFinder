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

	renderContent = () => {
		const { noButton } = this.props
		if( noButton === true ){
			return 'Menu Principal'
		}else{
			return 'CampusFinder'
		}
	}

	render(){
		const { noButton } = this.props
		return(
			<Menu
				fixed="top"
				size="huge"
				borderless
				inverted
				style={ navStyle }
				>
					{ !noButton && <Menu.Item onClick={this.onMenu} >
						<Icon name="content" />
					</Menu.Item>}
					<Menu.Item>
						{this.renderContent()}
					</Menu.Item>
			</Menu>
		);
	}
}

export default Navbar;
