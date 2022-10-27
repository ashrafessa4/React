import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Footer from "./Footer";

interface NewcardProps {}

const Newcard: FunctionComponent<NewcardProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      business_name: "",
      business_desc: "",
      business_address: "",
      business_phone: "",
      business_image: "",
    },
    validationSchema: yup.object({
      business_name: yup.string().required("Business Name is Required").min(2),
      business_desc: yup
        .string()
        .required("Business Description is Required")
        .min(2),
      business_address: yup
        .string()
        .required("Business address is Required")
        .min(2),
      business_phone: yup
        .string()
        .required("Business Phone is Required")
        .min(9)
        .max(12),
      business_image: yup.string().required("Business Image is Required"),
    }),
    onSubmit: (values) => {
      addCard(values)
        .then((result) => {
          successMsg("Card Added Successfully!");
          navigate("/all-cards");
          console.log(result);
        })
        .catch((err) => {
          errorMsg("Something went wrong!");
          console.log(err);
        });
    },
  });
  return (
    <>
      <Navbar />
      <h1 className="display-4 page-title text-center my-5">Add New Card</h1>
      <div className="container section-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3 w-75 mx-auto">
            <input
              id="business_name"
              type="text"
              className="form-control "
              placeholder="Business Name"
              name="business_name"
              value={formik.values.business_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.business_name && formik.errors.business_name ? (
              <p className="text-danger mt-2">
                <i className="fa-solid fa-circle-exclamation mx-1"></i>
                {formik.errors.business_name}
              </p>
            ) : null}
            <label htmlFor="floatingInput"><strong>Name</strong></label>
          </div>

          <div className="form-floating mb-3 w-75 mx-auto">
            <input
              id="business_desc"
              type="text"
              className="form-control "
              placeholder="Business Description"
              name="business_desc"
              value={formik.values.business_desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.business_desc && formik.errors.business_desc ? (
              <p className="text-danger mt-2">
                <i className="fa-solid fa-circle-exclamation mx-1"></i>
                {formik.errors.business_desc}
              </p>
            ) : null}
            <label htmlFor="floatingInput"><strong>Description</strong></label>
          </div>

          <div className="form-floating mb-3 w-75 mx-auto">
            <input
              id="business_address"
              type="text"
              className="form-control "
              placeholder="Business address"
              name="business_address"
              value={formik.values.business_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.business_address &&
            formik.errors.business_address ? (
              <p className="text-danger mt-2">
                <i className="fa-solid fa-circle-exclamation mx-1"></i>
                {formik.errors.business_address}
              </p>
            ) : null}
            <label htmlFor="floatingInput"><strong>Address</strong></label>
          </div>

          <div className="form-floating mb-3 w-75 mx-auto">
            <input
              id="business_phone"
              type="text"
              className="form-control "
              placeholder="Business Phone"
              name="business_phone"
              value={formik.values.business_phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.business_phone && formik.errors.business_phone ? (
              <p className="text-danger mt-2">
                <i className="fa-solid fa-circle-exclamation mx-1"></i>
                {formik.errors.business_phone}
              </p>
            ) : null}
            <label htmlFor="floatingInput"><strong>Phone</strong></label>
          </div>

          <div className="form-floating mb-3 w-75 mx-auto">
            <input
              id="business_image"
              type="text"
              className="form-control "
              placeholder="Business Image"
              name="business_image"
              value={formik.values.business_image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.business_image && formik.errors.business_image ? (
              <p className="text-danger mt-2">
                <i className="fa-solid fa-circle-exclamation mx-1"></i>
                {formik.errors.business_image}
              </p>
            ) : null}
            <label htmlFor="floatingInput"><strong>Image</strong></label>
            <hr />
            <div className="button text-center">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-success btn-lg w-50 mx-auto"
              >
                Add Card
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="text-center mt-5">
        <Footer />
      </div>
    </>
  );
};

export default Newcard;
