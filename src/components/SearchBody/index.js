import React from 'react'
import { Grid , Button, Form, Dropdown , Segment , Header} from 'semantic-ui-react'
import { getPoiByName , getBuildingByName } from '../../resources/Database'

class SearchBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false,
			hasInfo: false,
			info: null
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	handleChange = (e, { name , value }) => {
		this.setState({ [name]: value , hasInfo: false})
		//console.log(`${name}  ${value}  ${type}`)
	}

	toggleLoading = () =>{
		this.setState({
			loading: !this.state.loading
		})
	}

	renderPoi = (info,key) =>{
		return(
			<Segment.Group key={key}>
				<Segment>
					<Header>{info.name}</Header>
				</Segment>
				<Segment>
					{info.description}
				</Segment>
			</Segment.Group>
		)
	}

	renderInfo = () =>{
		const { info } = this.state
		if( info.type === "poi"){
			return(
				this.renderPoi(info,info.name)
			)
		}
		if( info.type === "building" ){
			return info.pois.map((item) => {
				return this.renderPoi(item,item.name)
			})
		}
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
		this.toggleLoading()
		const { selectedValue } = this.state
		const { buildings } = this.props
		let indexSelected = this.findByName(selectedValue)
		let type = buildings[indexSelected].type
		let name = buildings[indexSelected].text
		if( type === "poi"){
			getPoiByName(name).then((json) => {
				const { poi } = json
				this.toggleLoading()
				this.setState({
					hasInfo: true,
					info:{
						type: type,
						name: poi.name,
						kind: poi.kind,
						description: poi.description
					}
				})
			})
		}
		if( type === "building" ){
			getBuildingByName(name).then((json) => {
				const { building } = json
				this.toggleLoading()
				this.setState({
					hasInfo: true,
					info:{
						type: type,
						pois: building.pois
					}
				})
			})
		}
	}

	render(){
		const { buildings } = this.props;
		return(
			<Form loading={this.state.loading}>
				<Grid padded centered columns={16}>
					<Grid.Row centered>
						<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							<Form.Field>
								<Dropdown
									placeholder={"Buscar..."}
									onChange={this.handleChange}
									name={"selectedValue"}
									search
									selection
									options={buildings}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							<Form.Field>
								<Button content={"Buscar"} onClick={this.onSearch} />
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					{ this.state.hasInfo &&
						<Grid.Row centered>
							<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
								{this.renderInfo()}
							</Grid.Column>
						</Grid.Row>
					}
				</Grid>
			</Form>
		);
	}
}

export default SearchBody;
