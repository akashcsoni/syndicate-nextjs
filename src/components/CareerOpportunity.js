import contentConfig from "@/config/contentConfig";
import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import { useEffect, useState } from "react";

const CareerOpportunity = ({ data, slug }) => {
  const [opportunity, setOpportunity] = useState({});

  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setOpportunity(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="career-opportunity-section inner-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="section-heading inner-heading">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {opportunity?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {opportunity?.Sub_Title}
              </h2>
              <p>{opportunity?.Description}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="career-opportunity-box">
              <Image
                src={contentConfig
                    .QUOTE_IMAGE.IMAGE}
                alt=""
                width={66}
                height={66}
              />
              <p>{opportunity.BlockQuote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerOpportunity;
