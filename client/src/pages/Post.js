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


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
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
    backgroundColor: '#2b2b2b',
    color: '#f2f2f2',
  },
  postBody: {
    ...theme.typography.body1,
    paddingTop: theme.spacing(2),
    minHeight: '500px'
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
    backgroundColor: '#1b1b8d',
    color: '#f2f2f2',
    justifyContent: "center"
  },
  postBottomFooter: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid red",
    height: '40px'
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
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingBody, setEditingBody] = useState(false);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleDelete = () => {
      setConfirmOpen(true);
    };
  
    const handleConfirmDelete = () => {
      deletePost(postObject.id);
      setConfirmOpen(false);
    };
  
    const handleCancelDelete = () => {
      setConfirmOpen(false);
    };
  

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
        if (option === "title") {
          setEditingTitle(true);
        } else {
          setEditingBody(true);
        }
      };
      
      const handleTitleChange = (event) => {
        setPostObject({ ...postObject, title: event.target.value });
      };
      
      const saveTitle = () => {
        axios
          .put(
            "http://localhost:3001/posts/title",
            { newTitle: postObject.title, id: id },
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
              setEditingTitle(false);
            }
          });
      };

    
      const handleBodyChange = (event) => {
        setPostObject({ ...postObject, postText: event.target.value });
      };
      
      const saveBody = () => {
        axios.put("http://localhost:3001/posts/postText", {newText: postObject.postText, id: id}, {headers: {
          accessToken: localStorage.getItem("accessToken"),
        }}) 
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              setEditingBody(false);
            }
          });
      };

      return (
        <div className={classes.root}>
          <div className={classes.post}>
          {editingTitle ? (
                <form onSubmit={saveTitle}>
                  <input
                    type="text"
                    value={postObject.title}
                    onChange={handleTitleChange}
                    style={{width: '100%'}}

                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <div
                  className={classes.postTopFooter}
                  onClick={() => {
                    if (authState.username === postObject.username) {
                      editPost("title");
                    }
                  }}
                >
                  {postObject.title}
                </div>
              )}
                    
      
                    {editingBody ? (
                        <form onSubmit={saveBody} style={{ width: "100%" }}>
                          <textarea
                            type="text"
                            value={postObject.postText}
                            onChange={handleBodyChange}
                            style={{ width: "100%", height: "300px", backgroundColor: '#2b2b2b',
                                      color: '#f2f2f2',
                                      padding: '10px', }}
                          />
                          <button type="submit">Save</button>
                        </form>
                      ) : (
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
                      )}
      
                        <div className={classes.postBottomFooter} style={{display: "flex", justifyContent: "space-between", padding: "2 px"}}>
                            {authState.username === postObject.username && (
                                <>
                                  <div>
                                  {/* other code ... */}
                                  <Button onClick={handleDelete}>Delete</Button>
                                  <ConfirmationDialog
                                    open={confirmOpen}
                                    onClose={handleCancelDelete}
                                    onConfirm={handleConfirmDelete}
                                  />
                                </div> 
                              </>
                          )}
                        </div>

                  
          </div>
          

        </div>
      );

}

export default Post