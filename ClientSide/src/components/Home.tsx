import { FunctionComponent, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../interfaces/User";
import { getBiz, getMyUserDetails } from "../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {


  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    biz: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getMyUserDetails().then((result)=>{
        setUser(result.data)
    }).catch((err)=>console.log(err))
}, []);
  return (
    <>
      <Navbar />
      <h1 className="display-4 page-title text-center my-5">
        Welcome {user.name} 
      </h1>
      <div className="container section-container-home">
        <div className="row">
          <div className="col-12 display-6 fs-2">
            <p className="">This Project is suitable for you to:</p>
            {getBiz() ? (
              <>
                <ul className="list-group fs-4 mx-5">
                  <li className="mt-2">Advertise your shop</li>
                  <li className="mt-3">Discover other bussinesses</li>
                  <li className="mt-3">
                    Grow and multiply your shop's online footprint stream
                  </li>
                  <li className="mt-3">
                    Manage multiple business cards under <strong>ONE</strong>{" "}
                    account
                  </li>
                  <li className="mt-3">Create your own unique CARDS</li>
                </ul>
              </>
            ) : (
              <>
                <ul className="list-group fs-4 mx-5">
                  <li className="mt-2">
                    Find the right provider for your Business need
                  </li>
                  <li className="mt-2">View your Cards</li>
                  <li className="mt-2">
                    Connect between the Client and Business Accounts
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-center" id="footerbottom">
        <Footer />
      </div>
    </>
  );
};

export default Home;
