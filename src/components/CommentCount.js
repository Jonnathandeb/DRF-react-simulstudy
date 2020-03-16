import React from 'react'
import { Button, Label, Icon, Divider } from 'semantic-ui-react'

import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";


class CommentCount extends React.Component {
    state = {
        commentCount: 0,
    }

    loadPostComments(id) {
        this.setState({ isLoading: true, })
    
        fetch(`${config.url}/comments_for_post/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if (data.detail) {
                console.log(data.detail)
            }
            else if (data.comments) {
                this.setState({commentCount: data.comments})
            }
        })
    }

    componentDidMount() {
        let post_id = this.props.post_id

        if (!(post_id == null))
            this.loadPostComments(post_id)
    }

    render() {
        return (
            <div>
                <Button as='div' labelPosition='right'>
                    <Button color={"gray"}>
                        <Icon name='comment' />
                        Comments
                    </Button>
                    <Label as='a' basic color={"gray"} pointing='left'>
                        {this.state.commentCount}
                    </Label>
                </Button>
            </div>
        )
    }
}

export default CommentCount;