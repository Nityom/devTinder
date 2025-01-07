import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
   
    try {
        const res = await axios.post(
             BASE_URL + "/login",
            {
                emailId: emailId,
                password: password,
            },
            {
                withCredentials: true, 
            }
        );
        // console.log(res.data); 
        dispatch(addUser(res.data));
        return navigate("/");
    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
    }
};


  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
    <label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text">What is your email ?</span>
 
  </div>
  <input type="text" placeholder="Type here" value={emailId} 
  className="input input-bordered w-full max-w-xs"
  onChange={(e) => setEmailId(e.target.value)} />
 
 
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password ?</span>
 
  </div>
  <input type="text" placeholder="Type here" value={password}
  onChange={(e) => setPassword(e.target.value)}
   className="input input-bordered w-full max-w-xs" />
 
</label>
    </div>
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login;
