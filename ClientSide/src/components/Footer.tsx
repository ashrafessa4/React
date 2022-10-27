import { FunctionComponent } from "react";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return ( <>
        <>
      <footer id="footer" className="">
        <i className="socials fab fa-facebook fa-2x px-2"></i>
        <i className="socials fas fa-envelope fa-2x px-2"></i>

        <p className="mt-1">
          Project was developed by
          <strong>
              <span className="name"> Ashraf Essa</span>
          </strong>
        </p>
      </footer>
    </>
    </> );
}
 
export default Footer;