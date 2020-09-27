import React from 'react'
import '../../css/search-panel.css'

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (event) => {
        const term = event.target.value;
        this.setState({ term: term })
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input
                className='form-control search-input'
                type='text'
                placeholder='Поиск по записям'
                onChange={this.onUpdateSearch} />
        )
    }
}