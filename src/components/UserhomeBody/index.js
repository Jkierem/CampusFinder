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
						<Image centered src='./logo-active.png' style={{maxHeight: 100}}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column width={14} style={{maxWidth: 350}}>
						<Menu vertical fluid >
							<Menu.Item id={Pages.PROFILE} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='user outline'/>
									Ver Perfil
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.SEARCH} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='search'/>
									Buscar
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.ROUTE} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='map signs'/>
									Calcular Ruta
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.FAVORITES} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='star'/>
									Ver Favoritos
								</span>
							</Menu.Item>
							<Menu.Item id={Pages.SCHEDULE} onClick={this.onMenuItemClick}>
								<span>
									<Icon name='calendar'/>
									Ver Horario
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
