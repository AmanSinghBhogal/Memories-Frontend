import React,{useEffect} from "react";
import styled from 'styled-components';
import memories from '../images/memories.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth } from "../Authentication/firebase";
import swal from "sweetalert";
import { LOGOUT } from '../constants/ActionTypes';
import {useDispatch} from 'react-redux';

const Header = ({user, setUser}) =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async () => {

        if(user.email)
        {
            swal({
                title: "Are you sure you want to Sign out?",
                icon: "warning",
                buttons: ["Cancel", "Yes"],
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    setUser({
                        name: '',
                        email: '',
                        password: ''
                    });
                    auth.signOut();
                    dispatch({
                        type: LOGOUT
                    })   
                    swal("You have Successfully Signed Out!", {
                        icon: "success",
                    });
                } 
              });
        }
    }
    return(
        <Container>
            <Link to="/">
                <Title>
                    <img src={memories} alt="Ops"/>
                    Memories
                </Title>
            </Link>
            <Link to={user.email? "/": "/auth"} onClick={handleSignUp}> 
                <SignIn>
                    {
                        user.email? 'Sign Out': 'Log In'
                    }
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
        font-size: 9vw;
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
    @media (max-width: 756px)
    {
        font-size: 1rem;
    }
`;