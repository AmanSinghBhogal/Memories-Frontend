import React,{ useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {

    const [searchTitle, setSearchTitle ] = useState('');
    const [searchBy, setSearchBy] = useState('Title');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
            <Container>
                <form onSubmit={handleSearch} id="search">
                    <Inputs>
                        <select id="SearchBy" onChange={(e) => { setSearchBy(e.target.value); console.log(searchBy)}}>
                            <option value="Title">Title</option>
                            <option value="Tags">Tags</option>
                        </select>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="Search"
                            onChange={
                                (e) => setSearchTitle(e.target.value)
                            }
                        >
                        </input>
                        <button type="submit" id="search_btn">
                            <SearchIcon  id="search_icon"/>
                        </button>
                    </Inputs>
                </form>
            </Container>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px 0px;
    #search{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Inputs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    #title,#SearchBy{
        height: 40px;
        font-size: 1rem;
        box-sizing: border-box;
        border: 1px solid grey;
        padding: 10px;
    }
    #search_btn{
        height: 40px;
        background-color: #0000ff;
        border: inherit;
        border-radius: 0px 8px 8px 0px;
        padding: 2px;
        cursor: pointer;
    }
    #SearchBy{
        border-radius: 8px 0px 0px 8px;
    }
    #search_icon{
        font-size: 2rem;
        color: white;
    }
`;  
