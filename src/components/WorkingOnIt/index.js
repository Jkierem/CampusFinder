import React from 'react'
import { Header , Icon , Grid } from 'semantic-ui-react'

class WorkingOnIt extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<Grid centered padded columns={16} >
				<Grid.Row centered>
					<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
						<Header size='huge'>
							Trabajo en progeso
						</Header>
						<Icon name='wrench' size='huge'/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default WorkingOnIt;
