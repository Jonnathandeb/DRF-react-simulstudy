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
            let classLinks = [];

            // switches all classes data to the link of the class
            if (Array.isArray(classes)) {
                classes.forEach((e) => {
                    classLinks.push(e["student_class"]);
                })
            }

            for (let i = 0; i < classLinks.length; i++) {
                this.loadClassData(classLinks[i]).then((data) => {
                    let joined = this.state.data.concat(data);
                    this.setState({ data: joined })
                });
            }

            this.setState((prevState) => {
                return {isLoading: false, data: prevState.data}
            })
		})
    }

    loadClassData(url) {
        return fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
        .then(res => res.json())
    }
    
    componentDidMount() {
        this.loadClasses()
    }

    render() {
        let dropdownArr = [{key: '0', text: "Loading ...", value: null}];
        if (!this.state.isLoading) {
            dropdownArr = [];
            for (let i = 0; i < this.state.data.length; i++) {
                let classUrl = this.state.data[i].url

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