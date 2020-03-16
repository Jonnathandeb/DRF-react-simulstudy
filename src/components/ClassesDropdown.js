import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react';
import { getSession } from "../utils/cookie_manager"

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
        let dropdownArr = [<Dropdown.Item key="loading">Loading ...</Dropdown.Item>];
        if (!this.state.isLoading) {
            dropdownArr = [<Dropdown.Item key={0}>
                <NavLink to="/feed">
                    All Classes
                </NavLink>
            </Dropdown.Item>];
            for (let i = 0; i < this.state.data.length; i++) {
                let classId = this.state.data[i].id

                dropdownArr.push(<Dropdown.Item key={i + 1}>
                    <NavLink to={`/feed/${classId}`}>
                        {this.state.data[i].name}
                    </NavLink>
                </Dropdown.Item>)
            }
        }


        return (
            <Dropdown item text={this.props.name || "Classes"} simple>
                <Dropdown.Menu>
                    {dropdownArr}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}