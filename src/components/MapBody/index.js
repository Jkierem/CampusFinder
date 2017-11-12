import React from 'react'
import { Image } from 'semantic-ui-react'

class MapBody extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	render(){
		return(
			<Image
				centered
				size='huge'
				src='./mapa.jpg'
			/>
		);
	}
}

export default MapBody;
