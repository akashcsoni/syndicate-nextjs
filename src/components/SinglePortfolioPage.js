"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { getData } from "@/utils/Api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PortfolioGrid from "./PortfolioGrid";
import InnerHeroPage from "./InnerHeroPage";
import Link from "next/link";

const SinglePortfolioPage = ({ data }) => {
  const [Active, setActive] = useState(0);

  const [filteredPortfolio, setFilteredPortfolio] = useState([]);

  const category = data?.category?.Name;
  const currentPage = data?.Slug;

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await getData(themeConfig.api.categories_url);
        const categoryData = data?.data;

        // Find matching category
        const matchedCategory = categoryData.find(
          (item) => item?.Name === category
        );

        if (!matchedCategory) {
          setFilteredPortfolio([]);
          return;
        }

        // Filter out current article
        const filteredArticles = matchedCategory.portfolios?.filter(
          (article) => article?.Slug !== currentPage
        );

        setFilteredPortfolio(filteredArticles);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, [category, currentPage]);

  return (
    <>
      <section className="inner-hero-section content__item">
        <div className="inner-banner-img item-overflow">
          {data?.Image?.url && (
            <Image
              src={`${BACKEND_URL}${data?.Image?.url}`}
              width={data?.Image?.width}
              height={data?.Image?.height}
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

      <section className="inner-cms-section inner-wrapper content__item">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-12 col-md-6">
              <div className="section-heading inner-heading">
                <h5 className="sub-title">{data?.Portfolio_Tage}</h5>
                <h2 className="title">{data?.Portfolio_Title}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="section-heading-des">
                <p>{data?.Portfolio_Short_Description}</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 col-md-6 pe-md-4">
              <div className="inner-image-box item-overflow">
                <Image
                  src={`${BACKEND_URL}${data?.Image?.url}`}
                  alt=""
                  width={599}
                  height={642}
                  className="content-item-zoom"
                />
                <div className="d-none content-item-y">d none</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="image-with-text-content">
                <h2 className="title">{data?.Title}</h2>
                {data?.Portfolio_Hero?.Description &&
                  data?.Portfolio_Hero?.Description?.map((label, index) => {
                    return <p key={index}>{label?.Description}</p>;
                  })}

                <ul className="ul-list">
                  {data?.Portfolio_Hero?.Grid_Section &&
                    data?.Portfolio_Hero?.Grid_Section?.map((list, index) => {
                      return (
                        <li key={index}>
                          <strong>{list?.Title}:</strong>{" "}
                          {list?.Title === "Category"
                            ? data?.category?.Name
                            : list?.Value}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          {data?.blocks &&
            data?.blocks?.map((data, index) => {
              if (data?.__component === "shared.image") {
                return (
                  <div className="portfolio-gallery" key={index}>
                    <div className="row align-items-center">
                      {data?.Image &&
                        data?.Image?.map((list, index) => {
                          return (
                            <div className="col-12 col-md-4" key={index}>
                              <div className="inner-image-box">
                                <Image
                                  src={`${BACKEND_URL}${list?.url}`}
                                  alt=""
                                  width={386}
                                  height={251}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              } else if (data?.__component === "shared.description") {
                return (
                  <div className="row" key={index}>
                    <div className="col-12">
                      <div className="full-des-part">
                        <p>{data?.Description}</p>
                      </div>
                    </div>
                  </div>
                );
              } else if (data?.__component === "shared.faq") {
                const faqList = data?.Grid_Section || [];

                // split array into two halves
                const midIndex = Math.ceil(faqList.length / 2);
                const leftFaqs = faqList.slice(0, midIndex);
                const rightFaqs = faqList.slice(midIndex);

                return (
                  <React.Fragment key={index}>
                    {/* LEFT COLUMN */}
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="accordion">
                          {leftFaqs.map((detail) => (
                            <div className="accordion-list" key={detail.id}>
                              <div
                                className={`accordion-tabs ${
                                  Active === detail.id ? "active" : ""
                                }`}
                                onClick={() => setActive(detail.id)}
                              >
                                <h3>{detail.Title}</h3>
                              </div>

                              <div
                                className={`accordion-content ${
                                  Active === detail.id ? "active" : ""
                                }`}
                              >
                                <p>{detail.Description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT COLUMN */}
                      <div className="col-12 col-md-6">
                        <div className="accordion">
                          {rightFaqs.map((detail) => (
                            <div className="accordion-list" key={detail.id}>
                              <div
                                className={`accordion-tabs ${
                                  Active === detail.id ? "active" : ""
                                }`}
                                onClick={() => setActive(detail.id)}
                              >
                                <h3>{detail.Title}</h3>
                              </div>

                              <div
                                className={`accordion-content ${
                                  Active === detail.id ? "active" : ""
                                }`}
                              >
                                <p>{detail.Description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
        </div>
      </section>

      {filteredPortfolio?.length > 0 && (
        <section className="related-services-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="related-services-wrap">
                  <div className="row">
                    <div className="col-12">
                      <div className="section-heading">
                        <h2 className="title">Related Portfolio</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {filteredPortfolio &&
                      filteredPortfolio?.slice(0, 4)?.map((item, index) => {
                        return (
                          <div className="col-6 col-md-6 col-lg-3" key={index}>
                            <PortfolioGrid data={item} />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePortfolioPage;
