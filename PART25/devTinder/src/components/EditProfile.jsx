import { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [error, setError] = useState("");
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills)
    const [showToast, setShowToast] = useState("False")
    const dispatch = useDispatch()

    const handleEdit = async () => {
        if (error) {
            setError("")
        }
        try{
            const res = await axios.patch(BASE_URL + "/profile/editUserProfile" , {
            age,
            about,
            gender,
            photoUrl,
            skills
        }, {withCredentials:true})
        console.log(res.headers)
        dispatch(addUser(res.data))
        setShowToast("True")
        setTimeout(()=>{
            setShowToast("False")
        },3000)
        }catch(err){
            setShowToast("Error")
            setTimeout(()=>{
                setShowToast("False")
            },3000)
            setError(err.response?.data || "An unexpected error occurred.");
        }
    };

    return user && (
        <div className="flex items-center justify-center min-h-screen gap-x-8 p-4">

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
                <legend className="fieldset-legend text-lg font-semibold">Edit Profile</legend>

                <label className="label">First Name</label>
                <input type="text" className="input w-full" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label className="label mt-2">Last Name</label>
                <input type="text" className="input w-full" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label className="label mt-2">Photo URL</label>
                <input type="url" className="input w-full" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

                <label className="label mt-2">About</label>
                <input type="text" className="input w-full" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} />
               
                <label className="label mt-2">Skills</label>
                <input type="text" className="input w-full" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} /> 

                <label className="label mt-2">Age</label>
                <input type="number" className="input w-full" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

                <label className="label mt-2">Gender</label>
                <input type="text" className="input w-full" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />

                 <p className="text-l text-red-600">{error}</p> 

                <button className="btn btn-neutral w-full mt-4" onClick={handleEdit}>Save Profile</button>
            </fieldset>

            <FeedCard user={ { firstName, lastName, photoUrl,  about, age, gender } } />

            <div className="toast toast-top toast-center">
                {showToast == "Error" ? <div className="alert alert-error">
                    <span>Failed</span>
                </div> : showToast == "True" ?
                <div className="alert alert-success">
                    <span>Message sent successfully.</span>
                </div> : ""} 
            </div>
            
        </div>
    );
};

export default EditProfile