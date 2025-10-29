import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import axios from "axios"

const Body = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(store => store.user)

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/getProfile", 
            { withCredentials : true } )
            dispatch(addUser(res.data))
        }catch(err){
            // if (err.status == 401) {
            //     navigate("/")
            // }
            console.log(err.status)
        }
    }

    useEffect(()=>{
        if (!user) {
            fetchUser()
        }
    },[])

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            
            {/* 4. Tell the main content area to grow and fill any available space */}
            <main className="flex-grow">
                <Outlet />           {/* Responsible for render the children route when hit. */}
            </main>
            
            <Footer />
        </div>
    )
}

export default Body