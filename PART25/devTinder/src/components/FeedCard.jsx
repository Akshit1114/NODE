import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice"

const FeedCard = ({ user }) => {

    
    const { _id,firstName, lastName, photoUrl, skills, about, age, gender } = user
    
    const dispatch = useDispatch()
    
    const handleInterested = async () => {

        try{
        const res = await axios.post(BASE_URL + "/request/sendConnectionRequest/interested/" + user._id, {} , { withCredentials: true })
        console.log(res)
        dispatch(removeFeed(user._id))
        // have to remove this user from feed via redux or calling api
        }catch(err){
            console.log(err.message)
        }

    }

    const handleIgnored = async () => {
        try {
            const res = await axios.post(BASE_URL + "/request/sendConnectionRequest/ignored/" + user._id, {} , { withCredentials: true })
            console.log(res)
            dispatch(removeFeed(user._id))
        } catch(err) {
            console.log(err.message)
        }
    }

    // by the way u would do both in one function via talking status as parameter which will passed at time of clicking the repective button.

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <p>{skills}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary" onClick={handleInterested}>Interested</button>
                    <button className="btn btn-primary" onClick={handleIgnored}>Ignored</button>
                </div>
            </div>
        </div>
    )
}


export default FeedCard