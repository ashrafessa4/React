import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Navbar />
      <h1 className="display-4 text-center my-5 page-title">
        About The Project
      </h1>
      <div className="container section-container-about p-5">
        <div className="text-center">
          <div className="col-12">
            <h1 className="display-5">React Project</h1>
            <p className="display-6 fs-4">
              Webiste used for managing Business Cards including all the
              essential information to contact a certain business
            </p>
            <hr />
            <p className="mb-4 display-6 fs-5">
              This Webiste was made as a React summary project for an
              assignment of HackerU College with NodeJS BackEnd to provide server functionality
            </p>
          </div>
        </div>
      </div>
      <div className="text-center" id="footerbottom">
        <Footer />
        </div>
    </>
  );
};

export default About;
