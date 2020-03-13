import React, { Component } from 'react';
import SchoolSearchDropdown from "../components/SchoolSearchDropdown";
import { Button, Form, Grid, Header, Image, Message, Segment, Progress } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import auth0 from "auth0-js";
import { logIn, getSession } from  "../utils/cookie_manager";
import auth_config from "../auth_config.json";
import config from "../api_config.json";
import validator from "email-validator";

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
		domain: '',
		email_err: null,
		password_err: null,
		register_err: null,
		redirecToLogin: false
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

	inputChange = (e) => {
		let str = e.target.value
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
	}

	handleEmailChange = (e, { name, value }) => {
		this.inputChange(e);

		if (!this.state.school) {
			this.setState({email_err: <Message negative>A school must be selected</Message>})
		}
		else if (value.trim() === "") {
			this.setState({email_err: <Message negative>Email cannot be blank</Message>})
		}
		else if (!validator.validate(value + "@" + this.state.domain)) {
			this.setState({email_err: <Message negative>Email not formatted correctly</Message>})
		}
		else {
			this.setState({email_err: null})
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

	handlePasswordChange = (e, {name, value}) => {
		this.inputChange(e);

		let passCheck = /(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/

		if (value.trim() === "") {
			this.setState({password_err: <Message negative>The password must not be blank</Message>})
		}
		else if (!passCheck.test(value)) {
			this.setState({password_err: <Message negative>The password must contain at least 8 characters including at least 3 of the following 4 types of characters: a lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&*).</Message>})
		}
		else {
			this.setState({password_err: null})
		}

		this.setState({ [name]: value })
	}

	handleNameChange = (e, {name, value}) => {
		this.inputChange(e);
		
		this.setState({ [name]: value })
	}

	handleSubmit = () => {
		const { email, password, school, fullName } = this.state
		
		this.setState({ submittedEmail: email, submittedPassword: password, submittedSchool: school, submittedFullName: fullName })

		this.register(email, password, school, fullName);
	}

	register = (email, password, school, fullName) => {
		let userData = {
			"username": email,
			"school": config.url + "/schools/" + school + "/",
			"fullName": fullName,
			"password": password,
		}

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
			// this does not work for now (uses the else block)
			if (res.status === 201) {
				this.setState({redirecToLogin: true});
			}
			else if (res.detail) {
				this.setState({register_err: <Message negative>{res.detail}</Message>})
			}
			else if (res.non_field_errors) {
				this.setState({register_err: <Message negative>{res.non_field_errors} (This email might be taken for this school)</Message>})
			}
			else {
				this.setState({redirecToLogin: true});
			}
		})
	}

	render() {
		if (this.state.redirecToLogin) {
			return <Redirect to="/login" />
		}

		return (
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center'>
					<Image src='/SS_logo.png' /> Create an account
				</Header>
				<Form size='large' onSubmit={this.handleSubmit}>
					<Segment stacked>
					<Progress value={this.state.progress} total={maxProgress} progress='ratio' />
					{this.state.register_err}
					<SchoolSearchDropdown id="0" handleChange={this.handleSchoolChange}/>
					<br />
					{this.state.email_err}
					<Form.Group>
					<Form.Input 
						fluid
						icon='mail'
						iconPosition='left'
						placeholder='School Email (before @)'
						name="email"
						onChange={this.handleEmailChange}
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
						onChange={this.handleNameChange}
						id="3"
					/>
					{this.state.password_err}
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						placeholder='Create Password'
						name="password"
						type='password'
						onChange={this.handlePasswordChange}
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