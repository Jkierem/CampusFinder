import React from 'react'
import Navbar from '../Navbar'
import PUJMenuItem from '../PUJMenuItem'
import { Menu , Sidebar , Segment } from 'semantic-ui-react'
import { containerStyle } from '../../resources/Styles'
import * as Pages from '../../resources/Pages'

class AppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={ redirect : false }
	}

	handlePusherClick = () =>{
		const { visible , toggleMenu } = this.props
		if( visible ){
			toggleMenu()
		}
	}

	handleMenuItemClick = (item,id) =>{
		this.props.onMenuItemClick(item,id)
	}

	renderMenu = () =>{
		const { user } = this.props;
		const { handleMenuItemClick } = this;
		let items = []

		if( user === null ){
			items.push(
				<PUJMenuItem
					id={Pages.SIGNIN}
					name={"Iniciar Sesion"}
					icon={"user outline"}
					onClick={handleMenuItemClick}
					key={Math.random()}
				/>
			)
		}else{
			items.push(
				<PUJMenuItem
					id={Pages.PROFILE}
					name={`Perfil ${user}`}
					icon={"user outline"}
					onClick={handleMenuItemClick}
					key={Math.random()} />
			)
			items.push(
				<PUJMenuItem
					id={Pages.SEARCH}
					name={"Buscar"}
					icon={"search"}
					onClick={handleMenuItemClick}
					key={Math.random()}/>
			)
			items.push(
				<PUJMenuItem
					id={Pages.ROUTE}
					name={"Calcular Ruta"}
					icon={"map signs"}
					onClick={handleMenuItemClick}
					key={Math.random()}/>
			)
			items.push(
				<PUJMenuItem
					id={Pages.FAVORITES}
					name={"Ver Favoritos"}
					icon={"star"}
					onClick={handleMenuItemClick}
					key={Math.random()}/>
			)
			items.push(
				<PUJMenuItem
					id={Pages.SCHEDULE}
					name={"Horario"}
					icon={"calendar"}
					onClick={handleMenuItemClick}
					key={Math.random()}/>
			)
		}

		//common options
		items.push(
			<PUJMenuItem
				id={Pages.CALC}
				name={"Calculadora de Notas"}
				icon={"calculator"}
				onClick={handleMenuItemClick}
				key={Math.random()}/>
		)
		items.push(
			<PUJMenuItem
				id={Pages.MAP}
				name={"Ver Mapa"}
				icon={"map"}
				onClick={handleMenuItemClick}
				key={Math.random()}/>
		)
		//end common

		if( user != null ){
			items.push(
				<PUJMenuItem
					id={Pages.SIGNOUT}
					name={"Cerrar Sesion"}
					icon={"log out"}
					onClick={handleMenuItemClick}
					key={Math.random()}/>
			)
		}

		return items;
	}

	onRightClick = () =>{
		this.props.onRightClick()
	}

	render(){
		const { visible , toggleMenu , noButton , rightButton } = this.props
		return(
				<div>
					<Navbar
						onMenuClick={toggleMenu}
						noButton={noButton}
						rightButton={rightButton}
						onRightClick={this.onRightClick}
					/>
					<div style={ containerStyle }>
						<Sidebar.Pushable as={Segment} style={{boxShadow: "none", border: "none"}}>
			          <Sidebar
									as={Menu}
									animation='overlay'
									width='thin'
									visible={visible}
									icon='labeled'
									vertical borderless>
									{this.renderMenu()}
			          </Sidebar>
			          <Sidebar.Pusher dimmed={visible} onClick={this.handlePusherClick}>
									{this.props.children}
			          </Sidebar.Pusher>
			        </Sidebar.Pushable>
					</div>
				</div>);
	}
}


export default AppContainer;
