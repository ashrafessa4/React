import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signin } from "../services/userService";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbackService";
import Footer from "./Footer";

interface SigninProps {}

const Signin: FunctionComponent<SigninProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is Required")
        .min(6)
        .max(1024)
        .email(),
      password: yup.string().required("Password is Required").min(8).max(1024),
    }),
    onSubmit: (values: User) => {
      signin(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("You Signed in Successfully!");
          console.log(result.data.name);
          navigate("/home");
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
        <h3 className="display-5 text-center">LOGIN</h3>
        <div className="mb-3 form-floating">
          <input
            type="email"
            className="form-control"
            id="inputEmailLogin"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
          />
          <label htmlFor="inputEmailLogin">Email address</label>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
        <div className="mb-3 form-floating">
          <input
            type="password"
            className="form-control"
            id="inputPasswordLogin"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
          <label htmlFor="inputPasswordLogin" className="form-label">
            Password
          </label>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-danger">{formik.errors.password}</p>
        ) : null}
        <div>
          <button
            type="submit"
            className="btn btn-secondary w-100"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
          <p className="text-center mt-3">
            <Link to="/Signup">New User? Register Here</Link>
          </p>
        </div>
      </form>

      <div className="text-center m-5">
        <Footer />
      </div>
    </>
  );
};

export default Signin;
