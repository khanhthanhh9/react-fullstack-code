import {Formik, Field, Form, ErrorMessage} from "formik";
import * as yup from 'yup';
import axios from "axios"
import { AuthContext } from "../helpers/AuthContext";
import {useNavigate} from 'react-router-dom'
import React, { useContext, useEffect } from "react";


function CreatePost() {
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext);
    const validationSchema = yup.object().shape({
        title: yup.string().required() ,
        postText: yup.string().required(),
    });

    
    const initialValues = {
        title:"",
        postText:"",
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
      }, []);
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken") },
      }).then(
      (response) => {
            navigate('/')
      })
    }
    return <div className="createPostPage"> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema ={validationSchema}>
            <Form className="formContainer">
                <label>Title</label>
                <Field id ='inputCreatePost' name= "title" placeholder="Title ..." ></Field>
                <ErrorMessage name ='title' component= "span"></ErrorMessage>
                <label>Text</label>
                <Field id ='inputCreatePost' name= "postText" placeholder="Post ..." ></Field>
                <ErrorMessage name ='postText' component= "span"></ErrorMessage>

                


                <button type="submit"> Create Post</button>
            </Form>
        </Formik>
    </div>
}

export default CreatePost;