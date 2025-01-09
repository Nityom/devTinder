import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
       
        dispatch(addUser(res.data.data));
        return navigate("/");
    } catch (err) {
      setError(err.response?.data || err.message);
        console.error("Login error:", err.response?.data || err.message);
        return navigate("/login");
    }
};

const handleSignUp = async () => {
  try{
    const res = await axios.post(BASE_URL + "/signup", {firstName,lastName,emailId,password},{withCredentials:true});
    dispatch(addUser(res.data.data));
    return navigate("/profile");

  } catch(err){
    setError(err.response?.data || err.message);
    console.error("Signup error:", err.response?.data || err.message);
  }
}

  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center"> {isLoginForm? "Login":"Signup"}</h2>
    <div>
   {!isLoginForm && <>
    <label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text">What is your First name ?</span>
 
  </div>
  <input type="text" placeholder="Type here" value={firstName} 
  className="input input-bordered w-full max-w-xs"
  onChange={(e) => setFirstName(e.target.value)} />
 
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text">What is your last name ?</span>
 
  </div>
  <input type="text" placeholder="Type here" value={lastName} 
  className="input input-bordered w-full max-w-xs"
  onChange={(e) => setLastName(e.target.value)} />
</label>
   </> 
   }
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
    <p className='text-red-500'> {error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin:handleSignUp}>
       { isLoginForm? "Login":"Signup"}
        </button>
       
    </div>
    <p className='flex justify-center cursor-pointer py-2' onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm ? "New User? Signup Here":"Existing User? Login here" }</p>
  </div>
</div>
    </div>
  )
}

export default Login;
