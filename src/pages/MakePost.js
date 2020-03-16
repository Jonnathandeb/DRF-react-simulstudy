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
		this.setState({file: file});
	};

	getPresignedURL = (file) => {
		let fileType = file.type;
		let fileName = file.name;

		let postData = {"file_name": fileName, "file_type": fileType}

		fetch(`${config.url}/get_presigned_url/`,{
			headers: new Headers({
				'Authorization': 'Bearer  ' + getSession().jwt, 
				'Content-type': 'application/json'
			}), 
			method: 'post',
			body: JSON.stringify(postData),
		})
		.then(res => res.json())
		.then((res) => {
			if (res.Success) {
				let signedURL = res.response.url;
				let signedData = res.response.fields;
				let formData = new FormData();

				for (let key in signedData) {
					formData.append(key, formData[key]);
				}

				formData.append("file", file, formData["key"])

				console.log(signedData)
				fetch(`${signedURL}?X-Amz-Algorithm=${signedData["x-amz-algorithm"]}&X-Amz-Credential=${signedData["x-amz-credential"]}&X-Amz-Date=${signedData["x-amz-date"]}&X-Amz-Expires=${signedData["Expires"]}&X-Amz-SignedHeaders=&X-Amz-Signature=${signedData["x-amz-signature"]}`,{
					headers: new Headers({
						"enctype": "multipart/form-data",
					}), 
					method: 'POST',
					body: formData
				})
				.then(res => res.text())
				.then((res) => {
					console.log(res)
					console.log(`${signedURL}?X-Amz-Algorithm=${signedData["x-amz-algorithm"]}&X-Amz-Credential=${signedData["x-amz-credential"]}&X-Amz-Date=${signedData["x-amz-date"]}&X-Amz-Expires=${signedData["Expires"]}&X-Amz-SignedHeaders=host&X-Amz-Signature=${signedData["x-amz-signature"]}`)
				}).catch((err) => {
					console.log(err)
				})
			}
			else {
				console.log("failed")
			}
		})
	}

	handleSubmit = () => {
		let postData = {"post_class": this.state.class, "title": this.state.title, "content": this.state.content, "image_url": this.state.file};

		this.getPresignedURL(this.state.file)

		/*fetch(`${config.url}/posts/`,{
			headers: new Headers({
				'Authorization': 'Bearer  ' + getSession().jwt, 
				'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
			}), 
			method: 'post',
			body: JSON.stringify(postData),
		})
		.then(res => res.json())
		.then((res) => {
			console.log(res)    
			if (res.url) {
				let redUrl = res.url.substring(res.url.indexOf(`${config.url}/posts/`) + 21);
				this.setState({redirect: "post/" + redUrl});
			}
		})*/
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