import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {

        try {

        const res = await axios.post( BASE_URL + "/auth/login", {
            // req body
            emailId,
            password
        }, {withCredentials : true})               // set cookies to be stored on browser {withCredentials : true}
        // console.log(res?.data)
        dispatch(addUser(res.data))
        return navigate("/")
        }catch(err) {
            setError(err?.response?.data || "Something went wrong")
            // console.log(err.response.data)
        }
    }

    const handleSignUp = async () => {
      try {
        const res = await axios.post(BASE_URL + "/auth/signup", 
        {firstName,lastName,emailId,password},
        {withCredentials : true})
        dispatch(addUser(res.data))
        return navigate("/")
      }
      
      catch(err){
        console.log(err)
      }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(80vh-80px)] bg-base-100 p-4">
      
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">{isLogin ? "Login" : "Sign Up"}</legend>

        {isLogin ? "" : <>
        <label className="label">First Name</label>
        <input type="text" className="input w-full" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)}/>

        <label className="label">Last Name</label>
        <input type="text" className="input w-full" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
        </>}

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

        <label className="label mt-2">Password</label>
        <input type="password" className="input w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <p className="text-l text-red-600">{error}</p>

        <button className="btn btn-neutral w-full mt-4" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login" : "Sign Up"}</button>

          <p className="text-center mt-4" onClick={() => setIsLogin(!isLogin)} >{isLogin ? "New User? Sign Up" : "Already A User? Login Here"}</p>

      </fieldset>

          
    </div>
  );
};

export default Login;
