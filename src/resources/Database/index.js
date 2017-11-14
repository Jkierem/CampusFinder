export const authenticateUser = ( username , password ) => {
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch( `${url}:${dbport}/user/login`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"nickname": username,
				"password": password
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const registerUser = ( fullname, nickname, email , password) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch( `${url}:${dbport}/user`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"nickname": nickname,
				"fullname": fullname,
				"email"   : email,
				"password": password
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const checkNickname = ( nickname ) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch( `${url}:${dbport}/user/info/${nickname}`)
		.then((response) => {
			return response.json()
		})
}

export const getUserByNickname = ( nickname ) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch( `${url}:${dbport}/user/info/${nickname}`)
		.then((response) => {
			return response.json()
		})
}

export const updateUser = ( _id , email , password ) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/user/${_id}`,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"email": email,
				"password":password
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const updateUserAdditionalData = ( _id , additionalData )=>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/user/${_id}`,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"additionalData":additionalData
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const deleteAccount = ( id , password ) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/user/${id}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"password":password
			}
		)
	}).then((value) => {
		return value.json()
	})
}

export const getUsefulList = () =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/list`).then((response) => {
		return response.json()
	})
}

export const getPoiByName = (name) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/pois/info`,{
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"name":name
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const getBuildingByName = (name) =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/buildings/info`,{
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"name":name
			}
		)
	}).then((response) => {
		return response.json()
	})
}

export const getPois = () =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/pois`).then((response) => {
		return response.json()
	})
}

export const getBuildings = () =>{
	const url = process.env.REACT_APP_URL
	const dbport = process.env.REACT_APP_DB_PORT
	return fetch(`${url}:${dbport}/buildings`).then((response) => {
		return response.json()
	})
}
