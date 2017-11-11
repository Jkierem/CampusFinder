import React from 'react'
import { Grid , Input , Form } from 'semantic-ui-react'
import PUJButton from '../PUJButton'
import PUJLabel from '../PUJLabel'
import ErrorText from '../ErrorText'
import { PUJYellow , PUJBlue , PUJWhite } from '../../resources/Colors'
import { authenticateUser } from '../../resources/Database'
import { getErrorStyle } from '../../resources/Styles'

class SignInBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading: false
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value , error: false, errorText:''})
	}

	handleSubmit = (e) =>{
		e.preventDefault()
		const { user , psswd } = this.state
		this.setState({
			loading: true
		})
		authenticateUser(user,psswd).then((attemp) => {
			this.setState({
				loading: false
			})
			if( attemp.response === true ){
				this.props.onSuccess(attemp.user.nickname);
			}else{
				this.setState({
					error: true,
					errorText: "Combinacion de usuario y contraseña invalida"
				})
			}
		})
	}

	handleForgot = (e) =>{
		e.preventDefault()
	}

	handleRegister = (e) =>{
		this.setState({psswd : ""})
		this.props.onRegister(this.state.user)
	}

	render(){
		return(
			<Form onSubmit={this.handleSubmit} loading={this.state.loading}>
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									label={<PUJLabel content={"Nickname"}/>}
									fluid
									onChange={this.handleChange}
									name={"user"}
									style={getErrorStyle(this.state.error)}
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
									style={getErrorStyle(this.state.error)}
								/>
								{ this.state.error && <ErrorText text={this.state.errorText} />}
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={7} style={{maxWidth: 175}}>
							<PUJButton
								label={"Iniciar"}
								color={PUJBlue}
								textColor={PUJWhite}
								onClick={this.handleSubmit}
								type={"submit"}
								fluid
							/>
						</Grid.Column>
						<Grid.Column textAlign={"center"} width={7} style={{maxWidth: 175}}>
							<PUJButton
								label={"Registrar"}
								color={PUJYellow}
								textColor={PUJWhite}
								onClick={this.handleRegister}
								fluid/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<PUJButton
								label={"Olvide mi contraseña"}
								color={PUJBlue}
								textColor={PUJWhite}
								onClick={this.handleForgot}
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
