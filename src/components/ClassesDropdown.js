import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react';
import { getSession } from "../utils/cookie_manager"

export default class ClassesDropdown extends Component {
    state = {
        isLoading: true,
        data: [],
    }

    loadClasses() {
        this.setState({ isLoading: true, })
        console.log(getSession().jwt)

        fetch(`http://localhost:8000/membership_user/?user_id=${this.props.id}`,{
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
        let dropdownArr = [<Dropdown.Item key="loading">Loading ...</Dropdown.Item>];
        if (!this.state.isLoading) {
            dropdownArr = [<Dropdown.Item key={0}>
                <NavLink to="/feed">
                    All Classes
                </NavLink>
            </Dropdown.Item>];
            for (let i = 0; i < this.state.data.length; i++) {
                let classUrl = this.state.data[i].url
                classUrl = classUrl.slice(classUrl.indexOf("/classes/") + 9);

                dropdownArr.push(<Dropdown.Item key={i + 1}>
                    <NavLink to={`/feed/${classUrl}`}>
                        {this.state.data[i].name}
                    </NavLink>
                </Dropdown.Item>)
            }
        }


        return (
            <Dropdown item text="Classes" simple>
                <Dropdown.Menu>
                    {dropdownArr}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}