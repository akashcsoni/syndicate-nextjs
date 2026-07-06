import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import contentConfig from "@/config/contentConfig";

const TestimonialHomeThree = ({ data, slug }) => {
  const [testimonial, setTestimonial] = useState(null);

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

  return (
    <section className="testimonial-section-style-2 content__item">
      <div className="testimonial-bg-image">
        {testimonial?.Background_Image?.url && (
          <Image
            src={`${BACKEND_URL}${testimonial?.Background_Image?.url}`}
            alt=""
            className="content-item-zoom"
            width={1835}
            height={694}
          />
        )}
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5">
            <div className="section-heading content-item-y">
              <span className="quotes-icon">
                <Image
                  src={contentConfig?.QUOTES_ICON?.IMAGE}
                  alt="quotes-icon"
                  width={66}
                  height={66}
                />
              </span>
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
          <div className="col-12 col-lg-7">
            <div className="testimonial-slider-home-2">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                  el: ".testimonial-slider-home-2 .swiper-pagination",
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {testimonial?.Grid_Section &&
                  testimonial?.Grid_Section.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="testimonial-info">
                          <p>{item.Description}</p>

                          <div className="testimonial-user">
                            <div className="avatar-img">
                              <Link href="/testimonial">
                                <Image
                                  src={`${BACKEND_URL}${item?.Image?.url}`}
                                  alt=""
                                  width={115}
                                  height={115}
                                />
                              </Link>
                            </div>
                            <h6>
                              <Link href="/testimonial">{item.Name}</Link>
                            </h6>
                            <span>{item.Position}</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHomeThree;
