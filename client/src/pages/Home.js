import React, { useContext } from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import "../App.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from "../helpers/AuthContext";
import CodeCard, { Codecard } from "./CodeCard"
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from "../helpers/SearchContext";


// import CodeCard from './CodeCard';
import Topbar from "../global/Topbar"

function Home() {
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { authState } = useContext(AuthContext);
  const { search } = useContext(SearchContext);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  }));
  // const classes = useStyles();
  let navigate = useNavigate()

  
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }; //add one like
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });

  };


  // return (
  //   <div className="App">
  //     {listOfPosts.map((value, key) => {
  //       return <div key={key} className="post" >
  //         <div className='title'> {value.title} </div>
  //         <div className='body' onClick={() => navigate(`/post/byId/${value.id}`)}> {value.postText} </div>


  //         <div className='footer'>
            // <div className='username'> <Link to={`/profile/${value.UserId}`}> {value.username}</Link>  {" "} </div>

  //           <ThumbUpIcon
  //             onClick={() => {
  //               likeAPost(value.id);
  //             }}
  //             className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
  //           >
  //             {" "}
  //             Like
  //           </ThumbUpIcon>
  //           <label> {value.Likes.length}</label>

  //         </div>
  //       </div>


  //     })}
  //   </div>
  // );

  return (
    <div>
      {search && <p>You searched for: {search}</p>}

      {listOfPosts
        .filter((post) => {
          return (
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.postText.toLowerCase().includes(search.toLowerCase())
          );
        })
        .map((value, key) => {
          return (
            <CodeCard
              key={key}
              title={value.title}
              code={value.postText}
              username={value.username}
              likes={value.Likes.length}
              post_location={value.id}
              user_location={value.UserId}
            />
          );
        })}
    </div>
  );


}

export default Home;
