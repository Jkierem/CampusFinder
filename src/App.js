import React from 'react'
import HomeBody from './components/HomeBody'
import AppContainer from './components/AppContainer'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<AppContainer>
				<HomeBody />
			</AppContainer>
		);
	}
}

export default App;
