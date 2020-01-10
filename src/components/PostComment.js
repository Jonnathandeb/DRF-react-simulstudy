import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ReadableTime from "./ReadableTime"

export default class PostComment extends Component {
	state = {
		isLoading: true,
		data: [],
		width: window.innerWidth,
	}

	loadCommentData() {
		this.setState({ isLoading: true, })

		fetch(this.props.url)
		.then(res => res.json())
		.then((data) => {
			this.setState({isLoading: false, data: data})
			this.loadUserData(this.state.data.user)
			this.loadSubComments(this.state.data.url.slice(this.state.data.url.indexOf("/posts/") + 7, this.state.data.url.length - 1))
		})
    }
    
    loadUserData(url) {
		this.setState({ isLoading: true, })

		fetch(url)
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
		this.loadCommentData()
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
		let comment = {};
		let commentContent;
		if (!this.state.isLoading) {
			commentContent = null;
			comment = this.state.data;
			comment.id = this.state.data.url.slice(this.state.data.url.indexOf("/comments/") + 10, this.state.data.url.length - 1);
			comment.username_id = this.state.data.user.slice(this.state.data.user.indexOf("/users/") + 7);
		}
		else {
			commentContent = (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)
		}

		const { width } = this.state;
		const isMobile = width <= 500;

		let commentStyle;
		if (isMobile) {
			commentStyle = {minWidth: "95%"};
		}
		else {
			commentStyle = {maxWidth: "51%"};
		}

		return (
			<Comment.Group>
                <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                    <Comment.Content>
                    <Comment.Author as={Link} to="bruh">{this.state.data.}</Comment.Author>
                    <Comment.Metadata>
                        <span>2 days ago</span>
                    </Comment.Metadata>
                    <Comment.Text>{this.}</Comment.Text>
                    <Comment.Actions>
                        <a>Reply</a>
                    </Comment.Actions>
                    </Comment.Content>

                    <Comment.Group>
                    <Comment>
                        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                        <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <span>1 day ago</span>
                        </Comment.Metadata>
                        <Comment.Text>No, it wont</Comment.Text>
                        <Comment.Actions>
                            <a>Reply</a>
                        </Comment.Actions>
                        </Comment.Content>

                        <Comment.Group>
                        <Comment>
                            <Comment.Avatar
                            as='a'
                            src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                            />
                            <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                                <span>20 minutes ago</span>
                            </Comment.Metadata>
                            <Comment.Text>Maybe it would.</Comment.Text>
                            <Comment.Actions>
                                <a>Reply</a>
                            </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                        </Comment.Group>
                    </Comment>
                    </Comment.Group>
                </Comment>
            </Comment.Group>
		)
	}
}

<Comment.Group>
    <Comment>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
        <Comment.Content>
        <Comment.Author as='a'>Christian Rocha</Comment.Author>
        <Comment.Metadata>
            <span>2 days ago</span>
        </Comment.Metadata>
        <Comment.Text>
            I'm very interested in this motherboard. Do you know if it'd
            work in a Intel LGA775 CPU socket?
        </Comment.Text>
        <Comment.Actions>
            <a>Reply</a>
        </Comment.Actions>
        </Comment.Content>

        <Comment.Group>
        <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            <Comment.Content>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Metadata>
                <span>1 day ago</span>
            </Comment.Metadata>
            <Comment.Text>No, it wont</Comment.Text>
            <Comment.Actions>
                <a>Reply</a>
            </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
            <Comment>
                <Comment.Avatar
                as='a'
                src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                />
                <Comment.Content>
                <Comment.Author as='a'>Jenny Hess</Comment.Author>
                <Comment.Metadata>
                    <span>20 minutes ago</span>
                </Comment.Metadata>
                <Comment.Text>Maybe it would.</Comment.Text>
                <Comment.Actions>
                    <a>Reply</a>
                </Comment.Actions>
                </Comment.Content>
            </Comment>
            </Comment.Group>
        </Comment>
        </Comment.Group>
    </Comment>
</Comment.Group>