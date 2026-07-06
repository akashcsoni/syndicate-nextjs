
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { $api, getData } from "@/utils/Api";
import themeConfig from "@/config/themeConfig";

import $ from "jquery";

const NEWSLETTER_COOKIE = "NewsletterPopup";

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const daysSinceCookie = (cookieName) => {
  const value = getCookie(cookieName);
  if (!value) return Infinity;

  const dateStr = value.split("|")[0];
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return Infinity;

  const now = new Date();
  return Math.floor((now - date) / 86400000);
};

const Subscribe_Newsletter = () => {
  const [subscription, setSubscription] = useState(null);
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopupReady, setShowPopupReady] = useState(false);

  // Fetch newsletter popup content from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(themeConfig.api.subscribe_url);
        setSubscription(response.data);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      }
    };
    fetchData();
  }, []);

  const shouldShowPopup = useCallback(() => {
    const val = getCookie(NEWSLETTER_COOKIE);
    if (!val) return true;

    if (val.includes("subscribed")) {
      return daysSinceCookie(NEWSLETTER_COOKIE) >= 365;
    }

    return daysSinceCookie(NEWSLETTER_COOKIE) >= 7;
  }, []);

  const handleClose = useCallback(() => {
    const cookieVal = `${new Date().toISOString()}|closed`;
    setCookie(NEWSLETTER_COOKIE, cookieVal, 7);
    localStorage.setItem(NEWSLETTER_COOKIE, "closed");
  }, []);

  // Show popup using Magnific Popup
  useEffect(() => {
    if (typeof window === "undefined" || !subscription) return;

    const alreadyClosed = localStorage.getItem(NEWSLETTER_COOKIE);
    if (!alreadyClosed && shouldShowPopup()) {
      setShowPopupReady(true);
      // 👇 Dynamically import popup JS and CSS only in browser
      import("magnific-popup/dist/jquery.magnific-popup.min.js").then(() => {
        import("magnific-popup/dist/magnific-popup.css");

        setTimeout(() => {
          $(".newsletter-popup-link").magnificPopup({
            type: "inline",
            preloader: false,
            focus: "#email",
            callbacks: {
              close: function () {
                handleClose(); // ← Ensure this is triggered when popup is closed manually
              },
            },
          });

          $(".newsletter-popup-link").trigger("click");
        }, 2000);
      });
    }
  }, [subscription, handleClose, shouldShowPopup]);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateError = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!checkboxChecked) {
      setCheckboxError("Please accept the terms and conditions.");
    } else {
      setCheckboxError("");
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateError()) return;
    // console.log("Subscribe API:", themeConfig.api.subscribes_url);

    setLoading(true);
    try {
      const response = await $api.post(themeConfig.api.subscribes_url, {
        email: formData.email,
        publishedAt: new Date().toISOString(), // ← this publishes the entry

      });
      console.log("Submitting email:", formData.email);

      if (response.status === 200 || response.status === 201) {
        const cookieVal = `${new Date().toISOString()}|subscribed`;
        setCookie(NEWSLETTER_COOKIE, cookieVal, 365);
        localStorage.setItem(NEWSLETTER_COOKIE, "subscribed");

        setSuccess("Subscribed successfully!");
        setFormData({ email: "" });
        setErrors({});
        $.magnificPopup.close(); // Close popup manually after success

      } else {
        setSuccess("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setSuccess("");
    }
    setLoading(false);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };


  if (!subscription || !showPopupReady) return null;

  return (
    <>


      {/* Hidden trigger link for Magnific Popup */}
      <a href="#newsletter-popup" className="d-none newsletter-popup-link">
        {subscription?.Popup_Title}
      </a>

      {/* Hidden inline popup content */}
      <div id="newsletter-popup" className="mfp-hide newsletter-popup all-pupop" >
        <div className="popup-body">
          <div className="section-heading">
            <h2 className="popup-title">{subscription?.Short_Description}</h2>
          </div>
          <p>{subscription?.Description}</p>

          <div className="newsletter-form-popup">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="Email"
                required
                className="form-control"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="text-danger small">{errors.email}</p>}

              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <label htmlFor="terms" className="form-check-label">
                  I agree to the terms and conditions.
                </label>
                {checkboxError && <p className="text-danger small">{checkboxError}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-style-2 mt-3"
                disabled={loading}
              >
                {loading ? "Submitting..." : subscription?.Button_Name}
              </button>

              {success && <p className="text-success mt-2">{success}</p>}

            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Subscribe_Newsletter;

