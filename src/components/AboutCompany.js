import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AboutCompany = ({ data, slug }) => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const getBlogList = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setAbout(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogList();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="about-company-section-style-3 content__item">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading bottom-55">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {about?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {about?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 order-2 order-md-1">
            <div className="about-info-style-3">
              {about?.Description &&
                about?.Description.map((label_data, index) => {
                  return <p key={index}>{label_data?.Description}</p>;
                })}

              <div className="about-feature-list">
                {about?.Grid_Section &&
                  about?.Grid_Section.map((feature_data, index) => {
                    return (
                      <div className="our-feature" key={index}>
                        <div className="about-feature-icon">
                          <span>
                            <Image
                              src={`${BACKEND_URL}${feature_data?.Image?.url}`}
                              alt=""
                              width="68"
                              height="68"
                            />
                          </span>
                        </div>
                        <div className="about-feature-content">
                          <p>{feature_data?.Title}</p>
                        </div>
                      </div>
                    );
                  })}
                <div className="bottom-contact-btn">
                  {about?.Button_Link && (
                    <Link
                      href={about?.Button_Link}
                      className="btn btn-secondary btn-style-3"
                    >
                      {about?.Button_Name}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 order-1 order-md-2">
            <div className="about-image-gallery-style-3">
              <div className="about-image-style-3 item-overflow">
                {about?.Image?.[0]?.url && (
                  <Image
                    src={`${BACKEND_URL}${about?.Image?.[0]?.url}`}
                    alt=""
                    className="content-item-zoom"
                    width="536"
                    height="590"
                  />
                )}
              </div>

              <div className="about-image-small content-item-y">
                {about?.Image?.[1]?.url && (
                  <Image
                    src={`${BACKEND_URL}${about?.Image?.[1]?.url}`}
                    alt=""
                    width="345"
                    height="249"
                  />
                )}
              </div>

              <div className="about-image-info">
                <p>{about?.Quote_Title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
