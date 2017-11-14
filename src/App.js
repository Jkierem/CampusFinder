import React from 'react'
import AppContainer from './components/AppContainer'
import CalculatorBody from './components/CalculatorBody'
import FavoritesBody from './components/FavoritesBody'
import HomeBody from './components/HomeBody'
import LimitedCalculatorBody from './components/LimitedCalculatorBody'
import MapBody from './components/MapBody'
import ProfileBody from './components/ProfileBody'
import RouteBody from './components/RouteBody'
import RegisterBody from './components/RegisterBody'
import ScheduleBody from './components/ScheduleBody'
import SearchBody from './components/SearchBody'
import SignInBody from './components/SignInBody'
import UserhomeBody from './components/UserhomeBody'
import { getBuildings } from './resources/Buildings'
import { commonBackground } from './resources/Styles'
import { Route , Switch , Redirect , withRouter } from 'react-router-dom'
import * as Pages from './resources/Pages'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user: null,
			visible: false,
			noButton: true,
			buildings: null
		}
	}

	componentWillMount = () =>{
		getBuildings().then((value) => {
			this.setState({
				buildings: value
			})
		})
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

	handleMenuButton = ( has ) =>{
		this.setState({ noButton : has })
	}

	onSuccessfulSignin = ( user ) =>{
		this.setState({
			user: user,
			noButton: true
		})
	}

	onDeleteUser = () =>{
		this.setState({
			user : null,
			noButton : false
		})
	}

	onMenuItemClick = (item,id) =>{
		if( id === Pages.SIGNOUT){
			this.setState({
				user : null,
				noButton : false
			})
			this.onToggleMenu()
		}else{
			if( id !== Pages.REGISTER ){
				this.onToggleMenu()
			}
		}
		this.props.history.push(id.path);
	}

	conditionalRendering = () =>{
		const { user , buildings , username } = this.state;
		const { handleRegister , onSuccessfulSignin , handleMenuButton } = this;
		if( user == null ){
			//paginas que se pueden ver si no estas loggeado
			return (
				<Switch>
					<Route exact path='/home' render={ (props) => {return <HomeBody {...props} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/inicio' render={ (props) => {return <SignInBody {...props} onRegister={handleRegister} onSuccess={onSuccessfulSignin} handleMenuButton={handleMenuButton} />} }/>
					<Route exact path='/calculadora' render={ (props) => {return <LimitedCalculatorBody {...props} handleMenuButton={handleMenuButton} />} }/>
					<Route exact path='/mapa' render={ (props) => {return <MapBody {...props} handleMenuButton={handleMenuButton} />} }/>
					<Route exact path='/registro' render={ (props) => {return <RegisterBody {...props} username={username} handleMenuButton={handleMenuButton} onSuccess={onSuccessfulSignin}/>} }/>
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>
			)
		}else{
			//paginas con usuario loggeado
			return(
				<Switch>
					<Route exact path='/home' render={ (props) => {return <UserhomeBody {...props} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/perfil' render={ (props) => {return <ProfileBody {...props} user={user} handleMenuButton={handleMenuButton} onDelete={this.onDeleteUser}/>} }/>
					<Route exact path='/buscar' render={ (props) => {return <SearchBody {...props} buildings={buildings} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/calcularRuta' render={ (props) => {return <RouteBody {...props} user={user} buildings={buildings} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/favoritos' render={ (props) => {return <FavoritesBody {...props} user={user} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/horario' render={ (props) => {return <ScheduleBody {...props} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/calculadora' render={ (props) => {return <CalculatorBody {...props} handleMenuButton={handleMenuButton}/>} }/>
					<Route exact path='/mapa' render={ (props) => {return <MapBody {...props} handleMenuButton={handleMenuButton} />} }/>
					<Route render={ () => {return <Redirect to={'/home'}/>} }/>
				</Switch>)
		}
	}

	render(){
		const { user , visible , noButton } = this.state;
		const { onMenuItemClick , onToggleMenu , conditionalRendering } = this;
		return(
			<AppContainer
				onMenuItemClick={onMenuItemClick}
				user={user}
				visible={visible}
				toggleMenu={onToggleMenu}
				noButton={noButton} >
				<div style={ commonBackground }>
					{conditionalRendering()}
				</div>
			</AppContainer>
		);
	}
}

export default withRouter(App);
