import React, { useState } from "react";
import {useDispatch} from "react-redux"
import "./authentication.css";
import {login} from "../userSlice";
import axios from "axios";
  
/**
 * 
 * {
    "access_token": "16d1adfc-9790-4ab9-9f45-2c0f0593d7a1",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": null,
    "refresh_token": "8ab5470f-81d0-4083-9f89-589efd7c71ab",
    "refresh_expires_in": 1209600,
    "download_token": "30fa5593-be2d-4fa5-a6f6-d32cd79ca20a"
    Authorization : "Bearer 16d1adfc-9790-4ab9-9f45-2c0f0593d7a1"
}
 */

function Authentication() {
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const dispatch =  useDispatch();
    const authentication = (e) => {
        e.preventDefault();
        const data = {
          "grant_type":"password", 
          "client_id":"sugar", 
          "client_secret":"", 
          "username":userName, 
          "password":password, 
          "platform":"custom" 
        };
        axios.post('https://test-90.mycrmspace.de/rest/v11_8/oauth2/token',data)
        .then(res => {
          console.log("connect")
          dispatch(
              login({
                  name :userName,
                  password:password,
                  token : res.token
              })
          )
        })
        .catch(err => {
          console.log("jiji")
        })
      }
  return <div> 
  <form className="modal-content animate" onSubmit={e => authentication(e)} >
    <div className="container">
      <label ><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required value={userName} onChange={e => setUserName(e.target.value)} ></input>    

      <label ><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required value={password}  onChange={e => setPassword(e.target.value)} ></input>
        
      <button type="submit"  >Login</button>
    </div>
  </form>
  </div>;
}

export default Authentication;
