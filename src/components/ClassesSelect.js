import React, { Component } from 'react';
import { Form, Select } from "semantic-ui-react";
import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

export default class ClassesDropdown extends Component {
    state = {
        isLoading: true,
        data: [],
    }

    loadClasses() {
        this.setState({ isLoading: true, })

        fetch(`${config.url}/membership_user/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
        .then(res => res.json())
        .then((classes) => {
            this.setState({isLoading: false, data: classes})
		})
    }
    
    componentDidMount() {
        this.loadClasses()
    }

    render() {
        let dropdownArr = [{key: '0', text: "Loading ...", value: null}];
        if (!this.state.isLoading) {
            dropdownArr = [];
            for (let i = 0; i < this.state.data.length; i++) {
                let classUrl = `${config.url}/classes/${this.state.data[i].id}/`
                dropdownArr.push({key: i, text: this.state.data[i].name, value: classUrl})
            }
        }


        return (
            <Form.Field
                control={Select}
                options={dropdownArr}
                placeholder='Class'
                name="class"
                onChange={this.props.handleChange}
            />
        );
    }
}