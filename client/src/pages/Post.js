import React from 'react'
import {useParams , useNavigate  } from "react-router-dom"
import {useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../helpers/AuthContext";

import CodeBlock from './CodeBlock'



function Post() {
    let navigate = useNavigate()
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('')
    const { authState } = useContext(AuthContext);

    const addComment = () => {
        axios
          .post(
            "http://localhost:3001/comments",
            {
              commentBody: newComment,
              PostId: id,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              const commentToAdd = {
                commentBody: newComment,
                username: response.data.username,
              };
              setComments([...comments, commentToAdd]);
              setNewComment("");
            }
          });
      };
    
    useEffect(() => {

        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
        // hljs.highlightAll()
    }, []);

    const deleteComment = (id) => {
        axios
          .delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }, // additional header provided 
          })
          .then(() => {
            setComments(
              comments.filter((val) => {
                return val.id != id;
              })
            );
          });
      };

      const deletePost = (id) => {
        axios
          .delete(`http://localhost:3001/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then(() => {
            navigate("/");
          });
      };
    
      const editPost = (option) => {
        if (option === "title"){
            let newTitle = prompt("Enter new Title")
            axios.put("http://localhost:3001/posts/title", {newTitle: newTitle, id: id}, {headers: {
              accessToken: localStorage.getItem("accessToken"),
            }}) 
            setPostObject({...postObject, title: newTitle})
        }
        else {
           let  newPostText = prompt("Enter new text for post")
           axios.put("http://localhost:3001/posts/postText", {postText: newPostText, id: id}, {headers: {
              accessToken: localStorage.getItem("accessToken"),
            }}) 
            setPostObject({...postObject, postText: newPostText})
        }
      }


    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                <div className="title" onClick={() => {
                  if(authState.username === postObject.username) {editPost("title")}}}> {postObject.title} </div>

{/*           <div className="body" onClick={() => {if(authState.username === postObject.username) {editPost('body')}}}>{postObject.postText}</div> */}

                <div className="body" onClick={() => {if(authState.username === postObject.username) {editPost('body')}}}> 
                 
                 {/* {postObject.postText} */}
                 <CodeBlock language = 'python' code = {postObject.postText} >
                 </CodeBlock>
                 </div>
                 
                
                
                <div className="footer">
                {postObject.username}
                    {authState.username === postObject.username && (
                    <button
                        onClick={() => {
                        deletePost(postObject.id);
                        }}
                    >
                        {" "}
                        Delete Post
                    </button>
                    )}

                    
                </div>
                

                </div>
            </div>
            <div className="rightSide">Comment Section
            <div className='addCommentContainer'>
              {/* <CodeBlock language= 'python' code={postObject.postText} >  </CodeBlock> */}
        
            <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
                    
                <button onClick={addComment}>Add comment</button>
            </div>
            <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
            </div>
            </div>
            </div>  )
}

export default Post