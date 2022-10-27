import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCard, getCardById } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import * as yup from "yup";
import { useFormik } from "formik";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Card } from "../interfaces/Card";

interface EditcardProps {}

const Editcard: FunctionComponent<EditcardProps> = () => {
  const { id } = useParams();
  const [card, setCard] = useState({
    business_name: "",
    business_desc: "",
    business_address: "",
    business_phone: "",
    business_image: "",
  });

  useEffect(() => {
    getCardById(id as string)
      .then((result) => {
        console.log(result.data);

        setCard(result.data);
      })
      .catch(() => {
        errorMsg("Something went wrong! try agian.");
      });
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      business_name: card.business_name,
      business_desc: card.business_desc,
      business_address: card.business_address,
      business_phone: card.business_phone,
      business_image: card.business_image,
    },
    enableReinitialize: true,
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
      let card: Card = { ...values, _id: id };
      editCard(card)
        .then((result) => {
          successMsg("Card Edited Successfully!");
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
      <div className="container-fluid">
        <div className="row">
          <div className="form-floating mb-3 w-75 mx-auto">
            <h1 className="display-4 page-title text-center my-5">
              <i className="fa-solid fa-gear mx-3"></i>Edit Card
            </h1>
            {/* FORM */}
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
                <label htmlFor="floatingInput">Business Name</label>
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
                <label htmlFor="floatingInput">Business Description</label>
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
                <label htmlFor="floatingInput">Business address</label>
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
                {formik.touched.business_phone &&
                formik.errors.business_phone ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_phone}
                  </p>
                ) : null}
                <label htmlFor="floatingInput">Business Phone</label>
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
                {formik.touched.business_image &&
                formik.errors.business_image ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_image}
                  </p>
                ) : null}
                <label htmlFor="floatingInput">Business Image</label>
                <div className="button text-center my-4">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-dark btn-lg w-50 mx-auto"
                >
                  Edit Card
                </button>
              </div>
              </div>

              
            </form>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Footer />
      </div>
    </>
  );
};

export default Editcard;
