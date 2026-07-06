import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HelpOverview = ({ data, slug }) => {
  const [Active, setActive] = useState(0);
  const [help, setHelp] = useState(null);

  useEffect(() => {
    const getHelp = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setHelp(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getHelp();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="how-we-help-section-style-2 bg-tertiary content__item">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 p-0">
            <div className="how-we-help-img item-overflow">
              {help?.Image?.url && (
                <Image
                  src={`${BACKEND_URL}${help?.Image?.url}`}
                  alt="how we help img"
                  className="content-item-zoom"
                  width={918}
                  height={652}
                />
              )}

              <div className="d-none content-item-y">d none</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 p-0">
            <div className="how-we-help-content">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {help?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {help?.Sub_Title}
                </h2>
              </div>

              <div className="how-we-help-tabs-list">
                <ul className="tabs-list">
                  {help?.Grid_Section &&
                    help?.Grid_Section?.map((item, index) => {
                      return (
                        <li
                          className={`tab-link ${
                            Active === index ? "current" : ""
                          }`}
                          data-tab={item?.Tab_Name}
                          key={index}
                          onClick={() => {
                            setActive(index);
                          }}
                        >
                          {item?.Tab_Name}
                        </li>
                      );
                    })}
                </ul>

                {help?.Grid_Section &&
                  help?.Grid_Section?.map((item, index) => {
                    return (
                      <div
                        className={`tabs-content ${
                          Active === index ? "current" : ""
                        }`}
                        id="company_mission"
                        key={index}
                      >
                        <div className="row align-items-center">
                          <div className="col-12">
                            <p>{item.Description}</p>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="how-we-help-feature-img">
                              <Image
                                src={`${BACKEND_URL}${item?.Image?.url}`}
                                alt=""
                                width={161}
                                height={112}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-8">
                            <div className="how-we-help-feature-content">
                              <p>{item?.title}</p>
                            </div>
                          </div>
                          <div className="col-12 mt-3 mt-md-5">
                            {item?.Button_Link && (
                              <Link
                                href={item?.Button_Link}
                                className="btn btn-primary btn-style-2"
                              >
                                {item?.Button_Name}{" "}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpOverview;











// time sheet

// 3 

// not know

// 9 

// work on orion

// 10

// 3 hour webbytemplate for product zip upload and error for product zip upload

// else orion


// 17 

// 2 hour webbytemplate for email check for order

// 19 

// 45 minute razorpy change for out country and test

// medicare done 

// bigmentor start

// 22 23 24 

// on 24 big mentor done morning , big mentor

// 25 

// theme live medicare bigmentor 3 hour 

// syndicate
