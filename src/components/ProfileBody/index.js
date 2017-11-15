import React from 'react'
import { Grid , Input , Form ,Button , Modal , Header , Icon } from 'semantic-ui-react'
import { deleteAccount , checkNickname , updateUser , authenticateUser } from '../../resources/Database'
import { getErrorStyle } from '../../resources/Styles'
import { validatePasswordChange , isEmailAddress } from '../../resources/FormValidation'
import ErrorText from '../ErrorText'

class ProfileBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			open: false,
			user: null,
			ready: false,
			pwModalOpen: false,
			eraseModalOpen: false,
			updateModalOpen: false,
			safetyError: false,
			safetyErrorText: ''
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
		checkNickname(this.props.user).then((json) => {
			this.setState({
				user: json.user,
				ready: true,
				email: json.user.email
			})
		})
	}

	openPwModal = () =>{
		this.setState({
			pwModalOpen: true
		})
	}

	closePwModal = () =>{
		this.setState({
			pwModalOpen: false,
			currentPassword: "",
			currentPasswordError: false,
			newPassword: "",
			newPasswordError: false,
			confirmPassword: "",
			confirmPasswordError: false
		})
	}

	openEraseModal = () =>{
		this.setState({
			eraseModalOpen: true
		})
	}

	closeEraseModal = () =>{
		this.setState({
			eraseModalOpen: false,
			safetyPassword: ""
		})
	}

	openUpdateModal = () =>{
		this.setState({
			updateModalOpen: true
		})
	}

	closeUpdateModal = () =>{
		this.setState({
			updateModalOpen: false
		})
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleUpdate = () =>{
		//validate email
		const { email } = this.state;
		if( isEmailAddress(email) ){
			this.setState({
				emailError: false,
				emailErrorText: ""
			})
			const { _id } = this.state.user
			updateUser(_id,email).then((value) => {
				if(value.response === false){
					this.setState({
						emailError: true,
						emailErrorText: "Correo electronico invalido"
					})
				}else{
					this.openUpdateModal()
				}
			})
		}else{
			this.setState({
				emailError: true,
				emailErrorText: "Correo electronico invalido"
			})
		}
	}

	updateErrors = (errors) =>{
		const { newPassword , confirmPassword } = errors;
		this.setState({
			newPasswordError:(newPassword)?true:false,
			newPasswordErrorText:(newPassword)?newPassword:undefined,
			confirmPasswordError:(confirmPassword)?true:false,
			confirmPasswordErrorText:(confirmPassword)?confirmPassword:undefined
		})
	}

	handlePasswordUpdate = () =>{
		//check from front
		var errors = validatePasswordChange(this.state)
		this.updateErrors(errors)
		//check from back
		if( errors.valid === true ){
			const { user , currentPassword , newPassword} = this.state
			authenticateUser( user.nickname , currentPassword ).then((json) => {
				if( json.response === false ){
					this.setState({
						currentPasswordError: true,
						currentPasswordErrorText: "Contraseña invalida"
					})
				}else{
					this.setState({
						currentPasswordError:false
					})
					updateUser( user._id , undefined , newPassword).then((json) => {
						if(json.response === true){
							this.closePwModal()
							this.openUpdateModal()
						}else{
							alert(`Error al actualizar contraseña`)
							console.log(json.error)
						}
					})
				}
			})
		}
	}

	handleDelete = ( ) =>{
		const { _id } = this.state.user
		const { safetyPassword: password } = this.state
		deleteAccount(_id,password).then((value) => {
			console.log(value);
			if( value.response === true ){
				this.props.onDelete()
			}else{
				this.setState({
					safetyError: true,
					safetyErrorText: "Contraseña invalida"
				})
			}
		})
	}

	render(){
		if( this.state.ready){
			const { nickname , fullname , email } = this.state.user
			return(
				<div>
					<Grid centered columns={16} >
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Input
									defaultValue={nickname}
									disabled
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Input
									defaultValue={fullname}
									disabled
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Input
									defaultValue={email}
									name={"email"}
									onChange={this.handleChange}
								/>
							</Grid.Column>
						</Grid.Row>
						{ this.state.emailError && <ErrorText text={this.state.emailErrorText} />}
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Button fluid onClick={this.handleUpdate} color={"blue"}>Cambiar email</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Button fluid onClick={this.openPwModal} color={"grey"}>Cambiar contraseña</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column textAlign={'center'} width={14} style={{maxWidth: 350}}>
								<Button fluid onClick={this.openEraseModal} color={"red"}>Eliminar Cuenta</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Modal
						open={this.state.updateModalOpen}
						onClose={this.closeUpdateModal}
						size="small"
						basic
					>
						<Header textAlign="center">Actualizacion Exitosa</Header>
						<Modal.Content scrolling>
							<section style={{textAlign: "center"}}>
								<Button color={"green"} onClick={this.closeUpdateModal}>Ok</Button>
							</section>
						</Modal.Content>
					</Modal>

					<Modal
						open={this.state.pwModalOpen}
						onClose={this.closePwModal}
						size="small"
						closeIcon
					>
						<Header content='Cambiar contraseña' />
						<Modal.Content scrolling>
							<Form>
							<Grid centered >
								<Grid.Row centered>
									<Grid.Column textAlign={'center'} width={14}>
										<Form.Field>
											<Input
												placeholder={"Contraseña actual"}
												name={"currentPassword"}
												onChange={this.handleChange}
												style={getErrorStyle(this.state.currentPasswordError)}
											/>
											{ this.state.currentPasswordError && <ErrorText text={this.state.currentPasswordErrorText}/>}
										</Form.Field>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row centered>
									<Grid.Column textAlign={'center'} width={14}>
										<Form.Field>
											<Input
												placeholder={"Nueva contraseña"}
												name={"newPassword"}
												onChange={this.handleChange}
												style={getErrorStyle(this.state.newPasswordError)}
											/>
											{ this.state.newPasswordError && <ErrorText text={this.state.newPasswordErrorText}/>}
										</Form.Field>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row centered>
									<Grid.Column textAlign={'center'} width={14}>
										<Form.Field>
											<Input
												placeholder={"Confirmar contraseña"}
												name={"confirmPassword"}
												onChange={this.handleChange}
												style={getErrorStyle(this.state.confirmPasswordError)}
											/>
											{ this.state.confirmPasswordError && <ErrorText text={this.state.confirmPasswordErrorText}/>}
										</Form.Field>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row centered>
									<Grid.Column textAlign={'center'} width={14}>
										<Button color='grey' content={"Cambiar contraseña"} onClick={this.handlePasswordUpdate}/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
							</Form>
						</Modal.Content>
					</Modal>



					<Modal
						open={this.state.eraseModalOpen}
						onClose={this.closeEraseModal}
						size="small"
						closeIcon
					>
						<Header icon={<Icon color={'red'} name='warning sign'/>} content={"¿Estas seguro?"}/>
						<Modal.Content scrolling>
							<Grid centered >
								<Grid.Row centered>
										<Input
											placeholder={"Contraseña actual"}
											name={"safetyPassword"}
											onChange={this.handleChange}
											style={getErrorStyle(this.state.safetyError)}
										/>
								</Grid.Row>
								{this.state.safetyError && <ErrorText text={this.state.safetyErrorText}/>}
								<Grid.Row centered>
									<Button color={'red'} onClick={this.handleDelete} >Eliminar</Button>
								</Grid.Row>
							</Grid>
						</Modal.Content>
					</Modal>
				</div>
			)
			}else{
				return(
					<Form loading={true}>
					</Form>
				)
			}
	}
}

export default ProfileBody;
