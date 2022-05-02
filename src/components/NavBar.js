import React from "react";
import styled from 'styled-components';
import memories from '../images/memories.png';
import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <Container>
            <Link to="/">
                <Title>
                    <img src={memories} />
                    Memories
                </Title>
            </Link>
            <Link to="/auth"> 
                <SignIn>
                    Sign In
                </SignIn>
            </Link>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 10px 20px;
    border-radius: 10px;
    margin: 30px;
    height: 70px;
    width: 80vw;
    box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
    @media (max-width: 756px)
    {
        font-size: 10vw;
        img{
            height: 10vw;
        }
    }
    a{
        text-decoration: none;
    }
`;


const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    color: darkblue;
    img{
        height: 50px;
        margin: 0 5px;
    }
    @media (max-width: 756px)
    {
        font-size: 10vw;
        img{
            height: 10vw;
        }
    }
`;

const SignIn = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: blue;
    border-radius: 10px;
    color: white;
    font-size: 1.2rem;
    :hover{
        box-shadow: darkblue 0px 0px 12px 0px ;
    }
`;