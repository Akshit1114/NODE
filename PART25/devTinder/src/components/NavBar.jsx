import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {

  const dispatch = useDispatch()

  const user = useSelector(store => store.user)
  // console.log(user)
  const UserPhotoUrl = user ? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  
  const handleLogout = async () => {
    await axios.post(BASE_URL + "/auth/logout", {}, {withCredentials : true})
    dispatch(removeUser())
  }

    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🤝devTinder</Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={UserPhotoUrl} />
        </div>
      </div>
      {user ? <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/" onClick={handleLogout} >Logout</Link></li>
      </ul> : <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/signUp" className="justify-between">
            SignUp
          </Link>
        </li>
        <li><Link to="/login" >Login</Link></li>
      </ul>}
    </div>
  </div>
        </div>
    )
}

export default NavBar