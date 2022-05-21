import React,{useEffect} from "react";
import Post from './Post/Post';
import { CircularProgress } from "@material-ui/core";
import { useLocation,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch,useSelector } from "react-redux";
import Paginate from "../Pagination";
import { LOAD_PAGE } from '../../constants/ActionTypes.js';
import { getPosts } from '../../actions/posts';

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

const Posts = ({ currentID ,setCurrentID, user, authState}) => {

    const query = useQuery();
    const page = query.get('page') || 1;
    const dispatch = useDispatch();

    const { posts } = useSelector(
        (state) => 
                state.posts
    );

    useEffect(() => {
        console.log('Dispatch from Posts called.');
        dispatch(getPosts(page)).then(() => console.log('Page Loaded'));
    }, [dispatch]);
    // console.log(`The Posts are: ${posts}`);
    return(
        !posts ? 
            <Container>
                <CircularProgress id="loading" />
            </Container>
            :
            (
                <Container>
                    {
                        posts.map((post) => (
                            <Card key={post._id} >
                                <Post post={post} currentID= {currentID} setCurrentID={setCurrentID} user={user} authState={authState}/>
                            </Card>
                        ))
                    }
                    <Pages>
                        <Paginate />
                    </Pages>
                </Container>
            )
    );
};

export default Posts;

const Container = styled.div`
    min-width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    @media (max-width: 756px)
    {
        width: 100%;
    }
    #loading{
        margin: 20px;
    }
`;

const Card = styled.div`
    @media (max-width: 756px)
    {
        width: 95%;
    }
`;

const Pages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
`;