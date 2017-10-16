import React from 'react'
import { Grid , Input , Form } from 'semantic-ui-react'
import PUJButton from '../PUJButton'
import PUJLabel from '../PUJLabel'
import { PUJYellow , PUJBlue , PUJWhite } from '../../resources/Colors'

class SignInBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleSubmit = (e) =>{
		console.log(this.state);
		//TODO: Send POST to db to add user
		e.preventDefault()
	}

	handleRegister = (e) =>{
		e.preventDefault();
		this.setState({psswd : ""})
		this.props.onRegister(this.state.user)
	}

	render(){
		return(
			<Form>
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									label={<PUJLabel content={"Usuario"}/>}
									fluid
									onChange={this.handleChange}
									name={"user"}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									label={<PUJLabel content={"Contraseña"}/>}
									fluid
									onChange={this.handleChange}
									name={"psswd"}
									type={"password"}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={7} style={{maxWidth: 175}}>
							<PUJButton
								label={"Registrar"}
								color={PUJYellow}
								textColor={PUJWhite}
								onClick={this.handleRegister}
								fluid/>
						</Grid.Column>
						<Grid.Column textAlign={"center"} width={7} style={{maxWidth: 175}}>
							<PUJButton
								label={"Iniciar"}
								color={PUJBlue}
								textColor={PUJWhite}
								onClick={this.handleSubmit}
								fluid
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<PUJButton
								label={"Olvide mi contraseña"}
								color={PUJBlue}
								textColor={PUJWhite}
								onClick={this.handleSubmit}
								fluid
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Form>
		);
	}
}

export default SignInBody;
