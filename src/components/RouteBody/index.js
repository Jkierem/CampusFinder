import React from 'react'
import { Grid , Dropdown , Button , Form } from 'semantic-ui-react'

class RouteBody extends React.Component{
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
				</Grid>
			</Form>
		);
	}
}

export default RouteBody;
