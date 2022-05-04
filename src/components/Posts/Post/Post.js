import React from "react";
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deletePost, likePost, dislikePost } from "../../../actions/posts";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const Post = ({post, currentID , setCurrentID, user}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function AlertSignIn()  
    {
        swal({
            title: "Sign In Required.",
            text: "Please Sign in to enable this Feature.",
            icon: "warning",
        }).then(
            () => {navigate("/auth")}
        );
    }

    return(
        <Container>
            <Heading BgImg={post.selectedFile}>
                <Top>
                    {post.creator}
                    <button onClick={() => {
                        if(user.email)
                            setCurrentID(post._id)
                        else
                            AlertSignIn();
                    }}>
                        <EditIcon />
                    </button>
                </Top>
                <Time>
                    {moment(post.createdAt).fromNow()}
                </Time>
            </Heading>
            <Body>
                <Tags>
                    {
                        post.tags.map((t) => (`#${t} `))
                    }
                </Tags>
                <Title>
                    {post.title}
                </Title>
                <Message>
                    {post.message}
                </Message>
                <Actions>
                        <Like>
                            <button onClick={() => {
                                if(user.email)
                                    dispatch(likePost(post._id));
                                else
                                    AlertSignIn();
                            }}>
                                    <ThumbUpAltIcon />
                            </button>
                            &nbsp;
                            <button onClick={() => {
                                if(post.likeCount>0 && user.email) 
                                    dispatch(dislikePost(post._id))
                                else
                                    AlertSignIn();
                            }}>
                                    <ThumbDownAltIcon />
                            </button>
                            &nbsp; Likes {post.likeCount}
                        </Like>
                    
                    
                    <button onClick={() => {
                        if(user.email)
                        {
                            swal({
                                title: "Are you sure?",
                                text: "Once deleted, you will not be able to recover this Post!",
                                icon: "warning",
                                buttons: ["Cancel", "Yes"],
                                dangerMode: true,
                              })
                              .then((willDelete) => {
                                if (willDelete) {
                                    dispatch(deletePost(post._id));
                                  swal("Your Post has been Deleted Successfully!", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Your Post is Safe!");
                                }
                              });
                        }
                        else
                            AlertSignIn();
                    }}>
                        <Delete>
                            <DeleteIcon />
                            Delete
                        </Delete>
                    </button>
                </Actions>
            </Body>
        </Container>
    );
};

export default Post;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
    width: max(20vw,200px);
    height: 400px;
    margin: 10px;
    border-radius: 8px;
    button{
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
    }
    @media (max-width: 756px)
    {
        width: 100%;
        margin: 15px 0px 10px 0px;
    }
`;

EditIcon = styled(EditIcon)`
    cursor: pointer;
`;

const Heading = styled.div`
    background-image: ${props =>`url("${props.BgImg}")`};
    opacity: 0.9;
    background-position: center;
    background-size: cover;
    color: white;
    border-radius: 8px 8px 0 0;
    width: 100%;
    height: 200px;
`;

const Top = styled.div`
    padding: 5px 10px 1px 10px;
    display: flex;
    font-size: 1.2rem;
    justify-content: space-between;
    align-items: center;
`;
const Time = styled.div`
    padding: 0px 10px 1px 10px;
`;

const Body = styled.div`
    width: 100%;
    height:60%;
    background-color: white;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Tags = styled.div`
    padding: 10px 10px 0px 10px;
    color: grey;
    font-size: 0.9rem;
`;

const Title = styled.div`
    font-size: 1.3rem;
    padding: 0 10px 0 10px;
`;
const Message = styled.div`
    font-size: 1rem;
    padding: 0 10px 0 10px;
`;
const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;
const Like = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: blue;
`;
const Delete = styled(Like)`
`;