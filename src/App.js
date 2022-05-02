import React, { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar';
import Home from './components/Home';

const App = ()=>{

    return(
        <Router>
            <Container>
                <NavBar />
                <Routes>

                    {/* Home Page Rendering */}
                    <Route exact path = "/" element={ <Home /> } />

                </Routes>
            </Container>
      </Router>
        
    );
};

export default App;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;