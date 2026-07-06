import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BusinessServices = ({ data, slug }) => {
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const getBusinessData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setBusiness(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBusinessData();
  }, [slug, data?.id, data?.name]);
  return (
    <>
      <section className="why-choose-us-section-style-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h5
                  className="sub-title aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {business?.Title}
                </h5>
                <h2
                  className="title aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {business?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            {business?.Grid_Section?.map((data, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div className="why-choose-us-grid">
                  <div className="why-choose-us-icon">
                    {data?.Image?.url && (
                      <Image
                        src={`${BACKEND_URL}${data?.Image?.url}`}
                        alt={data?.Title || "business planning icon"}
                        width={data?.Image?.width || 60}
                        height={data?.Image?.height || 60}
                      />
                    )}
                  </div>
                  <h4>
                    <Link href="/service">{data?.Title}</Link>
                  </h4>
                  <p>{data?.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessServices;
