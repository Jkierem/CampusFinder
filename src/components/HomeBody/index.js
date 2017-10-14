import React from 'react'
import { Grid , Menu , Image , Icon } from 'semantic-ui-react'
import * as Pages from '../../resources/Pages'

class HomeBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	onMenuItemClick = (e,{ id })=>{
		this.props.onItemClick(id)
	}

	render(){
		return(
			<Grid centered padded columns={16} >
				<Grid.Row centered>
					<Grid.Column width={14}>
						<Image src='./logo-active.png'/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column width={14}>
						<Menu vertical fluid >
							<Menu.Item id={Pages.ROUTE} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='map signs'/>
									Calcular Ruta
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.SIGNIN} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='user outline'/>
									Iniciar Sesion
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.SEARCH} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='search'/>
									Buscar edificios
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.CALC} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='calculator'/>
									Calculadora de Notas
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.MAP} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='map'/>
									Ver Mapa
								</span>
							</Menu.Item>
						</Menu>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default HomeBody;
