// import { useParams, useNavigate } from 'react-router-dom'
// import axios from "axios";
// import React, { useEffect, useState } from "react";


// function Profile() {
//   const navigate = useNavigate()
//   let { id } = useParams()

//   const [username, setUsername] = useState("");
//   const [listOfPosts, setListOfPosts] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
//       setUsername(response.data.username);
//     });

//     axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
//       setListOfPosts(response.data);
//     });
//   }, []);

//   return (
//     <div className="profilePageContainer">
//       <div className="basicInfo">
//         {" "}
//         <h1> Username: {username} </h1>
//       </div>
//       <div className="listOfPosts">
//         {listOfPosts.map((value, key) => {
//           return (
//             <div key={key} className="post">
//               <div className="title"> {value.title} </div>
//               <div
//                 className="body"
//                 onClick={() => {
//                   navigate(`/post/${value.id}`);
//                 }}
//               >
//                 {value.postText}
//               </div>
//               <div className="footer">
//                 <div className="username">{value.username}</div>
//                 <div className="buttons">
//                   <label> {value.Likes.length}</label>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Profile


import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState } from "react";
import CodeCard from "./CodeCard";

function Profile() {
  const navigate = useNavigate()
  let { id } = useParams()

  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>Username: {username}</h1>
      </div>
      <div>
        {listOfPosts.map((value, key) => {
          return (
            <CodeCard
              key={key}
              title={value.title}
              code={value.postText}
              username={value.username}
              likes={value.Likes.length}
              post_location = {value.id}
              user_location = {value.UserId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
