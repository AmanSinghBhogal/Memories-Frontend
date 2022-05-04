import React, { useState} from 'react';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { auth } from "../Authentication/firebase";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Authenticate = ({user, setUser}) => {

    const navigate = useNavigate();
    const [SignUp, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) =>
    {
        e.preventDefault();
        if(SignUp)
        {
            auth
            .createUserWithEmailAndPassword( user.email, user.password)
            .then((auth) => {
                console.log(auth);
                if(auth){
                    navigate('/');
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
        else
        {
            auth
            .signInWithEmailAndPassword( user.email, user.password)
            .then((auth) =>{
                console.log(auth);
                navigate('/');
                swal({
                    title: "Sign In Successful!",
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
                            type='text'  
                            onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })} 
                        placeholder="Enter your Name"/>
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
                    onChange={(e) => setUser({
                            ...user,
                            email: e.target.value
                        })} 
                    placeholder="Enter your Email" 
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
                    placeholder='Enter your Password' 
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
    }
`;