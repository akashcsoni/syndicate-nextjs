import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BrandingSwiper = ({ data, slug }) => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const getSwiper = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setSwiper(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSwiper();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="logos-section-style-2">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="logos-slider">
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                loop={true}
                centeredSlides={true}
                mousewheel={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".logos-slider .swiper-button-next",
                  prevEl: ".logos-slider .swiper-button-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  991: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1199: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                {swiper?.Image &&
                  swiper?.Image.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="logos-box">
                          <Link href="#">
                            <Image
                              src={`${BACKEND_URL}${item?.url}`}
                              alt=""
                              width={120}
                              height={60}
                            />
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingSwiper;
