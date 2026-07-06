
"use client";

import themeConfig from '@/config/themeConfig';
import { getData } from '@/utils/Api';
import React, { useEffect, useState } from 'react';

const Cookie = () => {
  const [cookieData, setCookieData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const localConsent = localStorage.getItem('cookieConsent');
      const cookieConsent = getCookie('OptanonConsent');
      if (!localConsent && !cookieConsent) {
        setShowPopup(true);
      }
    };

    const fetchData = async () => {
      try {
        const data = await getData(themeConfig.api.cookie_url);
        setCookieData(data.data);
        checkConsent();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 86400000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const handleConsent = (type) => {
    localStorage.setItem('cookieConsent', type);
    setCookie('OptanonAlertBoxClosed', new Date().toISOString(), 365);

    let groups = 'C0004:0,C0002:0,C0001:0,C0003:0'; // all off
    if (type === 'all') groups = 'C0004:1,C0002:1,C0001:1,C0003:1';
    if (type === 'accept') groups = 'C0001:1'; // only essential

    const consent = `landingPath=NotLandingPage&datestamp=${encodeURIComponent(new Date().toString())}&version=202403.1.0&groups=${groups}&hosts=`;
    setCookie('OptanonConsent', consent, 365);

    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <>

      {/* <!-- Manage Cookie --> */}
      <div className="cookie-popup open">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <!-- start Popup heading --> */}
              <div className="section-heading">
                <h2 className="popup-title">{cookieData?.Popup_Title}</h2>
              </div>
              {/* <!-- end Popup heading --> */}
              <p>{cookieData?.Description}</p>

              {/* <!-- cookie button --> */}
              <div className="cookie-button row">
                <div className="button-column">
                  <button
                    className="btn btn-secondary btn-style-3 accept-btn"
                    onClick={() => handleConsent('accept')}
                  >
                    {cookieData?.Button_Name || "Accept Cookies"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Manage Cookie --> */}
    </>
  );
};

export default Cookie;
