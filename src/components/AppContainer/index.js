import React from 'react'
import Navbar from '../Navbar'
import PUJMenuItem from '../PUJMenuItem'
import { Menu , Sidebar , Segment } from 'semantic-ui-react'
import { containerStyle } from '../../resources/Styles'
import * as Pages from '../../resources/Pages'

class AppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handlePusherClick = () =>{
		const { visible , toggleMenu } = this.props
		if( visible ){
			toggleMenu()
		}
	}


	renderMenu = () =>{
		const { user , onMenuItemClick } = this.props;
		let items = []

		if( user === null ){
			items.push(
				<PUJMenuItem
					id={Pages.SIGNIN}
					name={"Iniciar Sesion"}
					icon={"user outline"}
					onClick={onMenuItemClick}
					key={Math.random()}
				/>
			)
		}else{
			items.push(
				<PUJMenuItem
					id={Pages.PROFILE}
					name={"Perfil"}
					icon={"user outline"}
					onClick={onMenuItemClick}
					key={Math.random()} />
			)
		}

		//common options
		items.push(
			<PUJMenuItem
				id={Pages.SEARCH}
				name={"Buscar"}
				icon={"search"}
				onClick={onMenuItemClick}
				key={Math.random()}/>
		)
		items.push(
			<PUJMenuItem
				id={Pages.ROUTE}
				name={"Calcular Ruta"}
				icon={"map signs"}
				onClick={onMenuItemClick}
				key={Math.random()}/>
		)
		items.push(
			<PUJMenuItem
				id={Pages.CALC}
				name={"Calculadora de Notas"}
				icon={"calculator"}
				onClick={onMenuItemClick}
				key={Math.random()}/>
		)
		items.push(
			<PUJMenuItem
				id={Pages.MAP}
				name={"Ver Mapa"}
				icon={"map"}
				onClick={onMenuItemClick}
				key={Math.random()}/>
		)
		//end common

		if( user != null ){
			items.push(
				<PUJMenuItem
					id={Pages.SIGNOUT}
					name={"Cerrar Sesion"}
					icon={"log out"}
					onClick={onMenuItemClick}
					key={Math.random()}/>
			)
		}

		return items;
	}

	render(){
		const { visible , toggleMenu } = this.props
		return(
			<div>
				<Navbar onMenuClick={toggleMenu} noButton={this.props.noButton}/>
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
