import React from 'react'
import { Grid , Input , Button } from 'semantic-ui-react'
import { test } from '../../resources/Styles'
import PUJLabel from '../PUJLabel'

class HomeBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false
		}
	}

	onSearch = () => {
		this.setState({
			loading: !this.state.loading
		})
	}

	render(){
		const { loading } = this.state;
		return(
			<div style={test}>
				<Grid padded centered columns={1}>
					<Grid.Row centered>
						<Grid.Column textAlign="center">
							<Input label={<PUJLabel content={"Origen"}/>}
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign="center">
							<Input label={<PUJLabel content={"Destino"}/>}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign="center">
							<Button content={"Buscar"} onClick={this.onSearch} loading={loading}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default HomeBody;
