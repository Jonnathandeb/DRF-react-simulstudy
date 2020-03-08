import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Label } from 'semantic-ui-react';

import config from "../api_config.json";

const resultRenderer = ({ name }) => <Label content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
}

const initialState = { isLoading: false, results: [], value: '' }

export default class SchoolSearch extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    if (this.props.otherChangeFunction)
        this.props.otherChangeFunction(e);

	this.setState({ isLoading: true, value })
	
	fetch(`${config.url}/schools/`)
        .then(res => res.json())
        .then((data) => {
			if (this.state.value.length < 1) return this.setState(initialState)

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
			const isMatch = (result) => re.test(result.name)

			this.setState({
				isLoading: false,
				results: _.filter(data, isMatch),
			})
		})
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
		<Search
		loading={isLoading}
		onResultSelect={this.handleResultSelect}
		onSearchChange={_.debounce(this.handleSearchChange, 500, {
			leading: true,
		})}
		results={results}
		value={value}
		resultRenderer={resultRenderer}
        placeholder={"Your School"}
		{...this.props}
		/>
    )
  }
}
