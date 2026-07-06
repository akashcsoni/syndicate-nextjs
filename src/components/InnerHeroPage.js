"use client";

import { BACKEND_URL } from "@/config/themeConfig";

import Image from "next/image";
import Link from "next/link";

const InnerHeroPage = ({ data }) => {
  return (
    <>
      <section className="inner-hero-section content__item">
        <div className="inner-banner-img item-overflow">
          {data?.Background_Image?.url && (
            <Image
              src={`${BACKEND_URL}${data?.Background_Image?.url}`}
              width={data?.Background_Image?.width}
              height={data?.Background_Image?.height}
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
                {data && (
                  <h1
                    className="title"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {data?.Title}
                  </h1>
                )}

                {data?.Breadcrumb?.length > 0 && (
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      {(() => {
                        const breadcrumb = data.Breadcrumb;

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

export default InnerHeroPage;
