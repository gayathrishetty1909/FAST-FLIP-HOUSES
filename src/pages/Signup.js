import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../components/layout/Layout";
import { toast } from 'react-toastify';
import {BsFillEyeFill} from 'react-icons/bs';
import {
     getAuth, 
     createUserWithEmailAndPassword,
      updateProfile} 
    from  "firebase/auth";
import { db } from "../firebase.config";
import { doc,setDoc, serverTimestamp } from 'firebase/firestore';

 const Signup = () => {
    const [showPassword, setShowPassword]= useState(false);
    const[formData, setFormData]= useState({
        email:" ",
        name:" ",
        password:" "
    });
    const { name, email, password } = formData;
    const navigate= useNavigate();

    const onChange = ( e) => { 
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]:e.target.value,
        }));
    };

    const onSubmitHndler = async (e) => {
        e.preventDefault()
        try{
          const auth = getAuth( );
          const userCredential = await createUserWithEmailAndPassword(
            auth,
             email,
              password
            );
          const user = userCredential.user;
          updateProfile(auth.currentUser, {displayName:name});
          const formDataCopy = {...formData};
          delete formDataCopy.password;
          formDataCopy.timestamp = serverTimestamp();
          await setDoc(doc(db, "users", user.uid), formDataCopy);
          toast.success("Signup Successfully !");
          navigate("/");
          
        }
        catch(error) {
       console.log(error);
       toast.error("something Went Wrong");
      }
    };

  return (
    <Layout>
        <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHndler}>
            <h4 className="bg-dark p-2 mt2 text-light text-center"> Sign up </h4>
            <div className="mb-3">
                <label htmlfor="exampleInputEmail1" className="form-label">
                    Enter name
                </label>
            <input 
                type="text"
                value={name}
                className="form-control"
                id="name"
                onChange={onChange}
                aria-describedby="nameHelp"
            />
            </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">
                        Email address
                    </label>
                < input
                    type="email"
                    value={email}
                    onChange={onChange}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                />
                </div>
                
                <div className="mb-3">
                    <label htmlfor="exampleInputPassword" className="form-label">
                        Password
                    </label>
                < input
                    type = {showPassword ? "text": "password"}
                    value={password}
                    onChange={onChange}
                    className="form-control"
                    id="password"
                
                />
                <span> 
                    show password 
                    <BsFillEyeFill 
                    className="text-danger ms-2" 
                    style={{cursor:"pointer"}}
                    onClick={() =>{
                        setShowPassword(prevState => !prevState );
                } }>
                    </BsFillEyeFill>
                </span>
                </div>
                    <button type="submit" className="btn btn-primary" >
                        Sign Up
                    </button>
                    <div>
                        <h6> Login with Google</h6>
                        <span>Already User</span> <Link to="/signin"> Login</Link> 
                    </div>
            </form>
        </div>
    </Layout>
   );
};
                    
export default Signup;
