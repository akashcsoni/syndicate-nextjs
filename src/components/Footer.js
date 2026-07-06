"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { $api, getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await $api.post(themeConfig.api.newsletter_url, {
        email: email,
      });

      const result = response.data;

      setSuccess(result?.message || "Subscribed successfully");

      if (!result?.alreadySubscribed) {
        setEmail("");
      }

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setSuccess(
        err?.response?.data?.message || "Server error. Please try again later."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  const pathname = usePathname();

  let footer_Type = "Footer_Type_One";

  if (pathname === "/") {
    footer_Type = "Footer_Type_Three";
  } else if (pathname === "/home-two") {
    footer_Type = "Footer_Type_Two";
  } else if (pathname === "/home-three") {
    footer_Type = "Footer_Type_One";
  }

  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const data = await getData(themeConfig.api.footer_url);
        setFooter(data);
      } catch (error) {
        console.error("Failed to fetch footer:", error);
        setFooter(null);
      }
    };

    getFooterData();
  }, []);

  if (!footer) return null;

  // const type = footer_Type;
  const type = "Footer_Type_One";

  if (type === "Footer_Type_One") {
    return (
      <>
        <footer className="footer-three">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 col-lg-7">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="footer-widget-about">
                        <div className="footer-logo">
                          {footer?.Logo_Image?.url && (
                            <Link href="/">
                              <Image
                                src={`${BACKEND_URL}${footer?.Logo_Image?.url}`}
                                alt="logo light"
                                width={234}
                                height={66}
                              />
                            </Link>
                          )}
                        </div>
                        <p>{footer?.Description}</p>
                        {footer?.Copyright_Title && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: footer.Copyright_Title,
                            }}
                          />
                        )}

                        <ul className="header-social d-flex d-md-none align-items-center justify-content-center justify-content-lg-start gap-4">
                          {footer?.Social_Icon?.map((icon) => {
                            return (
                              <li key={icon.id}>
                                <Link href="#">
                                  <i
                                    className={`fa-brands ${icon.Icon_Name}`}
                                  ></i>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 d-none d-md-block">
                      <div className="footer-widget-address">
                        <h6>{footer?.Office_Info_Title}</h6>
                        <div className="footer-address">
                          {footer?.Grid_Section &&
                            footer?.Grid_Section?.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {data?.Link ? (
                                    <p>
                                      <span className="icon">
                                        <Image
                                          src={`${BACKEND_URL}${data?.Image?.url}`}
                                          alt="phone icon"
                                          width={18}
                                          height={18}
                                        />
                                      </span>
                                      <Link href={data?.Link}>
                                        {data?.Title}
                                      </Link>
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="icon">
                                        <Image
                                          src={`${BACKEND_URL}${data?.Image?.url}`}
                                          alt="address icon"
                                          width={18}
                                          height={20}
                                        />
                                      </span>
                                      {data?.Title}
                                    </p>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-5">
                  <div className="footer-newsletter">
                    <h6>{footer?.Newsletter_Title}</h6>
                    <div className="newsletter-form">
                      <p>{footer?.Newsletter_Description}</p>
                      {/* Subscription Part */}
                      <form
                        className="get-free-quote-form"
                        onSubmit={handleSubmit}
                      >
                        <input
                          type="email"
                          className="form-control"
                          name="Email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                          <Image
                            src="/assets/images/submit-icon.svg"
                            alt="icon btn"
                            width={28}
                            height={24}
                          />
                        </button>
                      </form>
                      {error && (
                        <span className="get-free-quote-form-error">
                          {error}
                        </span>
                      )}

                      {success && (
                        <div
                          className="get-free-quote-form-success"
                          role="alert"
                        >
                          <p className="success-text">{success}</p>
                        </div>
                      )}
                      {/* Subscription Part */}
                    </div>

                    <ul className="header-social d-none d-md-flex align-items-center justify-content-center justify-content-lg-start gap-4">
                      {footer?.Social_Icon?.map((icon) => {
                        return (
                          <li key={icon.id}>
                            <Link href="#">
                              <i className={`fa-brands ${icon.Icon_Name}`}></i>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="row d-md-none menu-row">
                    <div className="col-6 col-md-6">
                      <div className="footer-widget-address">
                        <h6>{footer?.Office_Info_Title}</h6>
                        <div className="footer-address">
                          {footer?.Grid_Section &&
                            footer?.Grid_Section?.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {data?.Link ? (
                                    <p>
                                      <span className="icon">
                                        <Image
                                          src={`${BACKEND_URL}${data?.Image?.url}`}
                                          alt="phone icon"
                                          width={18}
                                          height={18}
                                        />
                                      </span>
                                      <Link href={data?.Link}>
                                        {data?.Title}
                                      </Link>
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="icon">
                                        <Image
                                          src={`${BACKEND_URL}${data?.Image?.url}`}
                                          alt="address icon"
                                          width={18}
                                          height={20}
                                        />
                                      </span>
                                      {data?.Title}
                                    </p>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 d-md-none">
                      <div className="footer-link">
                        <h6>{footer?.Footer_Menu_Title}</h6>
                        <ul>
                          {footer?.Footer_Grid &&
                            footer?.Footer_Grid.map((data, index) => {
                              return (
                                <li key={index}>
                                  <Link href={data?.Link}>{data?.Title}</Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom-part">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-7 col-lg-8 d-none d-md-block">
                  <ul className="footer-menu">
                    {footer?.Footer_Grid &&
                      footer?.Footer_Grid.map((data, index) => {
                        return (
                          <li key={index}>
                            <Link href={data?.Link}>{data?.Title}</Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="col-12 col-md-5 col-lg-4 designed-by-text">
                  {footer?.Copyright_Title ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: footer.Copyright_Title,
                      }}
                    />
                  ) : (
                    <p></p>
                  )}
                  {/* <p>
                    <Link href="#">Privacy policy</Link> |{" "}
                    <Link href="#">Terms of use.</Link>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }

  if (type === "Footer_Type_Two") {
    return (
      <>
        <footer className="footer-style-2">
          <div className="footer-main">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-3">
                  <div className="footer-logo">
                    {footer?.Logo_Image?.url && (
                      <Link href="/">
                        <Image
                          src={`${BACKEND_URL}${footer?.Logo_Image?.url}`}
                          alt="logo light"
                          width={234}
                          height={66}
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <div className="footer-right-menu">
                    <ul>
                      {footer?.Footer_Grid &&
                        footer?.Footer_Grid.map((data, index) => {
                          return (
                            <li key={index}>
                              <Link href={data?.Link}>{data?.Title}</Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="footer-bottom-wrap">
                    <div className="footer-bottom-content">
                      <div className="footer-about-text">
                        <p>{footer?.Description}</p>
                      </div>

                      <div className="footer-address-style-2">
                        <div className="row">
                          {footer?.Grid_Section &&
                            footer?.Grid_Section?.map((data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <div className="col-12 col-md-4">
                                    {data?.Link ? (
                                      <p>
                                        <span className="icon">
                                          <Image
                                            src={`${BACKEND_URL}${data?.Image_Green?.url}`}
                                            alt="phone icon"
                                            width={18}
                                            height={18}
                                          />
                                        </span>
                                        <Link href={data?.Link}>
                                          {data?.Title}
                                        </Link>
                                      </p>
                                    ) : (
                                      <p>
                                        <span className="icon">
                                          <Image
                                            src={`${BACKEND_URL}${data?.Image_Green?.url}`}
                                            alt="address icon"
                                            width={18}
                                            height={20}
                                          />
                                        </span>
                                        {data?.Title}
                                      </p>
                                    )}
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>
                      </div>
                      {/* <!-- footer copyright style 2 --> */}
                      <div className="footer-copyright-style-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(footer.Copyright_Title),
                          }}
                        />

                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(footer.Designed_By_Text),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end footer main --> */}
        </footer>
      </>
    );
  }

  if (type === "Footer_Type_Three") {
    return (
      <>
        <footer className="footer-one">
          <div className="get-free-quote">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-5">
                  <h2>{footer?.Quote}</h2>
                </div>
                <div className="col-12 col-md-7">
                  <form className="get-free-quote-form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : footer?.Button_Name}
                    </button>
                  </form>

                  {error && (
                    <span className="get-free-quote-form-error">{error}</span>
                  )}

                  {success && (
                    <div className="get-free-quote-form-success" role="alert">
                      <p className="success-text">{success}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-main">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-3">
                  <div className="footer-widget-about">
                    <div className="footer-logo">
                      {footer?.Logo_Image?.url && (
                        <Link href="/">
                          <Image
                            src={`${BACKEND_URL}${footer?.Logo_Image?.url}`}
                            alt="logo light"
                            width={234}
                            height={66}
                          />
                        </Link>
                      )}
                    </div>
                    <p>{footer?.Description}</p>

                    <ul className="header-social d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                      {footer?.Social_Icon?.map((icon) => {
                        return (
                          <li key={icon.id}>
                            <Link href="#">
                              <i className={`fa-brands ${icon.Icon_Name}`}></i>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="col-6 col-md-3 col-lg-3">
                  <div className="footer-link menu1">
                    <h6>{footer?.Footer_Menu_Title}</h6>
                    <ul>
                      {footer?.Footer_Grid &&
                        footer?.Footer_Grid.map((data, index) => {
                          return (
                            <li key={index}>
                              <Link href={data?.Link}>{data?.Title}</Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-lg-3">
                  <div className="footer-link menu2">
                    <h6>{footer?.Services_Title}</h6>
                    <ul>
                      {footer?.Footer_Grid_Services &&
                        footer?.Footer_Grid_Services.map((data, index) => {
                          return (
                            <li key={index}>
                              <Link href={data?.Link}>{data?.Title}</Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="footer-widget-address">
                    <h6>{footer?.Office_Info_Title}</h6>
                    {footer?.Grid_Section &&
                      footer?.Grid_Section?.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="footer-address">
                              {data?.Link ? (
                                <p>
                                  <span className="icon">
                                    <Image
                                      src={`${BACKEND_URL}${data?.Image?.url}`}
                                      alt="phone icon"
                                      width={18}
                                      height={18}
                                    />
                                  </span>
                                  <Link href={data?.Link}>{data?.Title}</Link>
                                </p>
                              ) : (
                                <p>
                                  <span className="icon">
                                    <Image
                                      src={`${BACKEND_URL}${data?.Image?.url}`}
                                      alt="address icon"
                                      width={18}
                                      height={20}
                                    />
                                  </span>
                                  {data?.Title}
                                </p>
                              )}
                            </div>
                          </React.Fragment>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="footer-bottom-copyright">
                  <div className="row">
                    <div className="col-12 order-2 order-md-1 col-md-6">
                      {footer?.Copyright_Title && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: footer.Copyright_Title,
                          }}
                        />
                      )}
                    </div>
                    <div className="col-12 order-1 col-md-6 designed-by-text">
                      {footer?.Designed_By_Text && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: footer.Designed_By_Text,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
};

export default Footer;
