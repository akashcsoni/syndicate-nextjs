import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AboutCompanyThree = ({ data, slug }) => {
  const [about, setAbout] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const OpenPopUp = () => {
    setOpen(!isOpen);
  };

 
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

  return (
    <section className="about-company-section-style-2 content__item">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
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

        <div className="row align-items-center">
          <div className="col-12 col-lg-6 pe-xl-5">
            <div className="about-image-gallery-style-2">
              <div className="about-image image-1 item-overflow">
                {about?.Image?.[0]?.url && (
                  <Image
                    src={`${BACKEND_URL}${about?.Image?.[0]?.url}`}
                    alt=""
                    className="content-item-zoom"
                    width={444}
                    height={377}
                  />
                )}
              </div>

              <div className="about-image image-2 content-item-y">
                {about?.Image?.[1]?.url && (
                  <Image
                    src={`${BACKEND_URL}${about?.Image?.[1]?.url}`}
                    alt=""
                    width={326}
                    height={359}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 ps-xl-5">
            <div className="about-info-style-2">
              <div className="about-video-style-2">
                <div className="about-video-dec">
                  <p>{about?.Video_Title}</p>
                </div>
                <div className="about-video-box">
                  {about?.Video_Image?.url && (
                    <Image
                      src={`${BACKEND_URL}${about?.Video_Image?.url}`}
                      alt=""
                      width={288}
                      height={239}
                    />
                  )}

                  <div className="about-video-icon">
                    <Link
                      href="#"
                      className="circle-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        OpenPopUp();
                      }}
                    >
                      <span>
                        <i className="fa-solid fa-play"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <p>{about?.Description}</p>

              <div className="about-feature-list">
                <div className="our-feature">
                  <div className="about-feature-icon circle-icon">
                    <span>
                      {about?.Feature_Image?.url && (
                        <Image
                          src={`${BACKEND_URL}${about?.Feature_Image?.url}`}
                          alt=""
                          width={18}
                          height={18}
                        />
                      )}
                    </span>
                  </div>
                  <div className="about-feature-content">
                    <p>{about?.Feature_Title}</p>
                  </div>
                </div>
                <div className="our-feature">
                  <Link
                    href={`tel:${about?.Feature_Title}`}
                    className="call-booking"
                  >
                    {about?.Feature_Title}
                  </Link>
                </div>
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
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${"0O2aH4XLbto"}?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=${"0O2aH4XLbto"}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
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
      ) : (
        ""
      )}
    </section>
  );
};

export default AboutCompanyThree;
