import React from 'react'
import HomeBody from './components/HomeBody'
import AppContainer from './components/AppContainer'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user: null
		}
	}

	onSignIn = () =>{
		this.setState({
			user: true
		})
	}

	onSignOut = () =>{
		this.setState({
			user: null
		})
	}

	onProfile = () =>{
		console.log("PROFILE!");
	}

	render(){
		const { user } = this.state;
		const { onSignIn , onProfile , onSignOut } = this;
		return(
			<AppContainer
				onSignIn={onSignIn}
				onSignOut={onSignOut}
				onProfile={onProfile}
				user={user} >
				<HomeBody />
			</AppContainer>
		);
	}
}

export default App;
