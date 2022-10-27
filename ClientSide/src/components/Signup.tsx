import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { User } from "../interfaces/User";
import { signup } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Footer from "./Footer";

interface SignupProps {}

const Signup: FunctionComponent<SignupProps> = () => {
  // Checks if Checkbox is business or not
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckboxValue(true);
    } else {
      setCheckboxValue(false);
    }
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().min(6).max(1024).email(),
      password: yup.string().required().min(8).max(1024),
      biz: yup.boolean(),
    }),
    onSubmit: (values) => {
      let user: User = { ...values, biz: checkboxValue };
      signup(user)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("You Registered Successfully!");
          if (checkboxValue == true) {
            navigate("/home");
          } else {
            navigate("/home");
          }
        })
        .catch((err) => {
          errorMsg("Something went Wrong, Try Agian");
          console.log(err);
        });
    },
  });
  return (
    <>
      <form className="mx-auto m-5 w-25" onSubmit={formik.handleSubmit}>
        <h3 className="display-5 text-center">REGISTER</h3>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
        </div>
        {formik.touched.name && formik.errors.name ? (
          <p className="text-danger">{formik.errors.name}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
          />
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-danger">{formik.errors.password}</p>
        ) : null}
         <div className="form-check form-switch text-center  mt-4">
                <input
                  className=""
                  type="checkbox"
                  role="switch"
                  onChange={handleChange}
                  id="subscribe"
                  name="subscribe"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Sign up as Bussiness Account
                </label>
              </div>
        <div>
          <button
            type="submit"
            className="btn btn-secondary w-100"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
          <p className="text-center mt-3">
            <Link to="/">Already Have A User? Login Here</Link>
          </p>
        </div>
      </form>

      <div className="text-center m-5">
        <Footer />
      </div>
    </>
  );
};

export default Signup;
