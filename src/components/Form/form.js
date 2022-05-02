import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({currentID, setCurrentID}) => {
    const [postData, setpostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const updatedPost = useSelector(
        (state) => 
                currentID? state.posts.find((p) => p._id === currentID) : null
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if(updatedPost) 
            setpostData(updatedPost);
    }, [updatedPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentID)
        {
            dispatch(updatePost(postData._id, postData));
        }
        else
        {
            dispatch(createPost(postData))
        }
        clear();
    };

    const clear = () => {
        setCurrentID(null);
        setpostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };
    return(
        <Container>
            <form onSubmit={handleSubmit}>
                <FormTitle>
                    { currentID? 'Editing' : 'Create'} a Memory
                </FormTitle>
                <Inputs>
                    <input 
                        type="text" 
                        required = {true}
                        id="Creator" 
                        placeholder="Creator" 
                        value={postData.creator} 
                        onChange={
                            (e) => setpostData({
                                    ...postData,
                                    creator: e.target.value
                                })
                        }>
                    </input>
                    <input 
                        type="text" 
                        id="Title" 
                        placeholder="Title"
                        value={postData.title}
                        onChange={
                            (e) => setpostData({
                                    ...postData,
                                    title: e.target.value
                                })
                        }
                    >
                    </input>
                    <textarea 
                        placeholder="Message" 
                        rows={5} 
                        id="Message"
                        value={postData.message}
                        onChange={
                            (e) => setpostData({
                                    ...postData,
                                    message: e.target.value
                                })
                        }
                    >
                    </textarea>
                    <input 
                        type="text" 
                        id="Tags" 
                        placeholder="Tags (Coma Separated)"
                        value={postData.tags}
                        onChange={
                            (e) => setpostData({
                                ...postData,
                                tags: e.target.value.split(',')
                            })
                        }
                    >
                    </input>
                    <div id="file">
                        <FileBase 
                            type="file" 
                            multiple= {false}
                            onDone={
                                ({base64}) => setpostData({
                                    ...postData,
                                    selectedFile: base64
                                })
                            }
                        />
                    </div>
                    <button type="submit" id="Submit">Submit</button>
                    <button type="reset" onClick={clear} id="Clear">Clear</button>
                </Inputs>
            </form>
        </Container>
    );
};

export default Form;

const Container = styled.div`
    background-color: white;
    box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
    height: fit-content;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 20px;
    @media (max-width: 756px)
    {
        width: 100%;
    }
    form{
        width:100%;
    }
`;

const FormTitle = styled.div`
    box-sizing: border-box; 
    display: flex;
    margin: 8px;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
`;

const Inputs = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #Creator,#Title,#Message,#Tags,#file,#Submit,#Clear{
        box-sizing: border-box;
        width: 98%;  
        margin: 4px;
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid grey;
        box-shadow: 0.5px 0.8px grey;
    }
    #Submit{
        background-color: blue;
        color: white;
        cursor: pointer;
    }
    #Clear{
        background-color: red;
        color: white;
        cursor: pointer;
    }
`;