import React from "react";
import styled from 'styled-components';
import memories from '../images/memories.png';

const Header = () =>{
    return(
        <Container>
            <Title>
                <img src={memories} />
                Memories
            </Title>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3rem;
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