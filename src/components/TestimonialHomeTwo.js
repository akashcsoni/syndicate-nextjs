import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";
import contentConfig from "@/config/contentConfig";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialHomeTwo = ({ data, slug }) => {
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
    <section className="testimonial-section">
      <div className="shape-image">
        <Image
          src="/assets/images/start-shape.svg"
          alt="start shape"
          width={12}
          height={123}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
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

            <div className="testimonial-slider">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                effect={"fade"}
                pagination={{
                  el: ".testimonial-slider .swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".testimonial-slider .swiper-button-next",
                  prevEl: ".testimonial-slider .swiper-button-prev",
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {testimonial?.Grid_Section &&
                  testimonial?.Grid_Section?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="testimonial-info">
                          <span className="quotes-icon">
                            <Image
                              src={contentConfig.QUOTES_ICON.IMAGE}
                              alt={contentConfig.QUOTES_ICON.ALT}
                              width={contentConfig.QUOTES_ICON.WIDTH}
                              height={contentConfig.QUOTES_ICON.HEIGHT}
                            />
                          </span>
                          <p>{item?.Description}</p>

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
                              <Link href="/testimonial">{item?.Name}</Link>
                            </h6>
                            <span>{item?.Position}</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}

                <div className="swiper-button-prev">
                  <Image
                    src="/assets/images/arrow-left.svg"
                    alt="arrow left"
                    width={42}
                    height={28}
                  />
                </div>
                <div className="swiper-button-next">
                  <Image
                    src="/assets/images/arrow-right.svg"
                    alt="arrow right"
                    width={42}
                    height={28}
                  />
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHomeTwo;
