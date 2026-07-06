import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ContactForm = ({ data, slug }) => {
  const [ContactWithUs_Save_errors, setContactWithUs_Save_errors] = useState(
    {}
  );
  const [Success, setSuccess] = useState("");
  const [contact, setContact] = useState(null);

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

const Contact_With_US = async (e) => {
  e.preventDefault();

  const formElement = document.querySelector(`#contact-with-us`);
  const formData = new FormData(formElement);

  const email = formData.get("email");
  const phone_no = formData.get("phone_no");
  const full_name = formData.get("full_name");
  const message = formData.get("message");
  const advisor = formData.get("advisor");

  const error = {};

  if (!email || email.trim() === "") {
    error.email = "Email is required *";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error.email = "Invalid email address";
  }

  if (!phone_no || phone_no.trim() === "") {
    error.phone_no = "Phone Number is required *";
  } else if (phone_no.length !== 10) {
    error.phone_no = "Phone Number must be exactly 10 digits";
  }

  if (!full_name || full_name.trim() === "") {
    error.full_name = "Full name is required *";
  }

  if (!advisor || advisor.trim() === "") {
    error.advisor = "Advisor is required *";
  }

  if (!message || message.trim() === "") {
    error.message = "Message is required *";
  } else if (message.length < 20) {
    error.message = "Message must be at least 20 characters";
  }

  if (Object.keys(error).length > 0) {
    setContactWithUs_Save_errors(error);
    return;
  }

  setContactWithUs_Save_errors({});

  const payload = {
    data: {
      Email: email,
      Name: full_name,
      Number: phone_no,
      Message: message,
      Advisor: advisor,
    },
  };

 
  console.log("Submitted Data:", payload);

  try {
    const res = await fetchStrapiPage(themeConfig.api.contact_url, payload);
    setSuccess("Your Mail Sent Successfully!");
    formElement.reset();
  } catch (err) {
    console.error("Submission failed:", err);
    setSuccess("Something went wrong, please try again.");
  }
};


  useEffect(() => {
    setTimeout(() => {
      if (Success !== "" || Success !== null) {
        setSuccess("");
      }
    }, 5000);
  }, [Success]);

  switch (contact?.Type) {
    case "Type_Two":
      return (
        <section className="contact-page contact-page-2 inner-wrapper content__item">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-7">
                <div className="contact-form-info">
                  <div className="section-heading">
                    <h5
                      className="sub-title"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      {contact?.Contact_Title}
                    </h5>
                    <h2
                      className="title"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      {contact?.Contact_Sub_Title}
                    </h2>
                  </div>
                </div>

                <div className="about-image-gallery-style-2 contact-gallery">
                  {contact?.Image &&
                    contact?.Image?.map((item_image, index) => {
                      let add_class = "content-item-y";
                      let classes = "";
                      if (index === 0) {
                        add_class = "item-overflow";
                        classes = "content-item-zoom";
                      }
                      return (
                        <div
                          className={`about-image image-${index + 1
                            } ${add_class}`}
                          key={index}
                        >
                          <Image
                            src={`${BACKEND_URL}${item_image?.url}`}
                            alt=""
                            className={classes}
                            width={index === 0 ? 420 : 308}
                            height={index === 0 ? 210 : 160}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5">
                <div className="contact-form contact-form-style-2">
                  <p>{contact?.Contact_Description}</p>
                  <form
                    onSubmit={Contact_With_US}
                    className=""
                    id="contact-with-us"
                  >
                    <div className="form-row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your name"
                            name="full_name"
                          />

                          {ContactWithUs_Save_errors.full_name && (
                            <span className="get-free-quote-form-error">
                              {ContactWithUs_Save_errors.full_name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email addrress"
                            name="email"
                          />

                          {ContactWithUs_Save_errors.email && (
                            <span className="get-free-quote-form-error">
                              {ContactWithUs_Save_errors.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Choose advisor"
                            name="advisor"
                          />

                          {ContactWithUs_Save_errors.advisor && (
                            <span className="get-free-quote-form-error">
                              {ContactWithUs_Save_errors.advisor}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="Number"
                            className="form-control"
                            placeholder="Number"
                            name="phone_no"
                          />

                          {ContactWithUs_Save_errors.phone_no && (
                            <span className="get-free-quote-form-error">
                              {ContactWithUs_Save_errors.phone_no}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Message"
                        className="form-control"
                        name="message"
                      />

                      {ContactWithUs_Save_errors.message && (
                        <span className="get-free-quote-form-error">
                          {ContactWithUs_Save_errors.message}
                        </span>
                      )}
                    </div> {contact &&
                      <button type="submit" className="btn btn-primary">
                        {contact?.Button_Name}
                      </button>
                    }

                    <div className="get-free-quote-form-success" role="alert">
                      <p className="success-text">{Success}</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row contact-box-wrap">
              {contact?.Grid_Section &&
                contact?.Grid_Section.map((item, index) => {
                  return (
                    <div className="col-12 col-md-4" key={index}>
                      <div className="contact-detail-box contact-box-style-2">
                        <div className="icon">
                          {item?.Image?.url && (
                            <Image
                              src={`${BACKEND_URL}${item?.Image?.url}`}
                              alt=""
                              width={40}
                              height={40}
                            />
                          )}
                        </div>
                        <div className="contact-deatil-wrap">
                          <h6>{item?.Title}</h6>
                          <p>
                            {item?.Grid_Section &&
                              item?.Grid_Section?.map((item_detail, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    {item_detail?.Value && (
                                      <Link href={item_detail?.Value}>
                                        {item_detail?.Title}
                                      </Link>
                                    )}
                                    <br />
                                  </React.Fragment>
                                );
                              })}
                            {item.label && item.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="contact-map-section">
            <div className="contact-pam contact-pam-full">
              <iframe
                src={contact?.Map_Url}
                style={{ border: "0", width: "100%", height: "490px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      );

    case "Type_One":
      return (
        <section className="contact-page inner-wrapper">
          <div className="container">
            <div className="row mb-4 mb-md-0">
              {contact?.Grid_Section &&
                contact?.Grid_Section?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-4" key={index}>
                      <div className="contact-detail-box">
                        <div
                          className="icon"
                          data-aos="fade-up"
                          data-aos-duration="500"
                        >
                          {item?.Image?.url && (
                            <Image
                              src={`${BACKEND_URL}${item?.Image?.url}`}
                              alt=""
                              width={82}
                              height={83}
                            />
                          )}
                        </div>
                        <h6 data-aos="fade-up" data-aos-duration="1000">
                          {item?.Title}
                        </h6>
                        <p data-aos="fade-up" data-aos-duration="1500">
                          {item?.Grid_Section &&
                            item?.Grid_Section?.map((item_detail, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {item_detail?.Value && (
                                    <Link href={item_detail?.Value}>
                                      {item_detail?.Title}
                                    </Link>
                                  )}
                                  <br />
                                </React.Fragment>
                              );
                            })}
                          {item?.label && item?.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="contact-form-section contact-dark bg-tertiary">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="contact-form-info">
                    <div className="section-heading">
                      <h5
                        className="sub-title"
                        data-aos="fade-up"
                        data-aos-duration="500"
                      >
                        {contact?.Contact_Title}
                      </h5>
                      <h2
                        className="title"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        {contact?.Contact_Sub_Title}
                      </h2>
                    </div>

                    <p data-aos="fade-up" data-aos-duration="1500">
                      {contact?.Contact_Description}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="contact-form">
                    <form
                      onSubmit={Contact_With_US}
                      className=""
                      id="contact-with-us"
                    >
                      <div className="form-row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Your name"
                              name="full_name"
                            />
                            {ContactWithUs_Save_errors.full_name && (
                              <span className="get-free-quote-form-error">
                                {ContactWithUs_Save_errors.full_name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email addrress"
                              name="email"
                            />

                            {ContactWithUs_Save_errors.email && (
                              <span className="get-free-quote-form-error">
                                {ContactWithUs_Save_errors.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Choose advisor"
                              name="advisor"
                            />

                            {ContactWithUs_Save_errors.advisor && (
                              <span className="get-free-quote-form-error">
                                {ContactWithUs_Save_errors.advisor}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <input
                              type="Number"
                              className="form-control"
                              placeholder="Number"
                              name="phone_no"
                            />

                            {ContactWithUs_Save_errors.phone_no && (
                              <span className="get-free-quote-form-error">
                                {ContactWithUs_Save_errors.phone_no}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="Message"
                          className="form-control"
                          name="message"
                        />

                        {ContactWithUs_Save_errors.message && (
                          <span className="get-free-quote-form-error">
                            {ContactWithUs_Save_errors.message}
                          </span>
                        )}
                      </div>
                      {contact.Button_Name &&

                        <button type="submit" className="btn btn-primary">
                          {contact.Button_Name}
                        </button>
                      }

                      <div className="get-free-quote-form-success" role="alert">
                        <p className="success-text">{Success}</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contact-map-section"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="contact-pam">
                    <iframe
                      src={contact?.Map_Url}
                      style={{ border: "0", width: "100%", height: "490px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default ContactForm;
