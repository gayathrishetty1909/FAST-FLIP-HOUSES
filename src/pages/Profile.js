import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import {  useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getAuth, updateProfile} from "firebase/auth";
import { db } from "../firebase.config";
import {FaEdit}  from "react-icons/fa";
import {MdDoneOutline} from "react-icons/md";
import { doc, updateDoc, } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails ] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email,

  });
  const {name, email} = formData;

  const logoutHndler = () => {
    auth.signOut();
    toast.success("Sucessfully Logout");
    navigate("/");
  };


  //onchange
  const  onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
  }));
  };
    
  // submit handler

  const onSubmit = async () => {
    try{
       if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
          displayName:name
        })
       const userRef = doc(db, "users", auth.currentUser.uid)
       await updateDoc(userRef,{name})
       toast.success("User Updates !");
       }
    }catch(error){
        toast("Something Went Wrong")
      }
    
  };
    
  return (
    <Layout> 
      <div class="conatiner mt-4 w-50 d-flex justify-content-between">
      <h4> Profile Details</h4>
      <button  className="btn btn-danger" onClick={logoutHndler}>
        Logout
      </button>
      </div>

     <div className="container mt-4 card " style={{width: '18rem'}}>
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <p> User Personal Details</p>
          <span 
          style={{cursor: "pointer"}}
            onClick = {() => {
              changeDetails &&  onSubmit();
               setChangeDetails(prevState => ! prevState);
              }}
             >

            {changeDetails ? (
              <MdDoneOutline color="green"/>
               ) : (
                <FaEdit color="red"/>
              )}
          </span>
        </div>
      </div>
      </div>
  
    <div className="card-body">
    <form>
  <div className=" mt-8">
    <label htmlFor="exampleInputPassword" className="form-label">
      Name
      </label>
    <input 
    type="text"
     className="form-control" 
     id="name"
     value={name}
     onChange={onChange}
     disabled={! changeDetails}
     />
     </div>
       <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">
      Email address
      </label>
    <input 
    type="email"
     className="form-control" 
     id="email"
     value={email}
     onChange={onChange}
     aria-describedby="email help"
     disabled={! changeDetails}
       />
    
  </div>
</form>
</div>
  </Layout>
  );
};


export default Profile;

