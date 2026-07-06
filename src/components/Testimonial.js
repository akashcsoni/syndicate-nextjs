import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchStrapiPage } from "@/utils/Api";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import TestimonialGrid from "./TestimonialGrid";

const Testimonial = ({ data, slug }) => {
  const [isOpen, setOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(null);

  const OpenPopUp = () => {
    setOpen(!isOpen);
  };

  const code = testimonial?.Video_Embeded_Code.split("=");

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setTestimonial(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTestimonial();
  }, [slug, data?.id, data?.name]);

  //   useEffect(() => {
  //     const animationScroll = document.getElementById("animation-scroll");

  //     // Add a class to the element with id "animation-scroll"
  //     if (isOpen) {
  //       animationScroll.classList.add("video-model");
  //     } else {
  //       animationScroll.classList.remove("video-model");
  //     }
  //   }, [isOpen]);

  return (
    <section className="testimonial-section-style-3 content__item">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading bottom-55">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {testimonial?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {testimonial?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="testimonial-video-image item-overflow">
              {testimonial?.Image?.url && (
                <Image
                  src={`${BACKEND_URL}${testimonial?.Image?.url}`}
                  alt=""
                  className="content-item-zoom"
                  width="611"
                  height="610"
                />
              )}
              <div className="d-none content-item-y">d none</div>

              <div className="about-video-icon">
                {testimonial?.Video_Embeded_Code && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      OpenPopUp();
                    }}
                    href={testimonial?.Video_Embeded_Code}
                    className="circle-icon popup-youtube"
                  >
                    <span>
                      <i className="fa-solid fa-play"></i>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="testimonial-slider-home-3">
             

              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                direction={"vertical"}
                pagination={{
                  el: ".testimonial-slider-home-3 .swiper-pagination",
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper " 
              >
                <div className="w-75">
                {testimonial?.Grid_Section &&
                  testimonial?.Grid_Section.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <TestimonialGrid data={item} />
                      </SwiperSlide>
                    );
                  })}
                  </div>
              </Swiper>
              <div className="swiper-pagination"></div>
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
              src={`https://www.youtube.com/embed/${code?.[1]}?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=0O2aH4XLbto`}
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

export default Testimonial;
