import React from 'react'
import {useParams , useNavigate  } from "react-router-dom"
import {useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../helpers/AuthContext";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CodeBlock from './CodeBlock'
import PromptDialog from './PromptDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#F2F2F2',
  },
  post: {
    
    width: '100%',
    border: '1px solid #C1C1C1',
    padding: theme.spacing(2),
    backgroundColor: '#FFFFFF',
    
    
  },
  postBody: {
    ...theme.typography.body1,
    paddingTop: theme.spacing(2),
    // minHeight: '100vw'
    minHeight: '160px'
  },
  postTopFooter: {
    ...theme.typography.body1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid red",
    borderBottom: "1px solid red",
    height: '40px',
    color: 'red',
    justifyContent: "center"
  },
  postBottomFooter: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid red",
    height: '40px'

    // position: "relative",
    // bottom: 0,
    // width: '100%',
    // textAlign: 'center',
  },
  comment: {
    width: '100%',
    border: '1px solid #C1C1C1',
    padding: theme.spacing(2),
    backgroundColor: '#FFFFFF',
    marginBottom: theme.spacing(2),
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid red",
    
  },
  commentUsername: {
    fontWeight: 'bold',
    borderLeft: '1px solid red',
    paddingLeft: theme.spacing(2),
  },
  commentBody: {
    paddingTop: theme.spacing(2),
    borderTop: '1px solid red',
    marginTop: theme.spacing(2),
  },
}));

function Post() {

    const classes = useStyles();
    let navigate = useNavigate()
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('')
    const { authState } = useContext(AuthContext);

    console.log('BREAK BROTHER')

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
                return val.id !== id;
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

      


      // return (
      //   <div className={classes.root}>
      //     <div className={classes.post}>
      //       <div className={classes.postHeader}>
      //         <h3>Post Title</h3>
      //         <p>Username</p>
      //       </div>
      //       <p className={classes.postBody}>
      //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      //       </p>
      //       <p className={classes.postFooter}>Username</p>
      //     </div>
      //     <div className={classes.comments}>
      //       <div className={classes.comment}>
      //         <div className={classes.commentHeader}>
      //           <h4>Comment 1</h4>
      //           <p className={classes.commentUsername}>Username</p>
      //         </div>
      //         <p className={classes.commentBody}>
      //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      //         </p>
      //       </div>
      //     </div>
      //     </div>)


      return (
        <div className={classes.root}>
          <div className={classes.post}>
            {/* <div className="post" id="individual"> */}
              <div
                className={classes.postTopFooter}
                onClick={() => {
                  if (authState.username === postObject.username) {
                    editPost("title");
                  }
                }}
              >
                {" "}
                {postObject.title}{" "}
              </div>
      
              {/*           <div className="body" onClick={() => {if(authState.username === postObject.username) {editPost('body')}}}>{postObject.postText}</div> */}
      
              <div
                className={classes.postBody}
                onClick={() => {
                  if (authState.username === postObject.username) {
                    editPost("body");
                  }
                }}
              >
                {/* {postObject.postText} */}
                <CodeBlock language="python" code={postObject.postText}></CodeBlock>
              </div>
      
              <div className={classes.postBottomFooter}>
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
          
          
          

          {/* <div className="">
            Comment Section
            <div className="addCommentContainer">
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
            </div> */}
          {/* </div> */}
        </div>
      );

}

export default Post