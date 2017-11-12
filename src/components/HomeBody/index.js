import React from 'react'
import { Grid , Menu , Image , Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import * as Pages from '../../resources/Pages'

class HomeBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			redirect: false
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(true)
	}

	onMenuItemClick = (e,{ id })=>{
		this.setState({
			redirect: true,
			path: id.path
		})
	}

	render(){
		const { redirect , path } = this.state;
		if( redirect === true ){
			return (<Redirect push to={path} />)
		}else{
			return(
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column width={14}>
							<Image centered src='./logo_campus_finder.svg'/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column width={14} style={{maxWidth: 350}}>
							<Menu vertical fluid >
								<Menu.Item id={Pages.SIGNIN} onClick={this.onMenuItemClick}>
									<span>
										<Icon name='user outline'/>
										Iniciar Sesion
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
}

export default HomeBody;
