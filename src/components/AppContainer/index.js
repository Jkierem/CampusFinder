import React from 'react'
import Navbar from '../Navbar'
import { Menu , Icon , Sidebar , Segment } from 'semantic-ui-react'
import { containerStyle } from '../../resources/Styles'

class AppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible: false
		}
	}

	toggleMenu = () =>{
		this.setState({
			visible: !this.state.visible
		})
	}

	handlePusherClick = () =>{
		if( this.state.visible)
			this.toggleMenu()
	}

	renderMenu = () =>{
		const { user , onSignIn , onProfile , onSignOut } = this.props;
		if( user != null ){
			//logged in menu
			let items = []
			items.push(
				<Menu.Item name='profile' onClick={onProfile} key={Math.random()}>
					<Icon name='user outline' />
					Profile
				</Menu.Item>
			)
			items.push(
				<Menu.Item name='something'  key={Math.random()}>
					<Icon name='home' />
					Home
				</Menu.Item>
			)
			items.push(
				<Menu.Item name='signout' onClick={onSignOut} key={Math.random()}>
					<Icon name='log out' />
					Sign out
				</Menu.Item>
			)
			return items;
		}else{
			//login
			return(
				<Menu.Item name='login' onClick={onSignIn}>
					<Icon name='user outline' />
					Sign in
				</Menu.Item>
			)
		}
	}

	render(){
		const { visible } = this.state
		return(
			<div>
				<Navbar onMenuClick={this.toggleMenu}/>
				<div style={ containerStyle }>
					<Sidebar.Pushable as={Segment}>
		          <Sidebar
								as={Menu} animation='overlay'
								width='thin' visible={visible}
								icon='labeled'
								vertical borderless>
								{this.renderMenu()}
		          </Sidebar>
		          <Sidebar.Pusher dimmed={visible} onClick={this.handlePusherClick}>
								{this.props.children}
		          </Sidebar.Pusher>
		        </Sidebar.Pushable>
				</div>
			</div>
		);
	}
}

export default AppContainer;
