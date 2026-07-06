import contentConfig from "@/config/contentConfig";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

const CurrenPosition = ({ data, slug }) => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenData, setOpenData] = useState(false);
  const [current, setCurrent] = useState({});
  const [Active, setActive] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const OpenPopUp = useCallback((data) => {
    setOpen((prev) => !prev);
    setOpenData(data);
  }, []);

  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setCurrent(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentData();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const animationScroll = document.getElementById("animation-scroll");

    // Add a className to the element with id "animation-scroll"
    if (isOpen) {
      animationScroll?.classList.add("video-model");
    } else {
      animationScroll?.classList.remove("video-model");
    }
  }, [isOpen]);

  const [EnquiryForm_Save_errors, setEnquiryForm_Save_errors] = useState({});
  const [Success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${themeConfig.apiToken}`,
      },
    });
    // Return the first uploaded file data (includes id)
    return res.data[0];
  };

  const Enquiry_Form = async (e) => {
    e.preventDefault();

    const formElement = document.querySelector(`#enquiry-form`);
    const formData = new FormData(formElement);

    let email = formData.get("email");
    let phone_no = formData.get("phone_no");
    let full_name = formData.get("full_name");
    let message = formData.get("message");
    let files = formData.get("files");
    let position = formData.get("position");

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

      if (phone_no.length !== minLength) {
        error.phone_no = `Phone Number must be exactly ${minLength} digits`;
      }
    }

    if (!full_name || full_name.trim() === "") {
      error.full_name = "Full name is required *";
    }

    if (!files || files.size === 0) {
      error.files = "Files are required *";
    }

    if (!message || message.trim() === "") {
      error.message = "Message is required *";
    } else {
      const minLength = 20;

      if (message.length < minLength) {
        error.message = `Message must be at least ${minLength} characters long`;
      }
    }

    if (Object.keys(error).length > 0) {
      setEnquiryForm_Save_errors(error);
    } else {
      setEnquiryForm_Save_errors({});

      const uploadedFile = await uploadFile(selectedFile);

      const payload = {
        data: {
          Email: email,
          Name: full_name,
          Number: phone_no,
          Message: message,
          Resume: uploadedFile.id,
          Position: isOpenData.Title,
        },
      };

      try {
        const res = await fetchStrapiPage(
          themeConfig.api.enquirey_url,
          payload
        );
        setSuccess("Your Mail Sent Successfully!");
        formElement.reset();
      } catch (err) {
        console.error("Submission failed:", err);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Success) {
        setSuccess("");
        if (isOpen) {
          OpenPopUp(false);
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [Success, isOpen, OpenPopUp]);

  return (
    <>
      {/* // Type 1 */}

      {current?.Type === "Type1" ? (
        <section className="current-opportunity-section inner-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading inner-heading">
                  <h2 className="title">{current?.Title}</h2>
                </div>
                <div className="row">
                  {current?.Grid_Section &&
                    current?.Grid_Section?.map((item, index) => (
                      <div
                        className="col-12 col-md-6 col-lg-4"
                        data-aos="fade-up"
                        data-aos-duration="500"
                        key={index}
                      >
                        <div className="current-openings-grid">
                          <div className="current-openings-box">
                            <h3>{item?.Title}</h3>
                            <div className="current-openings-body">
                              <p>{item?.Description}</p>
                              <p>
                                {item.Grid_Section &&
                                  item.Grid_Section.map(
                                    (item_detail, index) => (
                                      <React.Fragment key={index}>
                                        <strong>{item_detail.Title} : </strong>
                                        {item_detail.Value}
                                        <br />
                                      </React.Fragment>
                                    )
                                  )}
                              </p>

                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  OpenPopUp(item);
                                }}
                                className="btn btn-primary btn-style-2 enquiry-apply"
                              >
                                {contentConfig.APPLY_NOW}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {isOpen ? (
            <div className={isOpen ? "active" : ""} id="video-wrap">
              <span
                className="video-overlay"
                onClick={(e) => {
                  e.preventDefault();
                  OpenPopUp();
                }}
              ></span>
              <div className=" all-pupop enquiry-form-popup popup-body">
                <div className="section-heading">
                  <h5 className="sub-title">ENQUIRY FORMS</h5>
                  <h2 className="popup-title">Contact information</h2>
                </div>

                <div className="enquiry-form">
                  <form id="enquiry-form" onSubmit={Enquiry_Form}>
                    <div className="form-row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your name"
                            name="full_name"
                          />

                          {EnquiryForm_Save_errors.full_name && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.full_name}
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

                          {EnquiryForm_Save_errors.email && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.email}
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
                            placeholder="Position"
                            name="position"
                            defaultValue={isOpenData && isOpenData.Title}
                            disabled
                          />
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

                          {EnquiryForm_Save_errors.phone_no && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.phone_no}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Describe about yourself"
                        className="form-control"
                        name="message"
                      ></textarea>

                      {EnquiryForm_Save_errors.message && (
                        <span className="get-free-quote-form-error">
                          {EnquiryForm_Save_errors.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="validatedCustomFile"
                          name="files"
                          onChange={handleFileChange}
                        />

                        <div className="choose-file">Choose file</div>
                        <label
                          className="custom-file-label"
                          htmlFor="validatedCustomFile"
                        >
                          Add your portfolio
                        </label>
                      </div>
                      {EnquiryForm_Save_errors.files && (
                        <span className="get-free-quote-form-error">
                          {EnquiryForm_Save_errors.files}
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
                <button
                  className="close-enquiry-form all-pupop enquiry-form-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    OpenPopUp();
                  }}
                ></button>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
      ) : current?.Type === "Type2" ? (
        <section className="current-opportunity-section inner-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading inner-heading">
                  <h2
                    className="title"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {current?.Title}
                  </h2>
                </div>
                <div className="career-opportunity-list">
                  <div className="accordion">
                    {current?.Grid_Section &&
                      current?.Grid_Section?.map((item, index) => {
                        return (
                          <div className="accordion-list" key={index}>
                            <div
                              className={`accordion-tabs ${
                                Active === index ? "active" : ""
                              }`}
                              onClick={() => {
                                setActive(index);
                              }}
                            >
                              <h3>{item.Title}</h3>
                            </div>
                            <div
                              className={`accordion-content ${
                                Active === index ? "active" : ""
                              }`}
                            >
                              <p>{item.Description}</p>
                              <h6>
                                {item.Grid_Section &&
                                  item.Grid_Section.map(
                                    (detail_item, index) => {
                                      return (
                                        <React.Fragment key={index}>
                                          <strong>{detail_item.Title}:</strong>{" "}
                                          {detail_item.Value}
                                          <br />
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                              </h6>

                              <Link
                                href="#enquiry-form-popup"
                                onClick={(e) => {
                                  e.preventDefault();
                                  OpenPopUp(item);
                                }}
                                className="btn btn-secondary btn-style-3 enquiry-apply"
                              >
                                {contentConfig.APPLY_NOW}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isOpen ? (
            <div className={isOpen ? "active" : ""} id="video-wrap">
              <span
                className="video-overlay"
                onClick={(e) => {
                  e.preventDefault();
                  OpenPopUp();
                }}
              ></span>
              <div className=" all-pupop enquiry-form-popup popup-body">
                <div className="section-heading">
                  <h5 className="sub-title">ENQUIRY FORMS</h5>
                  <h2 className="popup-title">Contact information</h2>
                </div>

                <div className="enquiry-form">
                  <form id="enquiry-form" onSubmit={Enquiry_Form}>
                    <div className="form-row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your name"
                            name="full_name"
                          />

                          {EnquiryForm_Save_errors.full_name && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.full_name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            name="email"
                          />

                          {EnquiryForm_Save_errors.email && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.email}
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
                            placeholder="Position"
                            name="position"
                            defaultValue={isOpenData && isOpenData.Title}
                            disabled
                          />
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

                          {EnquiryForm_Save_errors.phone_no && (
                            <span className="get-free-quote-form-error">
                              {EnquiryForm_Save_errors.phone_no}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Describe about yourself"
                        className="form-control"
                        name="message"
                      ></textarea>

                      {EnquiryForm_Save_errors.message && (
                        <span className="get-free-quote-form-error">
                          {EnquiryForm_Save_errors.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="validatedCustomFile"
                          name="files"
                          onChange={handleFileChange}
                        />

                        <div className="choose-file">Choose file</div>
                        <label
                          className="custom-file-label"
                          htmlFor="validatedCustomFile"
                        >
                          Add your portfolio
                        </label>
                      </div>
                      {EnquiryForm_Save_errors.files && (
                        <span className="get-free-quote-form-error">
                          {EnquiryForm_Save_errors.files}
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
                <button
                  className="close-enquiry-form all-pupop enquiry-form-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    OpenPopUp();
                  }}
                ></button>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
      ) : null}
    </>
  );
};

export default CurrenPosition;
