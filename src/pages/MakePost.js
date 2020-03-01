import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

import ClassesSelect from '../components/ClassesSelect';

export class MakePostPage extends Component {
    state = { class: '', title: '', content: '', link: '', submittedClass: '', submittedTitle: '', submittedContent: '', submittedLink: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        console.log(1)
        console.log(this.state)
    }
    
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='/SS_logo.png' /> Create Post
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                    <ClassesSelect id="5" handleChange={this.handleChange} />
                    <Form.Input 
                        fluid 
                        placeholder='Title'
                        name="title"
                        onChange={this.handleChange}
                    />
                    <Form.TextArea
                        fluid
                        placeholder='Content'
                        name="content"
                        onChange={this.handleChange}
                    />
                    <Form.Input 
                        fluid
                        placeholder="Image Link (Optional)"
                        name="link"
                        onChange={this.handleChange}
                    />
                    <Button fluid size='large'>
                        Post
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
		    </Grid>
        );
    }
}