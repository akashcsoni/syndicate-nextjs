import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AboutCompanyTwo = ({ data, slug }) => {
  const [isOpen, setOpen] = useState(false);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const getAbout = async () => {
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
    getAbout();
  }, [slug, data?.id, data?.name]);

  const OpenPopUp = () => {
    setOpen(!isOpen);
  };

  

  useEffect(() => {
    const animationScroll = document.getElementById("animation-scroll");
    if (!animationScroll) return;

    if (isOpen) {
      animationScroll.classList.add("video-model");
    } else {
      animationScroll.classList.remove("video-model");
    }
  }, [isOpen]);

  return (
    <section className="about-company-section">
      <div className="about-shape-line">
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
        <span className="line4"></span>
      </div>

      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="about-image-gallery">
              {about?.Image &&
                about?.Image?.map((item, index) => {
                  return (
                    <div
                      className={`about-image image-${index + 1}`}
                      key={index}
                    >
                      <Image
                        src={`${BACKEND_URL}${item?.url}`}
                        alt=""
                        width={402}
                        height={522}
                      />
                    </div>
                  );
                })}

              <div className="about-video-icon">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    OpenPopUp();
                  }}
                  href={`http://www.youtube.com/watch?v=${about?.Video_Embeded_Code}`}
                  className="circle-icon popup-youtube"
                >
                  <span>
                    <i className={about?.Icon_Name}></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="about-info">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {about?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {about?.Sub_Title}
                </h2>
              </div>

              <p>{about?.Description}</p>

              <div className="about-feature-list">
                {about?.Grid_Section &&
                  about?.Grid_Section?.map((feature_data, index) => {
                    return (
                      <div className="our-feature" key={index}>
                        <div className="about-feature-icon circle-icon">
                          <span>
                            <Image
                              src={`${BACKEND_URL}${feature_data?.Image?.url}`}
                              alt=""
                              width={47}
                              height={47}
                            />
                          </span>
                        </div>
                        <div className="about-feature-content">
                          <h5>{feature_data?.Title}</h5>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {about?.Button_Link && (
                <div className="read-more-btn">
                  <Link href={about?.Button_Link} className="btn btn-primary">
                    {about?.Button_Name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

  

      {isOpen && (
        <div className="active" id="animation-scroll">
          <span
            className="video-overlay"
            onClick={(e) => {
              e.preventDefault();
              OpenPopUp();
            }}
          ></span>
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${about?.Video_Embeded_Code}?autoplay=1&mute=1&loop=1&playlist=${about?.Video_Embeded_Code}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button
            className="close-video"
            onClick={(e) => {
              e.preventDefault();
              OpenPopUp();
            }}
          ></button>
        </div>
      )}
    </section>
  );
};

export default AboutCompanyTwo;
