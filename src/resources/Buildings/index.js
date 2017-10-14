import React from 'react'

export const buildings=[
	{key: "ed2" , value: "Ed. 2 - Fernando Baron" , text: "Ed. 2 - Fernando Baron"},
	{key: "ed3" , value: "Ed. 3 - Gabriel Giraldo", text: "Ed. 3 - Gabriel Giraldo"},
	{key: "ed27" , value: "Ed. 27 - ", text: "Ed. 27 - " },
	{key: "pi1" , value: "Cafeteria - Teppanyaki - Ingenieria" ,text: "Cafeteria - Teppanyaki - Ingenieria" }
]

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
	return createDatalist( buildings , 'buildings' )
}
