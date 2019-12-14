import React,{Component} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';

class AddEditForm extends Component{
	state = {
		id:0,
		first:'',
		last:'',
		email:'',
		phone:'',
		location:'',
		hobby:''
	}
	onChange = e =>{
		this.setState({[e.target.name]:e.target.value})
	}
	submitFormAdd = e =>{
		e.preventDefault()
		fetch('http://localhost:3000/crud',{
			method:'post',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				first: this.state.first,
				last: this.state.last,
				email: this.state.email,
				phone: this.state.phone,
				location: this.state.location,
				hobby:this.state.hobby
			})
		})
		.then(res=> res.json())
		.then(item=>{
			if(Array.isArray(item)){
				this.props.addItemToState(item[0])
				this.props.toggle()
			}else{
				console.log('failure')
			}
		})
		.catch(err=> console.log(err))
	}
	submitFormEdit = e =>{
		e.preventDefault()
		fetch('http://localhost:3000/crud',{
			method:'put',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				id:this.state.id,
				first: this.state.first,
				last: this.state.last,
				email: this.state.email,
				phone:this.state.phone,
				location: this.state.location,
				hobby: this.state.hobby
			 })
		})
		.then(res => res.json())
		.then(item=>{
			if(Array.isArray(item)){
				this.props.updateState(item[0])
				this.props.toggle()
			}else {
				console.log('failure')
			}
		})
		.catch(err=> console.log(err))
	}
	componentDidMount(){
		if(this.props.item){
			const{id,first,last,email,phone,location,hobby} = this.props.item
			this.setState({id, first,last,email,phone,location,hobby})
		}
	}
	render(){
		return(

			<Form onSubmit={this.props.item? this.submitFormEdit: this.submitFormAdd}>
				<FormGroup>
					<Label for="first"> First Name </Label>
					<Input type='text' name="first" onChange ={this.onChange} value={this.state.first === null?'':this.state.first}/>
				</FormGroup>
				<FormGroup>
					<Label for="Last"> Last Name </Label>
					<Input type='text' name="last" onChange ={this.onChange} value={this.state.last === null?'':this.state.last}/>
				</FormGroup>
				<FormGroup>
					<Label for="email"> Email </Label>
					<Input type='text' name="email" onChange ={this.onChange} value={this.state.email === null?'':this.state.email}/>
				</FormGroup>
				<FormGroup>
					<Label for="Phone"> Phone </Label>
					<Input type='text' name="phone" onChange ={this.onChange} value={this.state.phone === null?'':this.state.phone} placeholder="ex. 555-555-5555"/>
				</FormGroup>
				<FormGroup>
					<Label for="location"> Location </Label>
					<Input type='text' name="location" onChange ={this.onChange} value={this.state.location === null?'':this.state.location} placeholder="City, State"/>
				</FormGroup>
				<FormGroup>
					<Label for="hobby"> Hobby </Label>
					<Input type='text' name="hobby" onChange ={this.onChange} value={this.state.hobby === null?'':this.state.hobby}/>
				</FormGroup>
				<Button>Submit</Button>
			</Form>
		)
	}
}
export default AddEditForm