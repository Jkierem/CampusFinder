import React from 'react'
import { Segment , Header , Label , Icon } from 'semantic-ui-react'

class CourseCard extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	handleDeleteClick = (e) =>{
		let data={
			...this.props
		}
		this.props.onDelete(e,data)
	}

	handleHeaderClick = (e) =>{
		let data={
			...this.props
		}
		this.props.onClick(e,data)
	}

	render(){
		const { color="red" ,
						name="CourseName" ,
						start ,
						end ,
						description="Here lies an empty description",
					} = this.props
		return(
			<Segment.Group >
				<Label
					corner="right"
					icon={<Icon name="delete" style={{cursor:"pointer"}}/>}
					size="mini"
					onClick={this.handleDeleteClick}
				/>
				<Segment
					inverted
					color={color}
					style={{cursor:"pointer"}}
					onClick={this.handleHeaderClick}
				>
					<Header>{`${name} ${start}-${end}`}</Header>
				</Segment>
				<Segment>
					{description}
				</Segment>
			</Segment.Group>
		);
	}
}

export default CourseCard;
