"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = ({ data, slug }) => {
  console.log("component render");
  console.log(data, "data for hero component ");

  const [hero, setHero] = useState(null);
  console.log(hero, "hero data");

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });

        setHero(resdata?.data);
      } catch (err) {
        // setHero(null);
        console.log(err);
      }
    };

    getHeroData();
  }, [slug, data?.id, data?.name]);

  return (
    <section className="hero-section-style-3 content__item">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7 order-2 order-md-1">
            <div className="hero-content content-item-y">
              <h1
                className="title"
                data-aos="fade-up"
                data-aos-duration="1000"
                dangerouslySetInnerHTML={{ __html: hero?.Title }}
              />
              <p>{hero?.Description}</p>
              {hero?.Button_Link && (
                <Link
                  href={hero?.Button_Link}
                  className="btn btn-secondary btn-style-3"
                >
                  {hero?.Button_Name}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
          <div className="col-12 col-md-5 order-1 order-md-2">
            <div className="hero-images-style-3">
              <div className="hero-images-box item-overflow">
                {hero?.Background_Image?.url && (
                  <Image
                    src={`${BACKEND_URL}${hero?.Background_Image?.url}`}
                    alt=""
                    width={hero?.Background_Image?.width}
                    height={hero?.Background_Image?.height}
                    className="content-item-zoom"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
