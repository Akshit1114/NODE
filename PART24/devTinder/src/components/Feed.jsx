import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addFeed } from "../utils/feedSlice"
import FeedCard from "./FeedCard"



const Feed = () => {

    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()

    const getFeed = async () => {
        if (feed?.length > 0) return
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
            dispatch(addFeed(res?.data?.data))
            // console.log(res.data.data[0])
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=> {
        getFeed()
    },[])

    // console.log(feed)

    if (feed.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return <div className="min-h-screen flex items-center justify-center"><FeedCard user={feed[0]} /></div>
}

export default Feed