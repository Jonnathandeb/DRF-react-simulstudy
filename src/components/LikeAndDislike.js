import React from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'

import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

class LikeAndDislike extends React.Component {
    state = {
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
    }

    loadPostLikes(id) {
        this.setState({ isLoading: true, })
    
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

    componentDidMount() {
        let post_id = this.props.post_id

        this.loadPostLikes(post_id)
    }

    render() {
        return (
            <div>
                <Button as='div' labelPosition='right'>
                    <Button color={"red"}>
                        <Icon name='heart' />
                        {"Like"}
                    </Button>
                    <Label as='a' basic color={"red"} pointing='left'>
                        {this.state.likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color={"blue"}>
                        <Icon name='thumbs down' />
                        {"Dislike"}
                    </Button>
                    <Label as='a' basic color={"blue"} pointing='left'>
                        {this.state.dislikeCount}
                    </Label>
                </Button>
            </div>
        )
    }
}

export default LikeAndDislike;