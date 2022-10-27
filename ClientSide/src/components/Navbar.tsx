import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { getBiz, getUser } from "../services/userService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [bizUser, setUser] = useState<boolean>(false)

  const navigate = useNavigate();
  // Removing Roken when Log Out
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    successMsg("Logged Out Successfully");
    navigate("/");
  };

  // Checks if User Is Business


  useEffect(() => {
    setUser(getBiz());
  }, []);

  const isLogged = sessionStorage.getItem("token");

  return (
    <>
      <nav className="navbar navbar-expand-lg main-nav">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/home'>
                        <img className="nav-img" src="../../homelogo.png" alt="" />
                        </NavLink>
                    </li>
                </ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" aria-current="page" to="/all-cards">Cards</NavLink>
                        </li>
                        {bizUser ? (<>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/my-cards">My Cards</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/new-card">Add Cards</NavLink>
                            </li>
                        </>):(<></>)}
                        <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/profile">Profile</NavLink>
                            </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" to="/about">About</NavLink>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
                </div>
            </div>
        </nav>
    </> );
}
 
export default Navbar;