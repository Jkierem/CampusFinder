import React from 'react'
import { Icon } from 'semantic-ui-react'

class ArrowButton extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleClick = (e,data) =>{

	}

	render(){
		const { handleClick } = this
		const { color="blue" , size="big" , onClick={handleClick} , direction } = this.props
		return(
			<Icon
				size={size}
				name={`triangle ${direction}`}
				color={color}
				onClick={onClick}
				style={{
					cursor: "pointer"
				}}
			/>
		);
	}
}

export default ArrowButton;
