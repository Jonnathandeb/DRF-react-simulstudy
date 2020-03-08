import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import config from "../api_config.json";

class SchoolSearchDropdown extends React.Component {
    state = {
        results: []
    }

    handleChange = (e) => {
        let value = e.target.value;
    
        if (value.trim().length < 1) {
            this.setState({results: []})
            return
        }

	    fetch(`${config.url}/schools_search/?search=${value}`)
        .then(res => res.json())
        .then((data) => {
            let res = [];
            let preUrl = `${config.url}schools/`

            for (let i = 0; i < data.length; i++) {
                // get last part of url
                let id = data[i].url.substring(preUrl.length + 1);
                
                // cut off '/'
                id = id.substring(0, id.length - 1);
                
                res.push({key: id, value: id, text: data[i].name})
            }

            this.setState({results: res})
		})
    }

    render() {
        return (
            <Dropdown
                placeholder="Your School"
                fluid
                search
                selection
                onSearchChange={this.handleChange}
                options={this.state.results}
            />
        )
    }
}

export default SchoolSearchDropdown;