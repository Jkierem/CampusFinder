import Graph from '../Graph'
import { getUsefulList , getPois , getBuildings as getBuilds} from '../Database'

export const getRoutes = ( src , dst ) => {
	return createGraph().then((g) => {
		return getBuilds().then((json) => {
			if( json.response === true){
				if( src !== dst ){
					const { buildings } = json
					var srcs = []
					var dsts = []
					if(src.type === "building"){
						srcs = findExits(buildings,src.value)
					}else{
						srcs.push(src.value)
					}
					if(dst.type === "building"){
						dsts = findEntrances(buildings,dst.value)
					}else{
						dsts.push(dst.value)
					}
					return {routes:getBestPaths(g,srcs,dsts) , valid: true}
				}else{
					return {routes: undefined , valid: false}
				}
			}else{
				return undefined
			}
		})

	})
}

const getBestPaths = (graph , srcs , dsts) =>{
	let routes = []
	for( var i = 0 ; i < srcs.length ; i++ ){
		var minW = 1/0
		var bestPath = []
		var src = srcs[i]
		for (var j = 0; j < dsts.length; j++) {
			var dst = dsts[j]
			var route = graph.getPath(src,dst)
			if( route.peso < minW ){
				minW = route.peso
				bestPath = route.path
			}
		}
		routes.push(bestPath)
	}
	return routes
}

const findByName = (buildings,name) =>{
	let index = -1
	for (var i = 0; i < buildings.length; i++) {
		if(buildings[i].name === name){
			index = i
		}
	}
	return index
}

const findEntrances = (buildings,name) =>{
	var building = buildings[findByName(buildings,name)]
	let entrances = []
	const { pois } = building
	for (var i = 0; i < pois.length; i++) {
		if( pois[i].kind === "Entrada" || pois[i].kind === "Entrada/Salida" ){
			entrances.push(pois[i].name)
		}
	}
	return entrances
}

const findExits = (buildings,name) =>{
	var building = buildings[findByName(buildings,name)]
	let exits = []
	const { pois } = building
	for (var i = 0; i < pois.length; i++) {
		if( pois[i].kind === "Salida" || pois[i].kind === "Entrada/Salida" ){
			exits.push(pois[i].name)
		}
	}
	return exits
}

const createGraph = () =>{
	return getPois().then((json) => {
		if(json.response === true){
			var g = new Graph()
			const { pois } = json
			for (var i = 0; i < pois.length; i++) {
				let poi = pois[i]
				const { neighbors } = poi
				let arcs = {}
				for (var j = 0; j < neighbors.length; j++) {
					arcs[neighbors[j].name] = neighbors[j].cost
				}
				g.addVertex( poi.name , arcs )
			}
			return g
		}
	})
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
