import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import { useEffect, useState } from "react";

const HowWeWork = ({ data, slug }) => {
  const [work, setWork] = useState(null);

  useEffect(() => {
    const getWork = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setWork(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWork();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="how-we-help-section bg-tertiary content__item">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 p-0">
            <div className="how-we-help-img item-overflow">
              {work?.Image?.url && (
                <Image
                  src={`${BACKEND_URL}${work?.Image?.url}`}
                  alt=""
                  className="content-item-zoom"
                  width={918}
                  height={668}
                />
              )}
              <div className="d-none content-item-y">d none</div>
            </div>
          </div>
          <div className="col-12 col-md-6 p-0">
            <div className="how-we-help-content">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {work?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {work?.Sub_Title}
                </h2>
              </div>

              <div className="how-we-help-list">
                {work?.Grid_Section &&
                  work?.Grid_Section?.map((item, index) => {
                    return (
                      <div className="how-we-help-service" key={index}>
                        <div className="icon">
                          <Image
                            src={`${BACKEND_URL}${item?.Image?.url}`}
                            alt=""
                            width={62}
                            height={62}
                          />
                        </div>
                        <div className="content">
                          <h6>
                            {index + 1}. {item?.Title}
                          </h6>
                          <p>{item?.Description}</p>
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

export default HowWeWork;
