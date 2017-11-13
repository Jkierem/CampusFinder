import React from 'react'
import FAB from  '../FAB'
import { getErrorStyle } from '../../resources/Styles'
import { validateInputs } from '../../resources/FormValidation'
import { List , Modal , Button , Header , Input , Grid } from 'semantic-ui-react'

class LimitedCalculatorBody extends React.Component{
	constructor(props){
		super(props);
		this.state={
			addModalOpen: false,
			errorValor: false,
			errorPeso: false,
			index: 0,
			matIndex: 0,
			hasProm: false,
			values: []
		}
	}

	componentWillMount = () =>{
		this.props.handleMenuButton(false)
	}

	toggleAddModal = () =>{
		this.setState({
			addModalOpen: !this.state.addModalOpen
		})
	}

	handleClick = () =>{
		this.toggleAddModal()
	}

	handleEquals = () =>{
		let values = this.state.values
		let pesoCompleto = 0
		let promedio = 0
		for (var i = 0; i < values.length; i++) {
			pesoCompleto += parseFloat(values[i].peso)
		}
		for (var j = 0; j < values.length; j++) {
			const { valor , peso } = values[j]
			promedio +=  (valor*peso)/pesoCompleto
		}
		this.setState({
			promedio: promedio,
			hasProm: true
		})
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	updateErrors = (errors)=>{
		this.setState({
			errorValor: errors.valor,
			errorPeso : errors.peso
		})
	}

	handleAdd = () =>{
		var errors = validateInputs(this.state)
		this.updateErrors(errors)
		if( errors.valid === true ){
			let { valor , peso , index , matIndex } = this.state
			let values = this.state.values
			values.push({ valor: valor , peso: peso , index: index, materia:`Materia ${matIndex+1}`})
			this.setState({
				values: values,
				index: this.state.index+1,
				matIndex : this.state.matIndex + 1
			})
			this.toggleAddModal()
			if( this.state.hasProm === true ){
				this.handleEquals()
			}
		}
	}

	removeItem = (e,{ index }) =>{
		let values = this.state.values
		for (var i = index; i < values.length; i++) {
			values[i].index -= 1
		}
		values.splice(index,1)
		this.setState({
			values: values,
			index: this.state.index-1
		})
		if( this.state.hasProm === true ){
			this.handleEquals()
			if( this.state.values.length === 0 ){
				this.setState({
					hasProm: false
				})
			}
		}
	}

	renderValues = () =>{
		const { values } = this.state
		if( values.length === 0){
			return (
				<List.Item>
					<List.Header style={{textAlign: "center"}}>No tiene materias inscritas</List.Header>
				</List.Item>
			)
		}else{
			return values.map((item,key) => {
				return (
					<List.Item key={key}>
						<List.Content floated='right'>
							<Button index={item.index} icon={"delete"} color={"red"} size={"tiny"} onClick={this.removeItem}/>
						</List.Content>
						<List.Header>{item.materia}</List.Header>
						<List.Content >
							{`Nota: ${item.valor}    Creditos: ${item.peso}`}
						</List.Content>
					</List.Item>
				)
			})
		}
	}

	render(){
		return(
			<div>
				<Grid centered padded columns={16}>
					<Grid.Row centered>
						<Grid.Column width={8}>
							<List divided verticalAlign='middle' size="medium">
								{this.renderValues()}
							</List>
						</Grid.Column>
					</Grid.Row>
					{ this.state.hasProm &&
					<Grid.Row centered>
						<Grid.Column width={8} textAlign='center'>
							<Header>{`Tu promedio es ${(this.state.promedio).toFixed(2)}`}</Header>
						</Grid.Column>
					</Grid.Row>}
				</Grid>

				<FAB onClick={this.handleClick} left={"70vw"} />
				<FAB onClick={this.handleEquals} icon={"checkmark"} color={"#55f"}/>
				<Modal
					open={this.state.addModalOpen}
					onClose={this.toggleAddModal}
					size="small"
					closeIcon
				>
					<Header>Agregar Valor</Header>
					<Modal.Content>
						<Grid padded centered >
							<Grid.Row>
								<Input
									label={"Nota: "}
									name={"valor"}
									onChange={this.handleChange}
									type={"number"}
									style={getErrorStyle(this.state.errorValor)}
								/>
							</Grid.Row>
							<Grid.Row>
								<Input
									label={"Creditos: "}
									name={"peso"}
									onChange={this.handleChange}
									type={"number"}
									style={getErrorStyle(this.state.errorPeso)}
								/>
							</Grid.Row>
							<Grid.Row>
								<Button icon={'plus'} color={'yellow'} onClick={this.handleAdd}/>
							</Grid.Row>
						</Grid>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

export default LimitedCalculatorBody;
