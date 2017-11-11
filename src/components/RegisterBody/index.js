import React from 'react'
import PUJButton from '../PUJButton'
import ErrorText from '../ErrorText'
import { Grid , Form , Input } from 'semantic-ui-react'
import { PUJBlue , PUJWhite } from '../../resources/Colors'
import { validateRegister } from '../../resources/FormValidation'
import { registerUser , checkNickname } from '../../resources/Database'
import { getErrorStyle } from '../../resources/Styles'

class RegisterBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			errors:{
				emailError: false,
				confirmError: false,
				pristine: true
			}
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	checkInputs = () =>{
		var errors = validateRegister(this.state)
		this.updateErrors(errors)
		return errors;
	}

	updateErrors = (errors) =>{
		this.setState({
			errors:{
				nameError: (errors.name)?true:false,
				nameErrorText: (errors.name)?errors.name:undefined,
				usernameError: (errors.username)?true:false,
				usernameErrorText: (errors.username)?errors.username:undefined,
				emailError: (errors.email)?true:false,
				emailErrorText: (errors.email)?errors.email:undefined,
				passError: (errors.password)?true:false,
				passErrorText: (errors.password)?errors.password:undefined,
				confirmError: (errors.confirm)?true:false,
				confirmErrorText: (errors.confirm)?errors.confirm:undefined
			}
		})
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	onSubmit = () => {
		this.setState({
			loading: true,
			pristine: false
		})

		var errors = this.checkInputs();
		checkNickname(this.state.username).then((json) => {

			if( json.response === true ){
				errors.username = "Nickname ya esta en uso"
				errors.valid = false
			}
			this.updateErrors(errors)
			if( errors.valid === true ){

				const { username: nickname , name: fullname, email, password } = this.state

				registerUser( fullname , nickname , email , password ).then((json) => {
					this.setState({
						loading: false,
						pristine: false
					})
					if(json.response === true ){
						this.props.onSuccess(json.user.nickname)
					}else{
						alert("error de registro")
					}
				})
			}

		})

		this.setState({
			loading: false,
			pristine: false
		})
	}

	render(){
		const { nameError , usernameError , emailError , passError , confirmError } = this.state.errors
		const { nameErrorText , usernameErrorText , emailErrorText , passErrorText , confirmErrorText } = this.state.errors
		return(
			<Form loading={this.state.loading}>
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Nickname'}
									defaultValue={this.props.username}
									onChange={this.handleChange}
									name={"username"}
									style={getErrorStyle(usernameError)}
								/>
								{ usernameError && <ErrorText text={usernameErrorText}/> }
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Nombre Completo'}
									onChange={this.handleChange}
									name={"name"}
									style={getErrorStyle(nameError)}
								/>
								{ nameError && <ErrorText text={nameErrorText} />}
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Correo Electronico'}
									onChange={this.handleChange}
									name={"email"}
									style={getErrorStyle(emailError)}
								/>
								{ emailError && <ErrorText text={emailErrorText} /> }
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Contraseña'}
									onChange={this.handleChange}
									name={"password"}
									type={'password'}
									style={getErrorStyle(passError)}
								/>
								{ passError && <ErrorText text={passErrorText} /> }
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Confirmar Contraseña'}
									onChange={this.handleChange}
									name={"passwordConfirm"}
									type={'password'}
									style={getErrorStyle(confirmError)}
								/>
								{ confirmError && <ErrorText text={confirmErrorText} />}
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							<Form.Field>
								<PUJButton
									label={"Registrar"}
									color={PUJBlue}
									textColor={PUJWhite}
									onClick={this.onSubmit}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Form>
		);
	}
}

export default RegisterBody;
