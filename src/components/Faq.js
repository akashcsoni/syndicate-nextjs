import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";

const Faq = ({ data, slug }) => {
  const [Active, setActive] = useState(0);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    const getConsultancy = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setFaq(resdata?.data);
      } catch (err) {
        setFaq(null);
      }
    };

    getConsultancy();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="inner-cms-section inner-wrapper">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-12 col-md-6">
            <div className="section-heading inner-heading">
              <h5
                className="sub-title"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {faq?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {faq?.Sub_Title}
              </h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="section-heading-des">
              <p>{faq?.Description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="faq-list">
              <div className="accordion">
                {faq?.Grid_Section &&
                  faq?.Grid_Section.map((item, index) => {
                    return (
                      <div className="accordion-list" key={index}>
                        <div
                          className={`accordion-tabs ${
                            Active === index ? "active" : ""
                          }`}
                          onClick={() => {
                            setActive(index);
                          }}
                        >
                          <h3>{item?.Title}</h3>
                        </div>

                        <div
                          className={`accordion-content ${
                            Active === index ? "active" : ""
                          }`}
                        >
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

export default Faq;
