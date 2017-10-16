import React from 'react'
import { Grid , Input , Form } from 'semantic-ui-react'
import PUJButton from '../PUJButton'
import PUJLabel from '../PUJLabel'
import { PUJYellow , PUJBlue , PUJWhite } from '../../resources/Colors'
import md5 from 'md5'

class SignInBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handlePassword = ( e , {name , value}) =>{
		var SALT = process.env.REACT_APP_SALT
		if( value !== '' && !value.includes(" ") ){
			var hash = md5(`${value}${SALT}`)
			this.setState({ [name]: hash })
		}
	}

	handleSubmit = (e) =>{
		//------- TODO: hard coded login remember to delete -----------
		const { user , psswd } = this.state
		if( user === "testFinder"){
			var SECRET = process.env.REACT_APP_SECRET
			if( psswd === SECRET ){
				//console.log("SUCCESS");
				this.props.onSuccess(user);
			}else{
				//console.log(`FAIL: pass=${SECRET} input=${psswd}`);
			}
		}else{
			//console.log(`FAIL: user=testFinder input=${user}`);
		}
		//-------------------------------------------------------------
		//TODO: Send POST to db to add user
		e.preventDefault()
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
			<Form onSubmit={this.handleSubmit}>
				<Grid centered padded columns={16} >
					<Grid.Row centered>
						<Grid.Column textAlign={"center"} width={14} style={{maxWidth: 350}}>
							<Form.Field>
								<Input
									label={<PUJLabel content={"Nickname"}/>}
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
									onChange={this.handlePassword}
									name={"psswd"}
									type={"password"}
								/>
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
