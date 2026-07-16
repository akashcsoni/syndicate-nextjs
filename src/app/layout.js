"use client";

import "@/styles/globals.css";
import { Footer, Header } from "@/components";
import "@fortawesome/fontawesome-free/css/all.css";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";

import PreLoader from "@/components/PreLoader";
import Cookie from "@/components/Cookie";
import Subscribe_Newsletter from "@/components/Subscribe_Newsletter";

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init();

    return () => {
      Aos.refresh();
    };
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* <PreLoader /> */}
        <Header />
        <div className="animation-scroll">
          <div data-scroll="">
            {/* <!-- start main wrapper --> */}
            <div className="main-wrapper ">{children}</div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
