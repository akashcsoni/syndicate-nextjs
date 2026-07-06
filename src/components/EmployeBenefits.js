import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const EmployeBenefits = ({ data, slug }) => {
  const [employe, setEmploye] = useState({});

  useEffect(() => {
    const getCurrentData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setEmploye(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="how-we-care-section inner-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-7 pe-md-5">
            <div className="how-we-care-gallery">
              <div className="row">
                {employe?.Grid_Section &&
                  employe?.Grid_Section.map((item, index) => {
                    let add_class = "";
                    if (index === 0) {
                      add_class = "mt-7";
                    }
                    if (index === 3) {
                      add_class = "m-top";
                    }
                    return (
                      <div
                        className={`col-6 ${add_class}`}
                        data-aos="fade-up"
                        data-aos-duration="500"
                        key={index}
                      >
                        <div className="how-we-care-box">
                          <Link className="thumb" href="#">
                            <Image
                              src={`${BACKEND_URL}${item?.Image?.url}`}
                              alt=""
                              width={328}
                              height={240}
                            />
                          </Link>
                          <div className="how-we-care-title">
                            <Link href="/">{item.Title}</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="how-we-care-info">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {employe?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {employe?.Sub_Title}
                </h2>
              </div>
              <p data-aos="fade-up" data-aos-duration="1200">
                {employe?.Description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeBenefits;
