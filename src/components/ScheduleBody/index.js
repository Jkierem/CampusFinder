import React from 'react'
import ArrowButton from '../ArrowButton'
import CourseCard from '../CourseCard'
import { validateEventForm } from '../../resources/FormValidation'
import { colorList as colors } from '../../resources/Colors'
import { getUserByNickname , updateUserAdditionalData } from '../../resources/Database'
import { Button , Grid , Header , Modal , Form , Loader } from 'semantic-ui-react'

class ScheduleBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			eventOpen: false,
			deleteOpen: false,
			currentDay: 0,
			loading: true,
			ready: false,
			gIndex: 0,
			days: ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
			user:{
				courses:[],
				events:{}
			},
			form: {
				disableSelection: false,
				sessionNumber: 1,
				sessions: {},
				newCourse: "",
				existingCourse: "",
				color: "",
				creds: 1
			}
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false,true,this.toggleEventModal)
		getUserByNickname(this.props.user).then((json) => {
			if( json.response === true ){
				const { user } = json
				let courses = []
				let events = {}
				if( user.additionalData !== undefined ){
					if( user.additionalData.courses !== undefined ){
						courses = user.additionalData.courses
					}
					if( user.additionalData.events !== undefined ){
						events = user.additionalData.events
					}
				}
				let disableSelection = true
				if( courses.length > 0 ){
					disableSelection = false
				}
				this.setState({
					loading: false,
					ready: true,
					user:{
						courses: courses,
						events: events
					},
					form:{
						...this.state.form,
						disableSelection: disableSelection
					}
				})
			}else{
				alert("Error: Mira la consola para mas info")
				console.log(json);
			}
		})
	}

	getCourses = () =>{
		let options = []
		const { courses } = this.state.user
		for (let i = 0; i < courses.length; i++) {
			let course = {}
			course.key = i
			course.value = courses[i].name
			course.text = courses[i].name
			options.push(course)
		}
		return options
	}

	getDayOptions = () =>{
		let options = []
		const { days } = this.state
		for (let i = 0; i < days.length; i++) {
			let day = {}
			day.key = i
			day.value = days[i]
			day.text = days[i]
			options.push(day)
		}
		return options
	}

	toggleDeleteModal = () =>{
		this.setState({
			deleteOpen: !this.state.deleteOpen
		})
	}

	toggleEventModal = () =>{
		this.setState({
			eventOpen: !this.state.eventOpen
		})
	}

	handleCloseModal = () =>{
		this.setState({
			eventOpen: !this.state.eventOpen,
			form:{
				sessionNumber: 1,
				newCourse: "",
				existingCourse: "",
				color: "",
				sessions: {},
				creds: 1
			}
		})
	}

	handleCardDelete = (e,data) =>{
		this.toggleDeleteModal()
		this.setState({
			selectedCard: data
		})
	}

	handleDeleteSingleEvent = () =>{
		const { selectedCard:data , user:{ events } } = this.state;
		const day = this.currDay()
		let dayEvents = events[day]
		let trash = -1;
		for( let i = 0 ; i < dayEvents.length ; i++ ){
			const event = dayEvents[i]
			if( event.courseName === data.name && event.start === data.start && event.end === data.end ){
				trash = i
			}
		}
		dayEvents.splice(trash,1)
		let newEvents={
			...events
		}
		newEvents[day] = dayEvents;
		this.setState({
			selectedCard: undefined,
			user:{
				...this.state.user,
				events:newEvents
			}
		})
		getUserByNickname(this.props.user).then((json) => {
			if( json.response === true ){
				let { user } = json;
				user.additionalData.events = this.state.user.events;
				updateUserAdditionalData(user._id , user.additionalData ).then((value) => {
					this.toggleDeleteModal()
					console.log(value);
					if( value.response !== true ){
						alert("Error: Mira la consola para mas info")
						console.log(json);
					}
				})
			}else{
				alert("Error: Mira la consola para mas info")
				console.log(json);
			}
		})
	}

	handleDeleteAllEvents = () =>{
		const { selectedCard:data , user:{ events } } = this.state;
		let newEvents = {}
		for (let v in events) {
			let dayEvents = events[v]
			let trash = []
			for (let i = 0; i < dayEvents.length; i++) {
				const event = dayEvents[i]
				if( event.courseName === data.name ){
					trash.push(i)
				}
			}
			trash.reverse()
			for (let i = 0; i < trash.length; i++) {
				dayEvents.splice(trash[i],1)
			}
			newEvents[v] = dayEvents
		}
		this.setState({
			selectedCard: undefined,
			user:{
				...this.state.user,
				events:newEvents
			}
		})
		getUserByNickname(this.props.user).then((json) => {
			if( json.response === true ){
				let { user } = json;
				user.additionalData.events = this.state.user.events;
				updateUserAdditionalData(user._id , user.additionalData ).then((value) => {
					this.toggleDeleteModal()
					console.log(value);
					if( value.response !== true ){
						alert("Error: Mira la consola para mas info")
						console.log(json);
					}
				})
			}else{
				alert("Error: Mira la consola para mas info")
				console.log(json);
			}
		})
	}

	handleDeleteCourseAndEvents = () =>{
		const { selectedCard:data , user:{ events , courses } } = this.state;
		let newEvents = {}
		for (let v in events) {
			let dayEvents = events[v]
			let trash = []
			for (let i = 0; i < dayEvents.length; i++) {
				const event = dayEvents[i]
				if( event.courseName === data.name ){
					trash.push(i)
				}
			}
			trash.reverse()
			for (let i = 0; i < trash.length; i++) {
				dayEvents.splice(trash[i],1)
			}
			newEvents[v] = dayEvents
		}
		let newCourses = []
		for (let i = 0; i < courses.length; i++) {
			const course = courses[i]
			if( course.name !== data.name ){
				newCourses.push(course)
			}
		}

		this.setState({
			selectedCard: undefined,
			user:{
				courses:newCourses,
				events:newEvents
			}
		})
		getUserByNickname(this.props.user).then((json) => {
			if( json.response === true ){
				let { user } = json;
				user.additionalData.events = this.state.user.events;
				user.additionalData.courses = this.state.user.courses;
				updateUserAdditionalData(user._id , user.additionalData ).then((value) => {
					this.toggleDeleteModal()
					console.log(value);
					if( value.response !== true ){
						alert("Error: Mira la consola para mas info")
						console.log(json);
					}
				})
			}else{
				alert("Error: Mira la consola para mas info")
				console.log(json);
			}
		})
	}

	handleNewCourseChange = (e,data) =>{
		let disableSelection = false
		if( data.value !== '' || this.state.user.courses.length > 0){
			disableSelection = true
		}
		this.setState({
			form:{
				...this.state.form,
				[data.name]:data.value,
				disableSelection: disableSelection,
			}
		})
	}

	handleDropdownChange = (e,data) =>{
		this.setState({
			form:{
				...this.state.form,
				[data.name]:data.value
			}
		})
	}

	handleTextChange = (e,data) =>{
		this.setState({
			form:{
				...this.state.form,
				[data.name]:data.value
			}
		})
	}

	handleFormChange = (e,data) =>{
		this.setState({
			form:{
				...this.state.form,
				sessions:{
					...this.state.form.sessions,
					[data.index] : {
						...this.state.form.sessions[data.index],
						[data.name] : data.value
					}
				}
			}
		})
	}

	handleSubmit = (e,data) =>{
		var errors = validateEventForm(this.state.form)
		if( errors.valid === true ){
			const { form } = this.state
			let course = {
				name: "",
				color: "",
				description: "",
				grades:[],
				creds: 1
			}
			if( form.disableSelection === true ){
				//newCourse
				course.name = form.newCourse
				course.color = form.color
				course.description = form.description
				course.creds = form.creds
			}else{
				//existingCourse
				course = this.findCourseByName(form.existingCourse)
			}
			let newEvents = []
			for (let j in form.sessions) {
				let event = {
					courseName: course.name,
					day: form.sessions[j].day,
					start: form.sessions[j].start,
					end: form.sessions[j].end
				}
				newEvents.push(event)
			}

			getUserByNickname(this.props.user).then((json) => {
				if( json.response === true ){
					let { user } = json
					if( user.additionalData === undefined ){
						user.additionalData = {}
					}
					if( user.additionalData.courses === undefined ){
						user.additionalData.courses = []
					}
					if( form.disableSelection === true ){
						user.additionalData.courses.push(course)
					}

					if( user.additionalData.events === undefined ){
						user.additionalData.events = {}
					}
					for (let i = 0; i < newEvents.length; i++) {
						let event = newEvents[i]
						if( user.additionalData.events[event.day] === undefined ){
							user.additionalData.events[event.day] = []
						}
						user.additionalData.events[event.day].push(event)
					}
					updateUserAdditionalData(user._id,user.additionalData).then((value) => {
						this.handleCloseModal()
						if( value.response === false){
							alert("Error mira la consola")
							console.log(value);
						}else{
							this.setState({
								user:{
									events: value.user.additionalData.events,
									courses: value.user.additionalData.courses
								}
							})
						}
					})
				}else{
					alert("Error: Mira la consola para mas info")
					console.log(json);
				}
			})
		}else{
			alert(errors.message)
		}
	}

	findCourseByName = (name) =>{
		const { courses } = this.state.user
		let course = undefined
		for (var i = 0; i < courses.length; i++) {
			if(courses[i].name === name ){
				course = courses[i]
			}
		}
		return course
	}

	createRow = (index) =>{
		return(
				<Grid.Row key={index}>
					<Grid.Column width={1} verticalAlign="middle">
						<label>Dia</label>
					</Grid.Column>

					<Grid.Column width={4}>
						<Form.Select fluid index={index} onChange={this.handleFormChange} name={"day"} options={this.getDayOptions()}/>
					</Grid.Column>

					<Grid.Column width={1} verticalAlign="middle">
						<label>Inicio</label>
					</Grid.Column>

					<Grid.Column width={4}>
						<Form.Input fluid index={index} onChange={this.handleFormChange} name={"start"} type={"time"}/>
					</Grid.Column>

					<Grid.Column width={1} verticalAlign="middle">
						<label>Fin</label>
					</Grid.Column>

					<Grid.Column width={4}>
						<Form.Input fluid index={index} onChange={this.handleFormChange} name={"end"} type={"time"}/>
					</Grid.Column>
				</Grid.Row>
		)
	}

	addRow = () =>{
		this.setState({
			form:{
				...this.state.form,
				sessionNumber: this.state.form.sessionNumber + 1
			}
		})
	}

	deleteRow = () =>{
		const { sessionNumber } = this.state.form
		let { sessions } = this.state.form
		if( sessionNumber - 1 > 0){
			delete sessions[sessionNumber-1]
			this.setState({
				form:{
					sessions,
					sessionNumber: sessionNumber - 1
				}
			})
		}
	}

	renderSesions = () =>{
		let { form } = this.state;
		if( form === undefined ){
			form = {}
		}
		let { sessionNumber } = form
		if( sessionNumber === undefined ){
			sessionNumber = 1
		}
		let rows = []
		for (let i = 0; i < sessionNumber; i++) {
			rows.push(
				this.createRow(i)
			)
		}
		return rows
	}

	createCourseCard = (index,start,end,color,name) =>{
		return(
			<CourseCard
				index={index}
				name={name}
				start={start}
				end={end}
				color={color}
				onClick={this.handleCardClick}
				onDelete={this.handleCardDelete}
			/>
		)
	}

	sortSessions = ( sessions ) =>{
		let copy = sessions;
		for (let i = 0; i < copy.length - 1; i++) {
			for (let j = i+1; j < copy.length; j++) {
				let iS = Date.parse(`01/01/2013 ${copy[i].start}:00`)
				//console.log(iS);
				let jS = Date.parse(`01/01/2013 ${copy[j].start}:00`)
				//console.log(jS);
				if( jS < iS ){
					let aux = copy[j];
					copy[j] = copy[i];
					copy[i] = aux;
				}
			}
		}
		return copy;
	}

	renderSchedule = () =>{
		const { events } = this.state.user
		if( events[this.currDay()] === undefined){
			return(
				<Grid.Row centered>
					<Grid.Column textAlign="center" width={14}>
						¡Dia libre! No tienes eventos hoy
					</Grid.Column>
				</Grid.Row>
			)
		}else if( events[this.currDay()].length === 0 ){
			return(
				<Grid.Row centered>
					<Grid.Column textAlign="center" width={14}>
						¡Dia libre! No tienes eventos hoy
					</Grid.Column>
				</Grid.Row>
			)
		}else{
			const sessions = this.sortSessions(events[this.currDay()])
			let cards = []
			for (let i = 0; i < sessions.length; i++) {
				const event = sessions[i]
				const course = this.findCourseByName(event.courseName)
				const { start , end } = event
				const { color, name, description } = course
				cards.push(
					<CourseCard
						key={Math.random()}
						index={i}
						name={name}
						start={start}
						end={end}
						color={color}
						description={description}
						//onClick={this.handleCardClick}
						onDelete={this.handleCardDelete}
					/>
				)
			}
			return cards
		}
	}

	nextDay = () =>{
		const { currentDay } = this.state
		let nextDay = (currentDay+1)%7
		this.setState({
			currentDay: nextDay
		})
	}

	currDay = () =>{
		const { currentDay , days } = this.state
		return days[currentDay]
	}

	prevDay = () =>{
		const { currentDay } = this.state
		let prevDay = (currentDay-1)
		while(prevDay < 0){
			prevDay += 7
		}
		prevDay = prevDay%7
		this.setState({
			currentDay: prevDay
		})
	}

	render(){
		const { ready , selectedCard={} } = this.state
		const { name='' } = selectedCard
		if( ready === false){
			return(
				<Grid centered>
					<Loader active/>
				</Grid>
			)
		}else{
			return(
				<div >
					<Grid padded centered columns={16} style={{border:"none"}}>
						<Grid.Row centered>
							<Grid.Column verticalAlign={"middle"} textAlign='center' width={14} style={{maxWidth:350,userSelect:"none"}}>
								<span>
									<ArrowButton direction={"left" } onClick={this.prevDay}/>
									<span style={{paddingLeft:10,paddingRight:10,fontSize:"2rem", verticalAlign: "middle"}}>{this.currDay()}</span>
									<ArrowButton direction={"right"} onClick={this.nextDay}/>
								</span>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column textAlign='center' width={14} style={{maxWidth:350}}>
							{this.renderSchedule()}
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Modal
						open={this.state.eventOpen}
						onClose={this.handleCloseModal}
						size="small"
						closeIcon
						>
							<Modal.Content scrolling>
								<Form>
									<Grid stackable padded columns={16}>
										<Grid.Row centered>
											<Grid.Column textAlign="left" width={16}>
												<Header>Curso</Header>
											</Grid.Column>
										</Grid.Row>
										<Grid.Row centered>
											<Grid.Column width={8}>
												<Form.Input
													name={"newCourse"}
													onChange={this.handleNewCourseChange}
													label={"Crea un Nuevo Curso"}
												/>
											</Grid.Column>
											<Grid.Column width={8}>
												<Form.Select
													name={"existingCourse"}
													onChange={this.handleDropdownChange}
													label={"O usa un Curso ya registrado"}
													options={this.getCourses()}
													disabled={this.state.form.disableSelection}
												/>
											</Grid.Column>
										</Grid.Row>
										<Grid.Row textAlign="left" >
											<Grid.Column textAlign="left" width={8}>
												<Form.Select
													name={"color"}
													onChange={this.handleDropdownChange}
													label={"Color"}
													options={colors}
													disabled={!this.state.form.disableSelection}
												/>
											</Grid.Column>
											<Grid.Column textAlign="left" width={8}>
												<Form.Input
													name={"creds"}
													onChange={this.handleTextChange}
													label={"Creditos"}
													type={"number"}
													disabled={!this.state.form.disableSelection}
												/>
											</Grid.Column>
										</Grid.Row>

										<Grid.Row textAlign="left" >
											<Grid.Column textAlign="left" width={16}>
												<Form.TextArea
													name={"description"}
													onChange={this.handleTextChange}
													label={"Descripcion"}
													disabled={!this.state.form.disableSelection}
												/>
											</Grid.Column>
										</Grid.Row>

										<Grid.Row centered>
											<Grid.Column textAlign="left" width={16}>
												<Header>Sesiones</Header>
											</Grid.Column>
										</Grid.Row>

										{this.renderSesions()}

										<Grid.Row centered>
											<Grid.Column width={16}>
											<Grid centered columns={16}>
												<Grid.Row centered>
													<Grid.Column textAlign="center" computer={2} mobile={6}>
														<Button color={"red"} icon={"minus"} onClick={this.deleteRow}></Button>
													</Grid.Column>
													<Grid.Column textAlign="center" computer={2} mobile={6}>
														<Button color={"green"} icon={"add"} onClick={this.addRow}></Button>
													</Grid.Column>
												</Grid.Row>
											</Grid>
											</Grid.Column>
										</Grid.Row>

										<Grid.Row centered>
											<Grid.Column textAlign="center" width={8}>
												<Button color={"blue"} onClick={this.handleSubmit}>Aceptar</Button>
											</Grid.Column>
										</Grid.Row>

									</Grid>
								</Form>
							</Modal.Content>
						</Modal>

						<Modal
							open={this.state.deleteOpen}
							onClose={this.toggleDeleteModal}
							size="small"
							closeIcon
						>
							<Header>{`Eliminar Evento  de ${name}`}</Header>
							<Modal.Content scrolling>
								<Grid stackable centered padded columns={16}>
									<Grid.Row>
										¿Que deseas hacer?
									</Grid.Row>
									<Grid.Row centered >
										<Grid.Column textAlign={"center"} computer={4} mobile={8}>
											<Button color={"yellow"} content={"Borrar Solo este Evento"} onClick={this.handleDeleteSingleEvent}/>
										</Grid.Column>
										<Grid.Column textAlign={"center"} computer={4} mobile={8}>
											<Button color={"orange"} content={"Borrar Todos los Eventos"} onClick={this.handleDeleteAllEvents}/>
										</Grid.Column>
										<Grid.Column textAlign={"center"} computer={4} mobile={8}>
											<Button color={"red"} content={"Borrar Curso y Eventos"} onClick={this.handleDeleteCourseAndEvents}/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Modal.Content>
						</Modal>
					</div>
				);
			}
	}
}

export default ScheduleBody;
