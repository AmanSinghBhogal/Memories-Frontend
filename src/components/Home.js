import React, { useEffect , useState} from 'react';
import Form from './Form/form';
import Posts from './Posts/Posts';
import { useDispatch } from "react-redux";
import { getPosts } from '../actions/posts';
import styled from "styled-components";

function Home() {
    const [currentID, setCurrentID] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

  return (
        <Body>
            <Posts currentID= {currentID} setCurrentID= {setCurrentID}/>
            <Form currentID= {currentID} setCurrentID= {setCurrentID}/> 
        </Body>
  );
}

export default Home;

const Body = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    width: 80vw;
    @media (max-width: 756px)
    {
        flex-direction: column-reverse;
    }
`;