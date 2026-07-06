import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import contentConfig from "@/config/contentConfig";
import { useEffect, useState } from "react";
import { fetchStrapiPage } from "@/utils/Api";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";

const HeroThree = ({ data, slug }) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const getHero = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setHero(resdata?.data);
      } catch (err) {
        setHero(null);
      }
    };

    getHero();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="hero-section-style-2 height100 content__item">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={{
          nextEl: ".hero-slider-style-2 .swiper-button-next",
          prevEl: ".hero-slider-style-2 .swiper-button-prev",
        }}
        modules={[Navigation]}
        className="hero-slider-style-2 mySwiper2"
      >
        {hero?.Grid_Section &&
          hero?.Grid_Section.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="hero-img-style-2">
                  <Image
                    src={`${BACKEND_URL}${item?.Image?.url}`}
                    alt=""
                    className="content-item-zoom"
                    width={1835}
                    height={779}
                  />
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="hero-content content-item-y">
                        <h1
                          className="title"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                          dangerouslySetInnerHTML={{ __html: item.Title }}
                        />
                        <p>{item.Sub_Title}</p>
                        <Link
                          href={item.Button_Link}
                          className="btn btn-secondary btn-style-2"
                        >
                          {contentConfig.LEARN_MORE}{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

        <div className="swiper-button-prev">
          <Image
            src={contentConfig.LEFT_ARROW_BTN.IMAGE}
            alt={contentConfig.LEFT_ARROW_BTN.ALT}
            width={contentConfig.LEFT_ARROW_BTN.WIDTH}
            height={contentConfig.LEFT_ARROW_BTN.HEIGHT}
          />
        </div>
        <div className="swiper-button-next">
          <Image
            src={contentConfig.RIGHT_ARROW_BTN.IMAGE}
            alt={contentConfig.RIGHT_ARROW_BTN.ALT}
            width={contentConfig.RIGHT_ARROW_BTN.WIDTH}
            height={contentConfig.RIGHT_ARROW_BTN.HEIGHT}
          />
        </div>
      </Swiper>
    </section>
  );
};

export default HeroThree;
