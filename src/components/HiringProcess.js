import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";

const HiringProcess = ({ data, slug }) => {
  const [hirring, setHirring] = useState({});

  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setHirring(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="recruitment-process-section inner-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {hirring?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {hirring?.Sub_Title}
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {hirring?.Grid_Section &&
            hirring?.Grid_Section?.map((item, index) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-3"
                  data-aos="fade-right"
                  data-aos-duration="500"
                  key={index}
                >
                  <div className="recruitment-process-wrap">
                    <div className="recruitment-process-box">
                      <h3>{item?.Title}</h3>
                      <div className="process-box-body">
                        <p>{item?.Description}</p>
                      </div>
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

export default HiringProcess;
