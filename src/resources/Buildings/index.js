import React from 'react'

export const testBuildings=[
	{key: "ed2" , value: "Ed. 2 - Fernando Baron" , text: "Ed. 2 - Fernando Baron"},
	{key: "ed3" , value: "Ed. 3 - Gabriel Giraldo", text: "Ed. 3 - Gabriel Giraldo"},
	{key: "ed27" , value: "Ed. 27 - ", text: "Ed. 27 - " },
	{key: "pi1" , value: "Cafeteria - Teppanyaki - Ingenieria" ,text: "Cafeteria - Teppanyaki - Ingenieria" }
]

export const getBuildings = () =>{
	var URL  = process.env.REACT_APP_URL
	var PORT = process.env.REACT_APP_PORT
	fetch( `${URL}/buildings:${PORT}`,{method: 'GET'}).then((value) => {
		console.log(value);
	})
}

export const postRoute = ( src , dst ) =>{
	var URL  = process.env.REACT_APP_URL
	var PORT = process.env.REACT_APP_PORT
	fetch(`${URL}/route:${PORT}`,
	{
			method:'POST',
			body: JSON.stringify({ origen: src , destino: dst })
	}).then((value) => {
			console.log(value);
	})
}

export const postUser = ( user ) =>{
	const { username , name , email , password } = user
	var URL  = process.env.REACT_APP_URL
	var PORT = process.env.REACT_APP_PORT
	fetch(`${URL}/route:${PORT}`,
	{
			method:'POST',
			body: JSON.stringify({ username: username , name: name , email: email , password: password })
	}).then((value) => {
		console.log(value);
	})
}

//LEGACY FUNCS JUST IN CASE
export const createDatalist = ( items , id ) => {
	var opts = items.map((item) => {
		return(
			<option value={item.value} key={item.key}/>
		)
	})
	return(
		<datalist id={id}>
			{opts}
		</datalist>
	)
}

export const buildingsData = () =>{
	return createDatalist( testBuildings , 'buildings' )
}
//END LEGACY
