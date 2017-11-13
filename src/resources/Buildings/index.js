import React from 'react'
import { getUsefulList } from '../Database'

export const testBuildings=[
	{key: "ed2" , value: "Ed. 2 - Fernando Baron" , text: "Ed. 2 - Fernando Baron"},
	{key: "ed11" , value: "Ed. 11 - Jose Gabriel Maldonado", text: "Ed. 11 - Jose Gabriel Maldonado"},
	{key: "pi1" , value: "Cafeteria - Teppanyaki - Ingenieria" ,text: "Cafeteria - Teppanyaki - Ingenieria" }
]

export const getRoutes = ( src , dst ) => {
	var sid = findBuildingID( src );
	var did = findBuildingID( dst );
	var routes = [];
	var route1 = {}
	route1.nodes = []
	var route2 = {}
	route2.nodes = []
	if( sid === did ){
		route1.nodes = ['Ya te encuentras en tu destino']
		routes.push(route1)
	}else
	if ( sid === "ed2" ) {
		if ( did === "ed11" ) {

			route1.nodes.push( `Salida Piso 1 ${findText(sid)}` )
			route1.nodes.push( findText("pi1") )
			route1.nodes.push( `Entrada/Salida Piso 4 ${findText(did)}`)

			route2.nodes.push( `Salida Piso S1 ${findText(sid)}`)
			route2.nodes.push( `Escaleras Ed. 2 a Cl. 41b `)
			route2.nodes.push( `Entrada/Salida Piso 2 ${findText(did)}`)

			routes.push(route1)
			routes.push(route2)
		}else
		if ( did === "pi1" ) {

			route1.nodes.push( `Salida Piso 1 ${findText(sid)}` )
			route1.nodes.push( findText("pi1") )

			routes.push(route1)
		}
	}else
	if ( sid === "ed11") {
		if ( did === "ed2" ) {

			route1.nodes.push( `Entrada/Salida Piso 4 ${findText(sid)}`)
			route1.nodes.push( findText("pi1") )
			route1.nodes.push( `Entrada Piso PP ${findText(did)}` )

			route2.nodes.push( `Entrada/Salida Piso 2 ${findText(sid)}`)
			route2.nodes.push( `Escaleras  Cl. 41b a Ed. 2 `)
			route2.nodes.push( `Entrada Piso PP ${findText(did)}`)

			routes.push(route1)
			routes.push(route2)
		}else
		if ( did === "pi1" ) {

			route1.nodes.push( `Entrada/Salida Piso 4 ${findText(sid)}`)
			route1.nodes.push( findText("pi1") )

			routes.push(route1)
		}
	}else
	if ( sid === "pi1" ) {
		if ( did === "ed11" ) {

			route1.nodes.push( findText(`pi1`))
			route1.nodes.push( `Entrada/Salida Piso 4 ${findText(did)}`)

			routes.push(route1)
		}else
		if ( did === "ed2" ) {

			route1.nodes.push( findText(`pi1`))
			route1.nodes.push( `Entrada Piso PP ${findText(did)}`)

			routes.push(route1)
		}
	}
	return routes
}

export const findText = (id) =>{
	for (var i = 0; i < testBuildings.length; i++) {
		if( testBuildings[i].key === id ){
			return testBuildings[i].text;
		}
	}
	return undefined;
}

export const findBuildingID = (building) =>{
	for (var i = 0; i < testBuildings.length; i++) {
		if( testBuildings[i].text === building ){
			return testBuildings[i].key;
		}
	}
	return undefined;
}

export const getBuildings = () =>{
	return getUsefulList().then((json) => {
		if( json.response === true ){
			let list = []
			let { buildings , pois } = json
			for (var i = 0; i < buildings.length; i++) {
				list.push({
					key: `ed${i}`,
					value: buildings[i].name,
					text: buildings[i].name,
					type: "building"
				})
			}
			for (var j = 0; j < pois.length; j++) {
				list.push({
					key: `poi${j}`,
					value: pois[j].name,
					text: pois[j].name,
					type: "poi"
				})
			}
			return list
		}
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
