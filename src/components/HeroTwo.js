import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";
import { fetchStrapiPage } from "@/utils/Api";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import contentConfig from "@/config/contentConfig";

const HeroTwo = ({ slug, data }) => {
  let [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const getHeroData = async () => {
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

    getHeroData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="hero-section bg-secondary-light height100">
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={1}
        effect={"fade"}
        navigation={{
          nextEl: ".hero-section .swiper-button-next",
          prevEl: ".hero-section .swiper-button-prev",
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="hero-content-slider mySwiper2"
      >
        {hero?.Grid_Section &&
          hero?.Grid_Section.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="hero-content">
                        <h5 className="sub-title">{item?.Sub_Title}</h5>
                        <h1
                          className="title"
                          dangerouslySetInnerHTML={{ __html: item?.Title }}
                        />
                        <p>{item?.Description}</p>
                        <Link href="/about-us" className="hero-btn">
                          <Image
                            src={contentConfig.ARROW_BTN.IMAGE}
                            alt={contentConfig.ARROW_BTN.ALT}
                            width={29}
                            height={29}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-images">
                  <div className="hero-images-slider">
                    <Image
                      src={`${BACKEND_URL}${item?.Image?.url}`}
                      alt=""
                      width={592}
                      height={840}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      <div className="hero-thumbs">
        <div className="swiper-button-prev">
          <svg
            width="35"
            height="54"
            viewBox="0 0 35 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5032 4.27817L33.4788 19.2538L34.8552 17.8773L17.5287 0.550781L0.202131 17.8773L1.57857 19.2538L16.5569 4.28092L16.5542 53.5325L18.5004 53.5352L18.5032 4.27817Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <Swiper
          spaceBetween={0}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          mousewheel={true}
          keyboard={true}
          watchSlidesProgress={true}
          navigation={{
            nextEl: ".hero-section .swiper-button-next",
            prevEl: ".hero-section .swiper-button-prev",
          }}
          breakpoints={{
            768: {
              direction: "vertical",
              spaceBetween: 20,
            },
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="hero-thumbs-slider mySwiper"
        >
          {hero?.Grid_Section &&
            hero?.Grid_Section.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="hero-thumbs-img">
                    <Image
                      src={`${BACKEND_URL}${item?.Image?.url}`}
                      alt=""
                      width={74}
                      height={74}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div className="swiper-button-next">
          <svg
            width="35"
            height="54"
            viewBox="0 0 35 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5032 49.7795L33.4788 34.8038L34.8552 36.1803L17.5287 53.5068L0.202131 36.1803L1.57857 34.8038L16.5569 49.7767L16.5542 0.525127L18.5004 0.522373L18.5032 49.7795Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="hero-line-shape">
        <Image
          src={contentConfig.HERO_SHAPE.IMAGE}
          alt={contentConfig.HERO_SHAPE.ALT}
          width={563}
          height={333}
        />
      </div>
    </section>
  );
};

export default HeroTwo;
