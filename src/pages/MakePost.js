import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { getSession } from "../utils/cookie_manager"

import ClassesSelect from '../components/ClassesSelect';
import { Redirect } from 'react-router-dom';

export class MakePostPage extends Component {
    state = { class: '', title: '', content: '', link: ''}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        let postData = {"user": "http://localhost:8000/users/5/", "post_class": this.state.class, "title": this.state.title, "content": this.state.content, "image_url": this.state.link};
        console.log(postData)

        fetch(`http://localhost:8000/posts/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
                'Content-Type': 'application/json',
            }), 
            method: 'post',
            body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then((res) => {
            if (res.url) {
                let redUrl = res.url.substring(res.url.indexOf("localhost:8000/posts/") + 21);
                this.setState({redirect: "post/" + redUrl});
            }
		})
    }
    
    render() {
        if (this.state.redirect) 
            return <Redirect to={this.state.redirect} />

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