import React, { Component } from 'react';
import SchoolSearch from "../components/SchoolSearch";
import { Button, Form, Grid, Header, Image, Message, Segment, Progress } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const maxProgress = 3;

export class RegisterPage extends Component {
    state = {
        progress: 0,
        isNullArr: [true, true, true],
    }
    
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
            console.log("is empty and was not before")
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

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='/SS_logo.png' /> Create an account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Progress value={this.state.progress} total={maxProgress} progress='ratio' />
                    <SchoolSearch otherChangeFunction={this.inputChange} id="0" />
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='School Email Address' onChange={this.inputChange} id="1" />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Create Password'
                        type='password'
                        onChange={this.inputChange}
                        id="2"
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