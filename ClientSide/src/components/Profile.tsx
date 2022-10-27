import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbackService";
import { getMyUserDetails } from "../services/userService";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {

    const [user, setUser] = useState<User>({_id:'',name:'',email:'',biz:false})

    const navigate = useNavigate()
    
    useEffect(() => {
        getMyUserDetails().then((result)=>{
            setUser(result.data)
            console.log(result.data);
            
        }).catch((err)=>console.log(err))
    }, []);


    
    return ( <>
        <Navbar/>

        <h1 className="display-4 page-title text-center my-5">Profile</h1>

        <div className="container section-container-profile">
            <div className="display-6 fs-4">
                <div className="text-center py-4">
                    <div className="card-body">
                        <h5 className="mb-4">Youre logged in as:</h5>
                        <h5 className="card-title display-4 fs-1"><strong>{user.name}</strong></h5>
                        <h6 className="card-subtitle mb-2 text-muted display-4 fs-1">{user.email}</h6>
                    </div>
                    <div className="card-footer bg-transparent">
                        <p className="card-text mt-4">{user.biz ? (<>
                            <i className="fa-regular fa-circle-check"></i> You are a BIZ ACCOUNT
                        </>):(<>
                            <i className="fa-regular fa-circle-xmark "></i> You are not a BIZ User
                        </>)}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center" id="footerbottom">
        <Footer />
        </div>
    </> );
}
 
export default Profile;