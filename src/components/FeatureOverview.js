import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import { useState } from "react";

const FeatureOverview = ({ data }) => {
  const [Active, setActive] = useState(0);

  return (
    <section className="inner-why-choose-section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="why-choose-content">
              <h5 className="sub-title">{data?.Title}</h5>
              <h2 className="title">{data?.Sub_Title}</h2>

              <div className="why-choose-img-group">
                {data?.Image &&
                  data?.Image.map((item, index) => {
                    return (
                      <div className="img-group-box" key={index}>
                        <Image
                          src={`${BACKEND_URL}${item?.url}`}
                          alt=""
                          width={299}
                          height={150}
                        />
                      </div>
                    );
                  })}
              </div>

              <ul className="ul-list list-style-2">
                {data?.Service_Grid_Section &&
                  data?.Service_Grid_Section?.map((value, index) => {
                    return <li key={index}>{value?.Title}</li>;
                  })}
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="why-choose-desc">
              <p>{data?.Description}</p>
            </div>

            <div className="accordion">
              {data?.Faq_Grid_Section &&
                data?.Faq_Grid_Section?.map((detail, index) => {
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
                        <h3>{detail?.Title}</h3>
                      </div>

                      <div
                        className={`accordion-content ${
                          Active === index ? "active" : ""
                        }`}
                      >
                        <p>{detail?.Description}</p>
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

export default FeatureOverview;
