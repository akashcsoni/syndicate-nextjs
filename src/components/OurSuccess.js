"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import { useEffect, useState } from "react";

const OurSuccess = ({ data, slug }) => {
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getSuccess = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setSuccess(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSuccess();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="how-we-work-section-style-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading bottom-55">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {success?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {success?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {success?.Grid_Section &&
            success?.Grid_Section.map((data, index) => {
              return (
                <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={index}>
                  <div className="how-we-work-grid">
                    <div className="how-we-work-front">
                      <div className="how-we-work-number">{index + 1}</div>
                      <div className="how-we-work-icon">
                        <Image
                          src={`${BACKEND_URL}${data?.Image?.url}`}
                          alt=""
                          width="70"
                          height="70"
                        />
                      </div>
                      <h6>{data.Title}</h6>
                      <p>{data.Description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default OurSuccess;
