import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import auth0 from "auth0-js";
import config from "../auth_config.json";
import { logIn } from  "../utils/cookie_manager"


export class LoginPage extends React.Component {
	state = { email: '', password: '', submittedEmail: '', submittedPassword: '' }

	auth0 = new auth0.WebAuth({
		domain: config.domain,
		clientID: config.clientId
	});

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const { email, password } = this.state
		
		this.login(email, password)
		
		this.setState({ submittedEmail: email, submittedPassword: password })
	}

	login(email, password) {
		this.auth0.client.login(
			{
				realm: 'Username-Password-Authentication',
				username: email,
				password: password,
			},
			function (err, authResult) {
				if (err) {
					console.log("oops")
				}
				else {
					console.log(authResult)
					logIn(authResult.idToken)
				}
			}
		)
	}

  	render() {
		const { email, password, submittedEmail, submittedPassword } = this.state

		return (
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' textAlign='center'>
					<Image src='/SS_logo.png' /> Log in to your account
				</Header>
				<Form size='large' onSubmit={this.handleSubmit}>
					<Segment stacked>
					<Form.Input 
						fluid 
						icon='user' 
						iconPosition='left' 
						placeholder='Email Address' 
						name='email' 
						onChange={this.handleChange}
					/>
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						placeholder='Password'
						type='password'
						name='password'
						onChange={this.handleChange}
					/>

					<Button fluid size='large'>
						Login
					</Button>
					</Segment>
				</Form>
				<Message>
					New to us? <Link to="/register">Sign Up</Link>
				</Message>
				</Grid.Column>
			</Grid>
		)
  	}
}
