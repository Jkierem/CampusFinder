import React from 'react'
import PUJButton from '../PUJButton'
import { Grid , Form , Input } from 'semantic-ui-react'
import { PUJBlue , PUJWhite } from '../../resources/Colors'
import { validateRegister } from '../../resources/FormValidation'
import md5 from 'md5'

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

	getErrorStyle = (error) =>{
		if( error === true ){
			return{
				border: `1px solid rgba(255,0,0,1)`,
				borderRadius: '.28571429rem'
			}
		}else{
			return{
				border: 'none',
				borderRadius: '.28571429rem'
			}
		}
	}

	checkInputs = () =>{
		var errors = validateRegister(this.state)
		this.setState({
			errors:{
				nameError: (errors.name)?true:false,
				usernameError: (errors.username)?true:false,
				emailError: (errors.email)?true:false,
				passError: (errors.password)?true:false,
				confirmError: (errors.confirm)?true:false
			}
		})
		return errors;
	}

	handlePassword = ( e , {name , value}) =>{
		var SALT = process.env.REACT_APP_SALT
		if( value !== '' && !value.includes(" ") ){
			var hash = md5(`${value}${SALT}`)
			this.setState({ [name]: hash })
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	onSubmit = () => {
		this.setState({
			loading: !this.state.loading,
			pristine: false
		})
		window.setTimeout(()=>{
			this.setState({
				loading: !this.state.loading
			})
		},1000)

		var errors = this.checkInputs();

		if( errors.valid === true ){
			//TODO: call api
			console.log("VALID")
		}
	}

	render(){
		const { nameError , usernameError , emailError , passError , confirmError } = this.state.errors

		return(
			<Form loading={this.state.loading}>
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Nombre de Usuario'}
									onChange={this.handleChange}
									name={"username"}
									style={this.getErrorStyle(usernameError)}
								/>
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
									style={this.getErrorStyle(nameError)}
								/>
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
									style={this.getErrorStyle(emailError)}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Contraseña'}
									onChange={this.handlePassword}
									name={"password"}
									type={'password'}
									style={this.getErrorStyle(passError)}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>
						<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									placeholder={'Confirmar Contraseña'}
									onChange={this.handlePassword}
									name={"passwordConfirm"}
									type={'password'}
									style={this.getErrorStyle(confirmError)}
								/>
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
