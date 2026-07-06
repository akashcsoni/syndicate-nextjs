import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchStrapiPage } from "@/utils/Api";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";

const OurGoal = ({ data, slug }) => {
  const [ourGoal, setOurGoal] = useState(null);

  useEffect(() => {
    const getGoalData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setOurGoal(resdata?.data);
      } catch (err) {
        setOurGoal(null);
      }
    };

    getGoalData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="what-we-do-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {ourGoal?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {ourGoal?.Sub_Title}
              </h2>
            </div>

            <div className="what-we-do-slider">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                  nextEl: ".what-we-do-slider .swiper-button-next",
                  prevEl: ".what-we-do-slider .swiper-button-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1199: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {ourGoal?.Grid_Section &&
                  ourGoal?.Grid_Section?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="what-we-do-service">
                          <div className="circle-icon">
                            <span>
                              <Image
                                src={`${BACKEND_URL}${item?.Image?.url}`}
                                alt=""
                                width={38}
                                height={38}
                              />
                            </span>
                          </div>
                          <div className="what-we-do-info">
                            <h6>{item?.Title}</h6>
                            <p>{item?.Description}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGoal;
