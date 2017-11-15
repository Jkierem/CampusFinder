import React from 'react'
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
		this.props.handleMenuButton(false,true,this.handleClick)
	}

	toggleAddModal = () =>{
		this.setState({
			addModalOpen: !this.state.addModalOpen,
			errorPeso: false,
			errorValor: false
		})
	}

	handleClick = () =>{
		this.toggleAddModal()
	}

	handleEquals = () =>{
		let values = this.state.values
		let pesoCompleto = 100
		let promedio = 0
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

	handlePercentage = (e, { name, value }) => {
		var number = value.indexOf("%")
		var realValue = ""
		if( number !== -1){
			realValue = value.substring(0,number)
		}else {
			realValue = value
		}
		this.setState({ [name]: realValue })
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
			values.push({ valor: valor , peso: peso , index: index, materia:`Nota ${matIndex+1}`})
			this.setState({
				values: values,
				index: this.state.index+1,
				matIndex : this.state.matIndex + 1,
				hasProm: true,
				valor: "not_a_number",
				peso: "not_a_number"
			})
			this.toggleAddModal()
			this.handleEquals()
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

	getTotalPercentage = () =>{
		let values = this.state.values
		var totalPercentage = 0
		for (var j = 0; j < values.length; j++) {
			totalPercentage += parseFloat(values[j].peso)
		}
		return totalPercentage
	}

	renderValues = () =>{
		const { values } = this.state
		if( values.length === 0){
			return (
				<List.Item>
					<Header size={"medium"} style={{textAlign: "center"}}>No tiene notas inscritas</Header>
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
							{`Nota: ${item.valor}    Porcentaje: ${item.peso}%`}
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
						<Grid.Column mobile={12} computer={8} >
							<List divided verticalAlign='middle' size="medium">
								{this.renderValues()}
							</List>
						</Grid.Column>
					</Grid.Row>
					{ this.state.hasProm &&
					<Grid.Row centered>
						<Grid.Column mobile={12} computer={8} textAlign='center'>
							<Header>
								{`Tu promedio es ${(this.state.promedio).toFixed(2)}`}
								<Header.Subheader>{`Porcentaje total: ${this.getTotalPercentage()}%`}</Header.Subheader>
							</Header>
						</Grid.Column>
					</Grid.Row>}
				</Grid>

				<Modal
					open={this.state.addModalOpen}
					onClose={this.toggleAddModal}
					size="small"
					closeIcon
				>
					<Header>Agregar Valor</Header>
					<Modal.Content scrolling>
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
									label={"Porcentaje: "}
									name={"peso"}
									onChange={this.handlePercentage}
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
