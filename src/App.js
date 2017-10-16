import React from 'react'
import AppContainer from './components/AppContainer'
import CalculatorBody from './components/CalculatorBody'
import FavoritesBody from './components/FavoritesBody'
import HomeBody from './components/HomeBody'
import MapBody from './components/MapBody'
import RouteBody from './components/RouteBody'
import ProfileBody from './components/ProfileBody'
import RegisterBody from './components/RegisterBody'
import ScheduleBody from './components/ScheduleBody'
import SearchBody from './components/SearchBody'
import SignInBody from './components/SignInBody'
import UserhomeBody from './components/UserhomeBody'
import { commonBackground } from './resources/Styles'
import * as Pages from './resources/Pages'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user: null,
			page: Pages.HOME,
			visible: false,
			noButton: true,
			buildings: this.props.buildings
		}
	}

	onToggleMenu = () =>{
		this.setState({
			visible: !this.state.visible
		})
	}

	handleRegister = ( username ) =>{
		this.setState({ username : username})
		this.onMenuItemClick("Registro",Pages.REGISTER );
	}

	homeClick = ( id ) =>{
		this.setState({
			page: id,
			noButton: false
		})
		//console.log(this.state);
	}

	onSuccessfulSignin = ( username ) =>{
		this.setState({
			user: username,
			page: Pages.USERHOME,
			noButton: true
		})
	}

	onMenuItemClick = (item,id) =>{
		//console.log(item)
		if( id === Pages.SIGNOUT){
			this.setState({
				page : Pages.SIGNIN,
				user : null,
				noButton : false
			})
		}else{
			this.setState({
				page: id,
				noButton : false
			})
			if( id !== Pages.REGISTER ){
				this.onToggleMenu()
			}
		}
	}

	renderContent = () =>{
		const { page , user , username , buildings } = this.state
		switch (page) {
			case Pages.HOME:
				return(<HomeBody onItemClick={this.homeClick} />)
			case Pages.ROUTE:
				return(<RouteBody buildings={buildings} />)
			case Pages.SIGNIN:
				return(<SignInBody onRegister={this.handleRegister} onSuccess={this.onSuccessfulSignin}/>)
			case Pages.CALC:
				return(<CalculatorBody />)
			case Pages.MAP:
				return(<MapBody />)
			case Pages.PROFILE:
				return(<ProfileBody user={user} />)
			case Pages.SEARCH:
				return(<SearchBody buildings={buildings} />)
			case Pages.REGISTER:
				return(<RegisterBody username={username} />)
			case Pages.FAVORITES:
				return(<FavoritesBody />)
			case Pages.SCHEDULE:
				return(<ScheduleBody />)
			case Pages.USERHOME:
				return(<UserhomeBody onItemClick={this.homeClick}/>)
			default:
				return(<HomeBody onItemClick={this.onMenuItemClick} />)
		}

	}

	render(){
		const { user , visible , noButton } = this.state;
		const { onMenuItemClick , onToggleMenu , renderContent } = this;
		return(
			<AppContainer
				onMenuItemClick={onMenuItemClick}
				user={user}
				visible={visible}
				toggleMenu={onToggleMenu}
				noButton={noButton} >
				<div style={ commonBackground }>
					{renderContent()}
				</div>
			</AppContainer>
		);
	}
}

export default App;
