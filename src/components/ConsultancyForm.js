import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConsultancyForm({ data, slug }) {
  const [ContactWithUs_Save_errors, setContactWithUs_Save_errors] = useState(
    {}
  );
  const [contact, setContact] = useState(null);

  const [Success, setSuccess] = useState("");

  useEffect(() => {
    const getContactdata = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });

        setContact(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getContactdata();
  }, [slug, data?.id, data?.name]);

  const Contact_With_US = (e) => {
    e.preventDefault();

    const formElement = document.querySelector(`#contact-with-us`);
    const formData = new FormData(formElement);

    let email = formData.get("email");
    let phone_no = formData.get("phone_no");
    let full_name = formData.get("full_name");
    let message = formData.get("message");
    let advisor = formData.get("advisor");

    const error = {};

    if (!email || email.trim() === "") {
      error.email = "Email is required *";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!phone_no || phone_no.trim() === "") {
      error.phone_no = "Phone Number is required *";
    } else {
      const minLength = 10;

      if (phone_no.length > minLength || phone_no.length < minLength) {
        error.phone_no = `Phone Number must be at least ${minLength} Number`;
      }
    }

    if (!full_name || full_name.trim() === "") {
      error.full_name = "Full name is required *";
    }

    if (!advisor || advisor.trim() === "") {
      error.advisor = "Advisor is required *";
    }

    if (!message || message.trim() === "") {
      error.message = "Message is required *";
    } else {
      const minLength = 20;

      if (message.length < minLength) {
        error.message = `Message must be at least ${minLength} characters or long`;
      }
    }

    if (Object.keys(error).length > 0) {
      setContactWithUs_Save_errors(error);
    } else {
      setContactWithUs_Save_errors({});
      let data = {
        email: email,
        full_name: full_name,
        phone_no: phone_no,
        message: message,
        advisor: advisor,
      };

      console.log(data);
      setSuccess("Your mail send  Successfully");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (Success !== "" || Success !== null) {
        setSuccess("");
      }
    }, 5000);
  }, [Success]);

  return (
    <section className="quick-consultancy-section content__item">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 pe-lg-4">
            <div className="quick-consultancy-left">
              <div className="quick-consultancy-img item-overflow">
                {contact?.Image?.url && (
                  <Image
                    src={`${BACKEND_URL}${contact?.Image?.url}`}
                    alt=""
                    className="content-item-zoom"
                    width="599"
                    height="347"
                  />
                )}
              </div>
              <div className="quick-consultancy-service content-item-y">
                {contact?.Title}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="quick-consultancy-form">
              <h3>{contact?.Quote_Title}</h3>

              <form onSubmit={Contact_With_US} id="contact-with-us">
                <div className="form-row">
                  <div className="form-group col-12 col-md-6">
                    <input
                      type="text"
                      placeholder="Your name*"
                      className="form-control"
                      name="full_name"
                    />
                    {ContactWithUs_Save_errors.full_name && (
                      <span className="get-free-quote-form-error">
                        {ContactWithUs_Save_errors.full_name}
                      </span>
                    )}
                    {/* {ContactWithUs_Save_errors && <} */}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      type="email"
                      placeholder="Email addrress*"
                      className="form-control"
                      name="email"
                    />
                    {ContactWithUs_Save_errors.email && (
                      <span className="get-free-quote-form-error">
                        {ContactWithUs_Save_errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-12 col-md-6">
                    <input
                      type="text"
                      name="advisor"
                      placeholder="Choose advisor*"
                      className="form-control"
                    />
                    {ContactWithUs_Save_errors.advisor && (
                      <span className="get-free-quote-form-error">
                        {ContactWithUs_Save_errors.advisor}
                      </span>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      type="Number"
                      placeholder="Number*"
                      name="phone_no"
                      className="form-control"
                    />
                    {ContactWithUs_Save_errors.phone_no && (
                      <span className="get-free-quote-form-error">
                        {ContactWithUs_Save_errors.phone_no}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Message*"
                    name="message"
                    className="form-control"
                  ></textarea>
                  {ContactWithUs_Save_errors.message && (
                    <span className="get-free-quote-form-error">
                      {ContactWithUs_Save_errors.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

                <div className="get-free-quote-form-success" role="alert">
                  <p className="success-text">{Success}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
