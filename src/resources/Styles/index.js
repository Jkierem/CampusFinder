import * as Colors from '../Colors'

const getDeviceHeight = () =>{
	var body = document.body,
    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
}

export const getErrorStyle = (error) =>{
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

export const containerStyle = {
	paddingTop: "45px",
	margin: "0px"
}

export const commonBackground = {
	minHeight: getDeviceHeight() - 50,
	minWidth: "100%",
	paddingTop: 20,
	backgroundColor: Colors.superLightGray
}

export const navStyle = {
	backgroundColor: Colors.PUJBlue,
}

export const labelStyle = (bcolor , textColor=Colors.PUJBlack) =>{
	return {
		backgroundColor: bcolor,
		color: textColor
	}
}

export const fabStyle = (color,left='80%',bottom='20px') =>{
	return{
		position: 'fixed',
		backgroundColor: color,
		left: left,
		bottom: bottom
	}
}
