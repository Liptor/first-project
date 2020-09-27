import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        color: ${props => props.colored ? 'red' : 'black'}
        :hover {
            color: blue;
        }
    }
    h2 {
        font-size: 1.2em;
        color: grey;
    }
`

const AppHeader = ({ liked, allPosts }) => {
    return (
        <Header colored>
            <h1>Ivan Ingovatov</h1>
            <h3>{allPosts} записей, из них понравилось {liked}</h3>
        </Header>
    )
}

export default AppHeader;