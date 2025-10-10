import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("sharma@gmail.com")
    const [password, setPassword] = useState("Sharma@123")
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(80vh-80px)] bg-base-100 p-4">
      
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

        <label className="label mt-2">Password</label>
        <input type="password" className="input w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <p className="text-l text-red-600">{error}</p>

        <button className="btn btn-neutral w-full mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
