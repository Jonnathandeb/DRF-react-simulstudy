import React, { Component } from 'react';
import SchoolSearchDropdown from "../components/SchoolSearchDropdown";
import { Button, Form, Grid, Header, Image, Message, Segment, Progress } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import auth0 from "auth0-js";
import { logIn, getSession } from  "../utils/cookie_manager";
import auth_config from "../auth_config.json";
import config from "../api_config.json";

const maxProgress = 4;

export class RegisterPage extends Component {
	state = {
		progress: 0,
		isNullArr: [true, true, true, true, true],
		school: '',
		email: '',
		fullName: '',
		password: '',
		submittedSchool: '',
		submittedEmail: '',
		submittedFullName: '',
		submittedPassword: '',
		domain: ''
	}

	auth0 = new auth0.WebAuth({
		domain: auth_config.domain,
		clientID: auth_config.clientId
	});
	
	forwardProgress = () => {
		this.setState((prevState) => ({
			progress: prevState.progress === maxProgress ? maxProgress : prevState.progress + 1,
		}));
	}

	backwardProgress = () => {
		this.setState((prevState) => ({
			progress: prevState.progress === 0 ? 0 : prevState.progress - 1,
		}));
	}

	inputChange = (e, { name, value }) => {
		let str = value
		let isEmpty = !str.match(/\S/)
		let targetId = e.target.id

		// if the string is empty and was not before
		if (isEmpty && !this.state.isNullArr[targetId]) {
			this.setState((prevState) => {
				let newArr = prevState.isNullArr;
				newArr[targetId] = true;

				return {progress: prevState.progress, isNullArr: newArr};
			})

			this.backwardProgress();
		}

		// if the string is not empty but was empty before
		if (!isEmpty && this.state.isNullArr[e.target.id]) {
			this.setState((prevState) => {
				let newArr = prevState.isNullArr;
				newArr[targetId] = false;

				return {progress: prevState.progress, isNullArr: newArr};
			})

			this.forwardProgress();
		}

		this.setState({ [name]: value })
	}

	handleSchoolChange = (e, {value}) => {
		if (!this.state.school) {
			this.forwardProgress();
		}

		value = JSON.parse(value);

		this.setState({school: value.id, domain: value.domain})
	}

	handleSubmit = () => {
		const { email, password, school, fullName } = this.state
		
		this.setState({ submittedEmail: email, submittedPassword: password, submittedSchool: school, submittedFullName: fullName })

		this.register(email, password, school, fullName);
	}

	register = (email, password, school, fullName) => {
		/*
		let userData = {
			"username": this.state.submittedEmail,
			"school": this.state.submittedSchool,
			"fullName": this.state.submittedFullName,
			"password": this.submittedPassword,
		}*/

		let userData = {
			"username": email,
			"school": config.url + "/schools/" + school + "/",
		}

		console.log(JSON.stringify(userData))

		fetch(`${config.url}/users/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
                'Content-Type': 'application/json',
            }), 
            method: 'post',
            body: JSON.stringify(userData),
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
		})
	}

	render() {
		return (
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center'>
					<Image src='/SS_logo.png' /> Create an account
				</Header>
				<Form size='large' onSubmit={this.handleSubmit}>
					<Segment stacked>
					<Progress value={this.state.progress} total={maxProgress} progress='ratio' />
					<SchoolSearchDropdown id="0" handleChange={this.handleSchoolChange}/>
					<br />
					<Form.Group>
					<Form.Input 
						fluid
						icon='mail'
						iconPosition='left'
						placeholder='School Email (before @)'
						name="email"
						onChange={this.inputChange}
						id="1" 
						width={15}
					/>
					<Form.Input 
						fluid
						placeholder='@school.org'
						readOnly
						value={this.state.domain}
						icon="at"
						width={10}
						id="2"
					/>
					</Form.Group>
					<Form.Input
						fluid
						icon='user'
						iconPosition='left'
						placeholder='Full Name'
						name="fullName"
						onChange={this.inputChange}
						id="3"
					/>
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						placeholder='Create Password'
						name="password"
						type='password'
						onChange={this.inputChange}
						id="4"
					/>

					<Button fluid size='large'>
						Create Account
					</Button>
					</Segment>
				</Form>
				<Message>
					Already have an account? <Link to="/login">Log In</Link>
				</Message>
				</Grid.Column>
			</Grid>
		);
	}
}