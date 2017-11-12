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
