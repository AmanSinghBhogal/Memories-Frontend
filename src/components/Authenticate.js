import React, { useState} from 'react';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { auth } from "../Authentication/firebase";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { AUTH } from '../constants/ActionTypes';

const Authenticate = ({user, setUser}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [SignUp, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await auth.
        signInWithPopup(provider)
        .then((auth) => {

            // Id Token
            const token = auth?.credential.idToken;
            // User ProfileObj
            const result = auth?.additionalUserInfo.profile;
            // The signed-in user info.
            setUser({
                name: result.name,
                email: result.email,
                password: result.password
            })
            if(auth){
                navigate('/');
                console.log(auth);
                dispatch({
                    type: AUTH,
                    data: {result, token}
                })
            }
            swal({
                title: "Registered Successful!",
                icon: "success",
            });
        })
        .catch(error => {
            swal({
                title: `${error.message}`,
                icon: "warning",
            });
        });
    }

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        swal({
            title: "Please proceed with Google Sign In.",
            text: "The email and password sign in is currently shut down for development purpose.",
            icon: "warning",
        });
        // if(SignUp)
        // {
            // await auth
            // .createUserWithEmailAndPassword( user.email, user.password)
            // .then((auth) => {
            //     console.log(auth);
            //     if(auth){
            //         navigate('/');
            //     }
            //     swal({
            //         title: "Registered Successful!",
            //         icon: "success",
            //     });
            // })
            // .catch(error => {
            //     swal({
            //         title: `${error.message}`,
            //         icon: "warning",
            //     });
            // });
        // }
        // else
        // {
            // await auth
            // .signInWithEmailAndPassword( user.email, user.password)
            // .then((auth) =>{
            //     console.log(auth);
            //     navigate('/');
            //     swal({
            //         title: "Sign In Successful!",
            //         icon: "success",
            //     });
            // })
            // .catch(error => {
            //     swal({
            //         title: `${error.message}`,
            //         icon: "warning",
            //     });
            // });
        // }
    }
  return (
      <Container>
          <Title>
              {SignUp? 'Sign Up': 'Log in'}
          </Title>
          <Form>
              <form onSubmit={handleLogin}>
                {
                    SignUp? 
                        <InputTag>
                            <span>User Name:</span>
                            <span id='acc'>Already have an account? &nbsp;
                            <button onClick={() => setSignUp(false)}>
                                Log in
                            </button>
                            </span>
                        </InputTag>
                        :
                        null
                }
                {
                    SignUp? 
                        <input 
                            required = { SignUp && true}
                            type='text'  
                            onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })} 
                        placeholder="Enter your Name*"/>
                        :
                        null
                }
                <InputTag>
                    <span>Email:</span>
                    {
                        SignUp? 
                            null
                        :
                            <span id='acc'>
                                Need an account? &nbsp;
                                <button onClick={() => setSignUp(true)}>Sign Up</button>
                            </span>
                    }
                </InputTag>
                <input 
                    type='email'
                    autoComplete='email'
                    onChange={(e) => setUser({
                            ...user,
                            email: e.target.value
                        })} 
                    placeholder="Enter your Email*" 
                    required={true}
                />
                <InputTag>
                    <span>Password:</span>
                    <span id='acc'>
                        <button onClick={() => {
                            showPassword? setShowPassword(false):setShowPassword(true)
                        }}>
                            {
                                showPassword? 
                                    <VisibilityOffIcon />
                                :
                                    <VisibilityIcon />
                            }
                            &nbsp;
                            {
                                showPassword? 
                                'Hide'
                            :
                                'Show'
                            }
                        </button>
                    </span>
                </InputTag>
                <input 
                    type={showPassword? 'text':'password'} 
                    onChange={(e) => setUser({
                                ...user,
                                password: e.target.value
                            })
                        } 
                    placeholder='Enter your Password*' 
                    required={true}
                />
                <Submit>
                        <button type="submit">
                        {
                            SignUp?
                                'Sign Up'
                            :
                                'Log in'
                        }
                        </button>
                </Submit>
              </form>
          </Form>
          <Or>Or</Or>
          <button className='googleBTN' onClick={handleGoogleSignIn}>
            <GoogleSignIn>
                    <FcGoogle className="googleIcon"/>&nbsp;
                    Sign In with Google
            </GoogleSignIn>
          </button>
      </Container>
  );
};

export default Authenticate;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 40px;
    width:500px;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    @media (max-width: 756px)
    {
        width: 100%;
        padding: 48px 29px;
        border: none;
    }
    .googleBTN{
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        background-color: inherit;
    }
`;

const Title = styled.div` 
    font-size: 2rem;
    color: #282a35;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Form = styled.div`
    box-sizing: border-box;
    width: 100%;
    form{
        width: 100%;
    }
    input{
        box-sizing: border-box;
        border: 1px solid #ced4da;
        border-radius: 5px;
        display: flex;
        margin: 10px 0px;
        padding: 10px 5px;
        width: 100%;
        font-size: 1rem;
    }
`;

const InputTag = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #acc{
        font-weight: normal;
        display: flex;
        button{
            display: flex;
            align-items: center;
            border:none;
            background-color: white;
            color: blue;
            cursor: pointer;
            font-weight: 6  00;
        }
    }
`;

const Submit = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 20px 0px;
    button{
        cursor: pointer;
        color: white;
        background-color: blue;
        padding: 1px 40px;
        font-size: 1.1rem;
        font-weight: 700;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        :hover{
            box-shadow: darkblue 0px 0px 12px 0px ;
        }
    }
`;
const Or = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    height: 40px;
`;

const GoogleSignIn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    color: red;
    font-size: 1rem;
    :hover{
        box-shadow: rgb(155 149 149) 0px 0px 12px 0px ;
    }
    .googleIcon{
        font-size:2rem;
    }
`;