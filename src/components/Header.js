import React from "react";
import styled from 'styled-components';
import memories from '../images/memories.png';

const Header = () =>{
    return(
        <Container>
            Memories
            <img src={memories} />
        </Container>
    );
};

export default Header;

const Container = styled.div`
    margin: 30px;
    display: flex;
    font-size: 3rem;
    height: 70px;
    color: darkblue;
    background-color: white;
    border-radius: 10px;
    width: 80vw;
    justify-content: center;
    align-items: center;
    img{
        height: 60px;
    }
    @media (max-width: 756px)
    {
        font-size: 10vw;
        img{
            height: 10vw;
        }
    }
`;