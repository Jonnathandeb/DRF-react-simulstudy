import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { getSession } from "../utils/cookie_manager"

import ClassesSelect from '../components/ClassesSelect';
import { Redirect } from 'react-router-dom';

import config from "../api_config.json";

export class MakePostPage extends Component {
    state = { class: '', title: '', content: '', file: ''}
    fileInputRef = React.createRef();

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    fileChange = e => {
        this.setState({ file: e.target.files[0] }, () => {
            console.log("File chosen --->", this.state.file);
        });
    };

    fileUpload = file => {
        const url = "/some/path/to/post";
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
            "Content-type": "multipart/form-data"
            }
        };
        //return put(url, formData, config);
    };

    handleSubmit = () => {
        let postData = {"post_class": this.state.class, "title": this.state.title, "content": this.state.content, "image_url": this.state.link};

        fetch(`${config.url}/posts/`,{
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
                let redUrl = res.url.substring(res.url.indexOf(`${config.url}/posts/`) + 21);
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
                    <Button
                        fluid
                        size="medium"
                        content="Choose File (Optional)"
                        labelPosition="left"
                        icon="file"
                        onClick={() => this.fileInputRef.current.click()}
                        type="button"
                    />
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        hidden
                        onChange={this.fileChange}
                    />
                    <br/>
                    <Button fluid size='large' type="submit">
                        Post
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
		    </Grid>
        );
    }
}