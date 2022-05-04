import React from "react";
import Post from './Post/Post';
import { CircularProgress } from "@material-ui/core";
import styled from 'styled-components';
import { useSelector } from "react-redux";

const Posts = ({ currentID ,setCurrentID, user}) => {
    const posts = useSelector(
        (state) => 
                state.posts
    );
    console.log(`The Posts are: ${posts}`);
    return(
        !posts.length ? 
            <Container>
                <CircularProgress />
            </Container>
            :
            (
                <Container>
                    {
                        posts.map((post) => (
                            <Card key={post._id} >
                                <Post post={post} currentID= {currentID} setCurrentID={setCurrentID} user={user}/>
                            </Card>
                        ))
                    }
                </Container>
            )
    );
};

export default Posts;

const Container = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    @media (max-width: 756px)
    {
        width: 100%;
    }
`;

const Card = styled.div`
    @media (max-width: 756px)
    {
        width: 95%;
    }
`;