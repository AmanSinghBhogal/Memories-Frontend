import React, { useEffect , useState} from "react";
import Form from './components/Form/form';
import Posts from './components/Posts/Posts';
import { useDispatch } from "react-redux";
import { getPosts } from './actions/posts';
import styled from "styled-components";
import Header from './components/Header';

const App = ()=>{
    
    const [currentID, setCurrentID] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return(
        <Container>
            <Header />
            <Body>
                <Posts currentID= {currentID} setCurrentID= {setCurrentID}/>
                <Form currentID= {currentID} setCurrentID= {setCurrentID}/> 
            </Body>
        </Container>
    );
};

export default App;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
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