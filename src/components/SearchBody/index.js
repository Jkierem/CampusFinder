import React from 'react'
import { Grid , Button, Form, Dropdown } from 'semantic-ui-react'
import { buildings } from '../../resources/Buildings'

class SearchBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	onSearch = () => {
		this.setState({
			loading: !this.state.loading
		})
		window.setTimeout(()=>{
			this.setState({
				loading: !this.state.loading
			})
		},1000)

	}

	render(){
		return(
			<Form loading={this.state.loading}>
				<Grid padded centered columns={16}>
					<Grid.Row centered>
						<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							<Form.Field>
								<Dropdown
									placeholder={"Buscar..."}
									onChange={this.handleChange}
									name={"edificio"}
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
				</Grid>
			</Form>
		);
	}
}

export default SearchBody;
