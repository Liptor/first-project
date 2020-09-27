import React from 'react'
import AppHeader from '../app-header';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import SearchPanel from '../search-panel'
import PostAddForm from '../post-add-form'
import '../../css/app.css'
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px
`
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, like: false, label: 'Going to learn React', important: true },
                { id: 2, like: false, label: 'That is so good', important: false },
                { id: 3, like: false, label: 'I need a break...', important: false },
                { id: 4, like: false, label: 'Go out to walk!!!', important: false }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 5;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = { ...old, important: !old.important }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }

        })
    }

    onToggleLiked = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = { ...old, like: !old.like }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }

        })
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        return this.setState({ term })
    }

    onFilterSelect = (filter) => {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts} />
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>
                <div>
                    <PostList
                        posts={visiblePosts}
                        onDelete={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleLiked={this.onToggleLiked} />
                    <PostAddForm
                        onAdd={this.addItem} />
                </div>
            </AppBlock >
        );
    }
}