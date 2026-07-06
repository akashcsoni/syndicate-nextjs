
"use client";

import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useRef, useState } from "react";

const BusinessExperties = ({ data, slug }) => {
  const [experties, setExperties] = useState(null);
  const counterRef = useRef(null);
  const counters = useRef([]);

  useEffect(() => {
    const getExperties = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setExperties(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getExperties();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const handleScroll = () => {
      if (counterRef.current) {
        const top =
          counterRef.current.getBoundingClientRect().top - window.innerHeight;
        if (top < 0) {
          counters.current.forEach((counter) => {
            const updateCount = () => {
              const target = parseFloat(counter.getAttribute("data-count"));
              const isFloat = counter.getAttribute("data-count").includes(".");
              const count = parseFloat(counter.innerText);
              const increment = target / 200;

              if (count < target) {
                const next = isFloat
                  ? (count + increment).toFixed(1)
                  : Math.ceil(count + increment);
                counter.innerText = next;
                setTimeout(updateCount, 10);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="our-sucess-section">
      <div className="our-sucess-box bg-tertiary" id="counter" ref={counterRef}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {experties && (
                <>
                  <div className="section-heading">
                    <h5
                      className="sub-title"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      {experties?.Title}
                    </h5>
                    <h2
                      className="title"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      {experties?.Sub_Title}
                    </h2>
                  </div>

                  <div className="row our-sucess-list">
                    

                    {experties?.Grid_Section?.map((item, index) => {
                      const match = item.Title.match(/^([\d.]+)(.*)$/);
                      const valueOnly = match?.[1] || null;
                      const suffix = match?.[2] || "";

                      return (
                        <div
                          className="col-6 col-md-3"
                          key={index}
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          <div className="our-sucess-service">
                            <h2>
                              {valueOnly ? (
                                <>
                                  <span
                                    className="counting"
                                    data-count={valueOnly}
                                    ref={(el) => (counters.current[index] = el)}
                                  >
                                    0
                                  </span>
                                  {suffix}
                                </>
                              ) : (
                                item.Title
                              )}
                            </h2>
                            <h6>{item.Description}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessExperties;
