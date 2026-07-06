import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServiceGrid from "./ServiceGrid";
import ServiceGridThree from "./ServiceGridThree";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ServiceGridSwiper from "./ServiceGridSwiper";
import contentConfig from "@/config/contentConfig";

const ServiceList = ({ data, slug }) => {
  const [serviceList, setServiceList] = useState(null);
  const [serviceGrid, setServiceGrid] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  useEffect(() => {
    const getBlogList = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setServiceList(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogList();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const getServiceGrid = async () => {
      try {
        const data = await getData(themeConfig.api.service_url);
        setServiceGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServiceGrid();
  }, []);

  if (serviceList?.Type === "Type-1") {
    return (
      <section className="our-services-section-style-3">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-12 col-md-8">
              <div className="section-heading bottom-55">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {serviceList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {serviceList?.Sub_Title}
                </h2>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="text-right right-view-btn">
                {serviceList?.Button_Link && (
                  <Link
                    href={serviceList?.Button_Link}
                    className="btn btn-secondary btn-style-3"
                  >
                    {serviceList?.Button_Name}{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {serviceGrid &&
              serviceGrid?.slice(0, visibleCount)?.map((item, index) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={index}>
                    <ServiceGrid data={item} />
                  </div>
                );
              })}

            {visibleCount < serviceGrid?.length && (
              <div className="col-12">
                <div className="read-more-bottom">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="btn btn-secondary btn-style-3"
                  >
                    Load more{" "}
                    <Image
                      src="/assets/images/loader.svg"
                      alt="loader"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } else if (serviceList?.Type === "Type-2") {
    return (
      <section className="business-services-section">
        <div className="business-shape">
          <div className="shape-circle"></div>
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
                  {serviceList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {serviceList?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            {serviceGrid &&
              serviceGrid?.slice(0, 3)?.map((item, index) => {
                return (
                  <div className="col-12 col-md-4" key={index}>
                    <div className="business-service-grid">
                      <div className="business-service-icon">
                        <Image
                          src={`${BACKEND_URL}${item?.Feature_Image?.url}`}
                          alt=""
                          width={80}
                          height={80}
                        />
                      </div>
                      <h4>
                        <Link href={`service/${item?.Slug}`}>
                          {item?.Title}
                        </Link>
                      </h4>
                      <p>{item?.Short_Description}</p>
                      <Link
                        href={`service/${item?.Slug}`}
                        className="service-btn"
                      >
                        <Image
                          src={contentConfig.ARROW_BTN.IMAGE}
                          alt={contentConfig.ARROW_BTN.ALT}
                          width={12}
                          height={12}
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else if (serviceList?.Type === "Type-3") {
    return (
      <section className="our-services-section-style-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {serviceList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {serviceList?.Sub_Title}
                </h2>
              </div>

              <div className="row">
                {serviceGrid &&
                  serviceGrid?.slice(0, 6)?.map((item, index) => {
                    return (
                      <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <ServiceGridThree data={item} />
                      </div>
                    );
                  })}

                <div className="col-12 text-center mt-sm-4 bottom-view-btn">
                  {serviceList?.Button_Link && (
                    <Link
                      href={serviceList?.Button_Link}
                      className="btn btn-primary btn-style-2"
                    >
                      {serviceList?.Button_Name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (serviceList?.Type === "Type-4") {
    return (
      <section className="why-choose-us-section-style-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {serviceList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {serviceList?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            {serviceGrid &&
              serviceGrid.slice(0, 6)?.map((item, index) => {
                return (
                  <div className="col-12 col-md-4" key={index}>
                    <div className="why-choose-us-grid">
                      <div className="why-choose-us-icon">
                        {item?.Feature_Image?.url && (
                          <Image
                            src={`${BACKEND_URL}${item?.Feature_Image?.url}`}
                            alt=""
                            width={60}
                            height={60}
                          />
                        )}
                      </div>
                      <h4>
                        {item?.Slug && (
                          <Link href={`service/${item?.Slug}`}>
                            {item.Title}
                          </Link>
                        )}
                      </h4>
                      <p>{item.Short_Description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else if (serviceList?.Type === "Swiper-Type") {
    return (
      <section className="why-choose-us-section-style-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading bottom-55">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {serviceList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {serviceList?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="why-choose-us-grid-slider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  loop={true}
                  pagination={{
                    el: ".why-choose-us-grid-slider .swiper-pagination",
                    clickable: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1199: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {serviceGrid &&
                    serviceGrid.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ServiceGridSwiper data={item} />
                        </SwiperSlide>
                      );
                    })}

                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ServiceList;
