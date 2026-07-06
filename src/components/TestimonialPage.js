import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";
import TestimonialGrid from "./TestimonialGrid";

const TestimonialPage = ({ data, slug }) => {
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    const getConsultancy = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setTestimonial(resdata?.data);
      } catch (err) {
        setTestimonial(null);
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
                {testimonial?.Title}
              </h5>
              <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
                {testimonial?.Sub_Title}
              </h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="section-heading-des">
              <p>{testimonial?.Description}</p>
            </div>
          </div>
        </div>

        <div className="testimonial-grid">
          <div className="row">
            {testimonial?.Grid_Section &&
              testimonial?.Grid_Section.map((item, index) => {
                return (
                  <div
                    className="col-12 col-md-6"
                    data-aos="fade-up"
                    data-aos-duration={(index + 1) * 500}
                    key={index}
                  >
                    <TestimonialGrid data={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPage;
