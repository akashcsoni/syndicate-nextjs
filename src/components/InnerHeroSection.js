"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

const InnerHeroSection = ({ data, slug }) => {
  const [innerHero, setInnerHero] = useState({});

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });

        setInnerHero(resdata?.data);
      } catch (err) {
        setInnerHero({});
      }
    };

    getHeroData();
  }, [slug, data?.id, data?.name]);

  return (
    <>
      <section className="inner-hero-section content__item">
        <div className="inner-banner-img item-overflow">
          {innerHero?.Background_Image?.url && (
            <Image
              src={`${BACKEND_URL}${innerHero?.Background_Image?.url}`}
              width={innerHero?.Background_Image?.width}
              height={innerHero?.Background_Image?.height}
              alt="inner banner img"
              className="content-item-zoom"
            />
          )}

          <div className="d-none content-item-y">d none</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inner-hero-content">
                {innerHero && (
                  <h1
                    className="title"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {innerHero?.Title}
                  </h1>
                )}

                {innerHero?.Breadcrumb?.length > 0 && (
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      {(() => {
                        const breadcrumb = innerHero.Breadcrumb;

                        const homeItem = breadcrumb.find(
                          (item) => item.Name.toLowerCase() === "home"
                        );
                        const otherItems = breadcrumb.filter(
                          (item) => item.Name.toLowerCase() !== "home"
                        );

                        const orderedBreadcrumb = [
                          ...(homeItem ? [homeItem] : []),
                          ...otherItems,
                        ];

                        return orderedBreadcrumb.map((item, index) => {
                          const isLast = index === orderedBreadcrumb.length - 1;

                          return (
                            <li
                              key={item.id}
                              className={`breadcrumb-item ${
                                isLast ? "active" : ""
                              }`}
                              aria-current={isLast ? "page" : undefined}
                            >
                              {item.Link && !isLast ? (
                                <Link href={item.Link}>{item.Name}</Link>
                              ) : (
                                item.Name
                              )}
                            </li>
                          );
                        });
                      })()}
                    </ol>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InnerHeroSection;
