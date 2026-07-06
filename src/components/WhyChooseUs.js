import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WhyChooseUs = ({ data, slug }) => {
  const [Active, setActive] = useState(0);
  const [choose, setChoose] = useState(null);

  useEffect(() => {
    const getChooseData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setChoose(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getChooseData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="why-choose-us-section content__item">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {choose?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {choose?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="whychooseus-feature-list">
              <ul className="tabs-list">
                {choose?.Grid_Section &&
                  choose?.Grid_Section.map((tabs_data, index) => {
                    return (
                      <li
                        className={`tab-link ${
                          Active === index ? "current" : ""
                        }`}
                        data-tab={tabs_data?.Tab_Name}
                        key={index}
                        onClick={() => {
                          setActive(index);
                        }}
                      >
                        {tabs_data?.Tab_Name}
                      </li>
                    );
                  })}
              </ul>

              {choose?.Grid_Section &&
                choose?.Grid_Section.map((item, index) => {
                  return (
                    <div
                      className={`tabs-content ${
                        Active === index ? "current" : ""
                      }`}
                      id={item?.Tab_Name}
                      key={index}
                    >
                      <div className="row align-items-center">
                        <div className="col-12 col-md-6">
                          <div className="whychooseus-feature-img item-overflow">
                            <Image
                              src={`${BACKEND_URL}${item?.Image?.url}`}
                              alt=""
                              className="content-item-zoom"
                              width={5801}
                              height={377}
                            />
                            <div className="d-none content-item-y">d none</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="whychooseus-feature-content">
                            <h5
                              className="sub-title"
                              data-aos="fade-up"
                              data-aos-duration="500"
                            >
                              {item?.Title}
                            </h5>
                            <h2
                              className="title"
                              data-aos="fade-up"
                              data-aos-duration="1000"
                            >
                              {item?.Sub_Title}
                            </h2>
                            <p>{item?.Description}</p>
                            <Link
                              href={item?.Button_Link}
                              className="btn btn-primary"
                            >
                              {item?.Button_Name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
