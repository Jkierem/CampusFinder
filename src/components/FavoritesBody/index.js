import React from 'react'
import { getUserByNickname , updateUserAdditionalData } from '../../resources/Database'
import { Segment , Button , Header , Grid , Icon , Modal } from 'semantic-ui-react'

class FavoritesBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: true,
			ready: false,
			favorites: undefined,
			modalOpen: false
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
		getUserByNickname(this.props.user).then((json) => {
			if( json.response === true){
				const { user } = json
				let favorites = []
				if( user.additionalData !== undefined ){
					if( user.additionalData.favorites !== undefined ){
						favorites = user.additionalData.favorites
					}
				}
				this.setState({
					loading: false,
					ready: true,
					favorites: favorites
				})
			}else{
				alert("ERROR: check console")
				console.log(json);
			}
		})
	}

	handleDelete = ()=>{
		let {favorites} = this.state
		const { index } = this.state
		favorites.splice(index,1)
		getUserByNickname(this.props.user).then((json) => {
			if(json.response === true){
				let { user } = json
				user.additionalData.favorites = favorites
				updateUserAdditionalData( user._id , user.additionalData ).then((value) => {
					this.handleCloseModal()
					if(value.response === false){
						alert("ERROR: check console")
						console.log(json);
					}
				})
			}else{
				alert("ERROR: check console")
				console.log(json);
			}
		})
	}

	handleOpenModal = (e,data) =>{
		this.setState({
			modalOpen: true,
			deleteIndex: data.index
		})
	}

	handleCloseModal = () =>{
		this.setState({
			modalOpen: false
		})
	}

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
						<Button
							index={index}
							onClick={this.handleOpenModal}
							color={"red"}
							style={{marginTop: "15px"}}
						>Eliminar</Button>
					</Grid.Column>
				</Grid.Row>)
			}
		}
		return nodes;
	}

	renderFavoriteItem = (fav , key, index) =>{
		return(
			<Segment.Group key={key}>
				<Segment>
					<Header>{`Origen: ${fav.origen}`}</Header>
				</Segment>
				<Segment>
					<Header>{`Destino: ${fav.destino}`}</Header>
				</Segment>
				<Segment>
					{this.getSingleRoute(fav.path,index)}
				</Segment>
			</Segment.Group>
		)
	}

	renderFavorites = () =>{
		if( this.state.favorites === undefined ){
			return(
				<Header size={"medium"}>No tienes rutas favoritas guardadas</Header>
			)
		}else{
			if( this.state.favorites.length === 0 ){
				return(
					<Header size={"medium"}>No tienes rutas favoritas guardadas</Header>
				)
			}else{
				let favs = []
				const { favorites } = this.state;
				for (var i = 0; i < favorites.length; i++) {
					favs.push(this.renderFavoriteItem(favorites[i] , Math.random() , i))
				}
				return favs
			}
		}
	}

	render(){
		let body
		const { ready } = this.state
		if( ready === false ){
			body =
			<Grid padded centered columns={16}>
				<Grid.Row centered>
					<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
						<Segment loading={this.state.loading}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		}else{
			body =
			<div>
				<Grid padded centered columns={16}>
					<Grid.Row centered>
						<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							{this.renderFavorites()}
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Modal
					open={this.state.modalOpen}
					onClose={this.handleCloseModal}
					closeOnDimmerClick={false}
					basic
					size='small'
					>
						<Header icon='delete' content='Eliminar Ruta Favorita' />
						<Modal.Content>
							<h3>¿Estas seguro que deseas eliminar ruta favorita?</h3>
						</Modal.Content>
						<Modal.Actions>
							<Button color='red' onClick={this.handleCloseModal} inverted>
								Cancelar
							</Button>
							<Button color='green' onClick={this.handleDelete} inverted>
								Borrar
							</Button>
						</Modal.Actions>
					</Modal>
			</div>
		}
		return body;
	}
}

export default FavoritesBody;
