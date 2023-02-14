import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import  Home  from "./pages/Home"
import  CreatePost  from "./pages/CreatePost"
import  Post  from "./pages/Post"
import  Registration  from "./pages/Registration"
import Login from "./pages/Login"
import { AuthContext } from './helpers/AuthContext'
import {useState, useEffect} from 'react'
import axios from "axios";
import PageNotFound from "./pages/PageNotFound.js";
import Profile from "./pages/Profile";
import Form from "./pages/Form";
import ChangePassword from "./pages/ChangePassword"
import Topbar from "./global/Topbar"
import Sidebar from "./global/Sidebar"
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"), // check the token to make sure that it works
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []); // only render this one time when go to this page to make it secure

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
  

  return (<div className='App'>
  <AuthContext.Provider value = {{authState, setAuthState}}>
  
  <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">    
    {/* <Sidebar></Sidebar> */}
    <Topbar></Topbar>
  <Router>
     
    <div className='navbar'> 
    {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
    <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
    </div>
    <Routes>
      <Route path = "/" element={<Home></Home>} ></Route>
      <Route path ="/createpost" element={<CreatePost></CreatePost>}></Route>
      <Route path="/post/byId/:id" element={<Post></Post>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/registration" element={<Registration></Registration>} />
      <Route path="/profile/:id" element={<Profile></Profile>} />
      <Route path="/changepassword/:id" element={<ChangePassword></ChangePassword>} />
      <Route path="/form" element={<Form></Form>} />
      <Route path="*" exact element={<PageNotFound></PageNotFound>} />


    </Routes>
  </Router>
  </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  {/* </ThemeProvider> */}
  </AuthContext.Provider>
  </div>)
}

export default App;
