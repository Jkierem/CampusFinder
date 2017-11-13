import React from 'react'
import { Icon } from 'semantic-ui-react'

class FavoriteButton extends React.Component{
	constructor(props){
		super(props);
		this.state={
			icon: "empty star",
			fav: false
		}
	}

	handleClick = (e) =>{
		const data = {
			...this.props,
			...this.state
		}
		this.handleFavoriteClick(e,data)
	}

	handleFavoriteClick = (e,data) =>{
		const { fav } = this.state
		const { onSelected , onDeselected } = this.props
		if( fav === false ){
			this.setState({
				fav: true,
				icon: "star"
			})
			onSelected(e,data)
		}else{
			this.setState({
				fav: false,
				icon: "empty star"
			})
			onDeselected(e,data)
		}
	}

	render(){
		const { color="yellow" , size="large"} = this.props
		const { icon } = this.state
		return(
			<Icon
				onClick={this.handleClick}
				name={icon}
				color={color}
				size={size}
				style={{cursor:"pointer"}}
			/>
		);
	}
}

export default FavoriteButton;
