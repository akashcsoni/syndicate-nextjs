import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import { useEffect, useState } from "react";
import ServiceGrid from "./ServiceGrid";
import Link from "next/link";
import Image from "next/image";

const OurServices = ({ data, slug }) => {
  const [service, setService] = useState(null);
  const [serviceGrid, setServiceGrid] = useState(null);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setService(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTestimonial();
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

  const incrementInitialPostList = 3;
  const [displayPosts, setDisplayPosts] = useState(0);

  useEffect(() => {
    if (service?.Per_Page_Limit) {
      setDisplayPosts(parseInt(service?.Per_Page_Limit));
    }
  }, [service]);

  const loadMore = () => {
    setDisplayPosts(displayPosts + incrementInitialPostList);
  };

  return (
    <section className="our-services-section-page inner-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading bottom-55 heading-style-2">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {service?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {service?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {serviceGrid &&
            serviceGrid?.slice(0, displayPosts)?.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <ServiceGrid data={item} btn={true} />
                </div>
              );
            })}
          {serviceGrid && displayPosts < serviceGrid.length && (
            <div className="col-12">
              <div className="read-more-bottom">
                <div
                  className="btn btn-secondary btn-style-3"
                  onClick={(e) => {
                    e.preventDefault();
                    loadMore();
                  }}
                >
                  Load more{" "}
                  <Image
                    src="/assets/images/loader.svg"
                    alt="loader"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
