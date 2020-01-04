import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from 'semantic-ui-react';

export default class ClassesDropdown extends Component {
    state = {
        isLoading: true,
        data: [],
    }

    loadClasses() {
        this.setState({ isLoading: true, })

        fetch(`http://localhost:8000/membership_user/?user_id=${this.props.id}`)
        .then(res => res.json())
        .then((classes) => {
            let classLinks = [];

            // switches all classes data to the link of the class
            classes.forEach((e) => {
                classLinks.push(e["student_class"]);
            })

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
        return fetch(url)
        .then(res => res.json())
    }
    
    componentDidMount() {
        this.loadClasses()
    }

    render() {
        let dropdownArr = [<Dropdown.Item key="loading">Loading ...</Dropdown.Item>];
        if (!this.state.isLoading) {
            dropdownArr = [];
            for (let i = 0; i < this.state.data.length; i++) {
                dropdownArr.push(<Dropdown.Item key={i}>
                    <Link to={this.state.data[i].url}>
                        {this.state.data[i].name}
                    </Link>
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