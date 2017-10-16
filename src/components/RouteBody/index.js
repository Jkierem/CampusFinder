import React from 'react'
import { Grid , Dropdown , Button , Form , Icon , Divider } from 'semantic-ui-react'
import { getRoutes } from '../../resources/Buildings'

class RouteBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false
		}
	}

	getSingleRoute = (route) =>{
		var nodes = []
		for (var i = 0; i < route.nodes.length; i++) {
			if( i !== route.nodes.length -1 ){
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						{route.nodes[i]}
					</Grid.Column>
				</Grid.Row>)
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						<Icon name="arrow down" size="large" color='blue'/>
					</Grid.Column>
				</Grid.Row>)

			}else{
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						{route.nodes[i]}
						<Divider horizontal>O</Divider>
					</Grid.Column>
				</Grid.Row>)
			}
		}
		return nodes;
	}

	renderRoutes = () =>{
		const { routes } = this.state
		if( routes === undefined) {
			return( <section/> )
		}else{
			var allRoutes = []
			for (var i = 0; i < routes.length; i++) {
				var route = this.getSingleRoute(routes[i])
				allRoutes.push(route)
			}
			return allRoutes
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	checkValidity = () =>{
		const { Origen , Destino } = this.state
		if( Origen !== undefined && Destino !== undefined ){
			return true
		}
		return false
	}

	onSearch = () => {
		var valid = this.checkValidity()
		if( valid === true ){
			this.setState({
				loading: !this.state.loading
			})
			window.setTimeout(()=>{
				this.setState({
					loading: !this.state.loading
				})
			},1000)
			const { Origen , Destino } = this.state
			var routes = getRoutes( Origen , Destino )
			this.setState({
				routes: routes
			})
		}
	}

	render(){
		//console.log( this.state );
		const { loading } = this.state;
		const { buildings } = this.props;
		return(
			<Form loading={loading}>
				<Grid padded centered columns={16}>
					<Grid.Row centered>
						<Grid.Column textAlign="center" width={14} style={{maxWidth:350}}>
							<Form.Field>
								<Dropdown
									placeholder={"Origen"}
									onChange={this.handleChange}
									name={"Origen"}
									search
									selection
									options={buildings}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign="center" width={14} style={{maxWidth:350}}>
							<Form.Field>
								<Dropdown
									placeholder={"Destino"}
									onChange={this.handleChange}
									name={"Destino"}
									search
									selection
									options={buildings}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign="center" width={14}>
							<Form.Field>
								<Button content={"Buscar"} onClick={this.onSearch} />
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					{this.renderRoutes()}
				</Grid>
			</Form>
		);
	}
}

export default RouteBody;
