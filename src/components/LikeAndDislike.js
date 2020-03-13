import React from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'

import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

class LikeAndDislike extends React.Component {
    state = {
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
        hasLiked: false,
        hasDisliked: false
    }

    loadPostLikes(id) {
        fetch(`${config.url}/likes_for_post/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if (data.detail) {
                console.log(data.detail)
            }
            else if (data.hasOwnProperty("likes") && data.hasOwnProperty("dislikes")) {
                this.setState({likeCount: data.likes, dislikeCount: data.dislikes})
            }
        })
    }

    loadUserLiked(id) {
        fetch(`${config.url}/user_liked/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if (data.detail) {
                console.log(data.detail)
            }
            else if (data.hasOwnProperty("has_liked") && data.hasOwnProperty("has_disliked")) {
                this.setState({hasLiked: data.has_liked, hasDisliked: data.has_disliked})
            }
        })
    }

    componentDidMount() {
        let post_id = this.props.post_id

        if (!(post_id == null)) {
            this.loadPostLikes(post_id)
            this.loadUserLiked(post_id)
        }
    }

    render() {
        let likeColor = this.state.hasLiked ? "gray" : "red";
        let likeText = this.state.hasLiked ? "Liked" : "Like";

        let dislikeColor = this.state.hasDisliked ? "gray" : "blue";
        let dislikeText = this.state.hasDisliked ? "Disliked" : "Dislike";

        return (
            <div>
                <Button as='div' labelPosition='right'>
                    <Button color={likeColor}>
                        <Icon name='heart' />
                        {likeText}
                    </Button>
                    <Label as='a' basic color={likeColor} pointing='left'>
                        {this.state.likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color={dislikeColor}>
                        <Icon name='thumbs down' />
                        {dislikeText}
                    </Button>
                    <Label as='a' basic color={dislikeColor} pointing='left'>
                        {this.state.dislikeCount}
                    </Label>
                </Button>
            </div>
        )
    }
}

export default LikeAndDislike;