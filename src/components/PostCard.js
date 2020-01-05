import React, {Component} from 'react'
import { Card, Dimmer, Loader, Image, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default class PostCard extends Component {
    state = {
        isLoading: true,
        data: [],
    }

    loadPostData() {
        this.setState({ isLoading: true, })

        fetch(this.props.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({isLoading: false, data: data})
            this.loadClassName(this.state.data.post_class)
            this.loadUserData(this.state.data.user)
            this.loadPostLikes(this.state.data.url.slice(this.state.data.url.indexOf("/posts/") + 7, this.state.data.url.length - 1))
            this.loadPostComments(this.state.data.url.slice(this.state.data.url.indexOf("/posts/") + 7, this.state.data.url.length - 1))
        })
    }

    loadClassName(url) {
        this.setState({ isLoading: true, })

        fetch(url)
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

    loadPostLikes(id) {
        this.setState({ isLoading: true, })

        fetch(`http://localhost:8000/likes_for_post/?post_id=${id}`)
        .then(res => res.json())
        .then((data) => {
            this.setState((prevState) => {
                console.log(data.length)
                let dataArr = prevState.data;
                dataArr.like_count = data.length;
                return {isLoading: false, data: dataArr}
            })
        })
    }

    loadPostComments(id) {
        this.setState({ isLoading: true, })

        fetch(`http://localhost:8000/comments_for_post/?post_id=${id}`)
        .then(res => res.json())
        .then((data) => {
            this.setState((prevState) => {
                console.log(data.length)
                let dataArr = prevState.data;
                dataArr.comment_count = data.length;
                return {isLoading: false, data: dataArr}
            })
        })
    }

    componentDidMount() {
        this.loadPostData()
    }

    render() {
        let post = {};
        let cardContent;
        if (!this.state.isLoading) {
            cardContent = null;
            post = this.state.data;
            post.id = this.state.data.url.slice(this.state.data.url.indexOf("/posts/") + 7, this.state.data.url.length - 1);
            post.username_id = this.state.data.user.slice(this.state.data.user.indexOf("/users/") + 7);
        }
        else {
            cardContent = (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )
        }

        return (
            <Card href="#" as={Link} to={`/post/${post.id}`} centered>
                {cardContent}
                <Image src={post.image_url} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta>{post.post_class}</Card.Meta>
                    <Card.Description>
                        {post.content}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />
                    <Link to={`/profile/${post.username_id}`}>{post.username}</Link>
                    <br />
                    <Icon name='heart' />
                    {post.like_count} Like(s)
                    <br />
                    <Icon name='comment' />
                    {post.comment_count} Comment(s)
                </Card.Content>
            </Card>
        )
    }
}