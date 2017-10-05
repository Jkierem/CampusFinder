import React from 'react'
import Navbar from '../Navbar'
import { containerStyle } from '../../resources/Styles'

class AppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<div>
				<Navbar />
				<div style={containerStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default AppContainer;
