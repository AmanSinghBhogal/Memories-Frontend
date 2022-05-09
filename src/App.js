import React, { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Authenticate from "./components/Authenticate";

const App = ()=>{

    const [user, setUser] = useState([{
        email: null,
        name: null,
        ProfilePic: null,
        password: null
    }]);

    return(
        <Router>
            <Container>
                <NavBar user={user} setUser={setUser} />
                <Routes>

                    {/* Home Page Rendering */}
                    <Route exact path = "/" element={ <Home user={user} /> } />

                    {/* Authentication */}
                    <Route exact path = "/auth" element={ <Authenticate user={user} setUser={setUser} /> } />

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