import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import ClassesDropdown from '../components/ClassesDropdown';

export class MakePostPage extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='/SS_logo.png' /> Create Post
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <ClassesDropdown id="5" name="Post in ..." />
                    <Form.Input 
                        fluid 
                        placeholder='Title'
                    />
                    <Form.TextArea
                        fluid
                        placeholder='Content'
                    />
                    <Form.Input 
                        fluid
                        placeholder="Image Link (Optional)"
                    />
                    <Button fluid size='large'>
                        Create Account
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
		    </Grid>
        );
    }
}