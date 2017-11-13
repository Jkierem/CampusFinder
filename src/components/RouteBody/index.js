import React from 'react'
import FavoriteButton from '../FavoriteButton'
import { Grid , Dropdown , Button , Form , Icon , Divider } from 'semantic-ui-react'
import { getRoutes } from '../../resources/Buildings'

class RouteBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false,
			showSamePlace: false
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	handleAddFavorite = (e,data) =>{console.log(data)}

	handleRemoveFavorite = (e,data) =>{console.log(data)}

	getSingleRoute = (route,index) =>{
		var nodes = []
		for (var i = 0; i < route.length; i++) {
			if( i !== route.length -1 ){
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						{route[i]}
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
						{route[i]}
					</Grid.Column>
				</Grid.Row>)
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						<FavoriteButton
							onSelected={this.handleAddFavorite}
							onDeselected={this.handleRemoveFavorite}
							index={index}
						/>
					</Grid.Column>
				</Grid.Row>)
				nodes.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						<Divider horizontal>O</Divider>
					</Grid.Column>
				</Grid.Row>)
			}
		}
		return nodes;
	}

	renderRoutes = () =>{
		const { routes , showSamePlace } = this.state
		if( routes === undefined) {
			if( showSamePlace === false){
				return( <section/> )
			}else{
				var rows = []
				rows.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						Ya te encuentras en tu destino
					</Grid.Column>
				</Grid.Row>)
				rows.push(
				<Grid.Row centered key={Math.random()}>
					<Grid.Column textAlign="center" width={14}>
						<Divider horizontal>O</Divider>
					</Grid.Column>
				</Grid.Row>)
				return(rows)
			}
		}else{
			var allRoutes = []
			for (var i = 0; i < routes.length; i++) {
				var route = this.getSingleRoute(routes[i],i)
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
		var valid = false
		if( Origen === Destino ){
			this.setState({
				showSamePlace: true
			})
		}else{
			if( Origen !== undefined && Destino !== undefined ){
				valid = true
			}
		}
		return valid
	}

	findByName = (name) =>{
		const { buildings } = this.props
		let index = -1
		for (var i = 0; i < buildings.length; i++) {
			if(buildings[i].text === name){
				index = i
			}
		}
		return index
	}

	onSearch = () => {
		var valid = this.checkValidity()
		if( valid === true ){
			this.setState({
				loading: !this.state.loading
			})
			const { Origen , Destino }  = this.state
			const { buildings } = this.props
			var src = buildings[this.findByName(Origen)]
			var dst = buildings[this.findByName(Destino)]
			getRoutes(src,dst).then((routes) => {
				this.setState({
					loading: !this.state.loading
				})
				if( routes.valid === true ){
					this.setState({
						routes: routes.routes,
						showSamePlace: false
					})
				}
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
