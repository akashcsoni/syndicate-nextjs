import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OurPricing = ({ data, slug }) => {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    const getPricing = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setPricing(resdata?.data);
      } catch (err) {
        setPricing(null);
      }
    };

    getPricing();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="pricing-section-style-2">
      <div className="row">
        <div className="col-12">
          <div className="section-heading">
            <h5
              className="sub-title"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              {pricing?.Title}
            </h5>
            <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
              {pricing?.Sub_Title}
            </h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {pricing?.Grid_Section &&
            pricing?.Grid_Section.map((item, index) => {
              return (
                <div className="col-12 col-md-6" key={index}>
                  <div className="pricing-box">
                    <div className="pricing-heading">
                      <div className="pricing-icon">
                        <Image
                          src={`${BACKEND_URL}${item?.Image?.url}`}
                          alt=""
                          width={102}
                          height={102}
                        />
                      </div>
                      <div className="pricing-title">
                        <h5>{item?.Title}</h5>
                        <p>{item?.Sub_Title}</p>
                      </div>
                    </div>
                    <div className="pricing-list">
                      <ul>
                        {item.List_Grid &&
                          item.List_Grid.map((items, index) => {
                            return (
                              <li key={index}>
                                <p>{items.Name}:</p>
                                <span>${items.Price}</span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="pricing-btn">
                      {item?.Button_Link && (
                        <Link
                          href={item?.Button_Link}
                          className="btn btn-primary btn-style-2"
                        >
                          {item.Button_Name}{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default OurPricing;
