import React, {Component} from 'react'
import { Card, Dimmer, Loader, Image, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ReadableTime from "./ReadableTime";
import { getSession } from "../utils/cookie_manager";
import LikeAndDislike from "../components/LikeAndDislike";
import CommentCount from "../components/CommentCount";

import config from "../api_config.json";

export default class PostCard extends Component {
	state = {
		isLoading: true,
		data: [],
		width: window.innerWidth,
	}

	loadPostData() {
		this.setState({ isLoading: true, })

		fetch(this.props.url, {
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
		.then(res => res.json())
		.then((data) => {
			this.setState({isLoading: false, data: data})
			this.loadClassName(this.state.data.post_class)
			this.loadUserData(this.state.data.user)
		})
	}

	loadClassName(url) {
		this.setState({ isLoading: true, })

		fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
		.then(res => res.json())
		.then((data) => {
			this.setState((prevState) => {
				let dataArr = prevState.data;
				dataArr.post_class = data.name;
				return {isLoading: false, data: dataArr}
			})
		})
	}

	loadUserData(url) {
		this.setState({ isLoading: true, })

		fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
		.then(res => res.json())
		.then((data) => {
			this.setState((prevState) => {
				let dataArr = prevState.data;
				dataArr.username = data.username;
				return {isLoading: false, data: dataArr}
			})
		})
	}

	componentDidMount() {
		this.loadPostData()
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}
	  
	// make sure to remove the listener
	// when the component is not mounted anymore
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}
	
	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		let post = {};
		let cardContent;
		let extraCardContent;
		if (!this.state.isLoading) {
			cardContent = null;
			post = this.state.data;
			post.id = this.state.data.url.slice(this.state.data.url.indexOf("/posts/") + 7, this.state.data.url.length - 1);
			post.username_id = this.state.data.user.slice(this.state.data.user.indexOf("/users/") + 7);
			extraCardContent = (<Card.Content extra>
				<LikeAndDislike post_id={post.id} />
				<br />
				<CommentCount post_id={post.id} />
			</Card.Content>)
		}
		else {
			cardContent = (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)
		}

		const { width } = this.state;
		const isMobile = width <= 500;

		let cardStyle;
		if (isMobile) {
			cardStyle = {minWidth: "95%"};
		}
		else {
			cardStyle = {maxWidth: "51%"};
		}

		return (
			<Card href="#" as={Link} to={`/post/${post.id}`} centered style={cardStyle}>
				{cardContent}
				<div style={{maxHeight: "50vh", width: "100%", overflow: "hidden"}}>
					<Image size="medium" style={{minHeight: "100%", minWidth: "100%"}} src={post.image_url}  ui={true}/>
				</div>
				<Card.Content>
					<Card.Header>{post.title}</Card.Header>
					<Card.Meta>
						<Link to={`/profile/${post.username_id}`}>{post.username} - <ReadableTime seconds={post.time_from_now} /></Link>	
					</Card.Meta>
					<Card.Meta>
						{post.post_class}
					</Card.Meta>
					<Card.Description>
						{post.content}
					</Card.Description>
				</Card.Content>
				{extraCardContent}
			</Card>
		)
	}
}