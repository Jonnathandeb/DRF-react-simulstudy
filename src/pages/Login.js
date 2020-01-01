import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";


export class LoginPage extends React.Component {
  render() {
    return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
			<Header as='h2' textAlign='center'>
				<Image src='/SS_logo.png' /> Log in to your account
			</Header>
			<Form size='large'>
				<Segment stacked>
				<Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' />
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					placeholder='Password'
					type='password'
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
