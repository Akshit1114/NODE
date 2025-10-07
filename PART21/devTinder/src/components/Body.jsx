import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"

const Body = () =>{
    return (
        <>
            <NavBar/>
            <Outlet/>           {/* Responsible for render the children route when hit. */}
            <Footer/>
        </>
    )
}

export default Body