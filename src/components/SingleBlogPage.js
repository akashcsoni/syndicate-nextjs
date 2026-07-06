"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";
import SidebarSetting from "./SidebarSetting";
import { getData } from "@/utils/Api";
import { useEffect, useState } from "react";
import BlogGrid from "./BlogGrid";
import contentConfig from "@/config/contentConfig";
import { getShareUrl } from "@/config/ShareUrl";
import { GlobalIcon } from "@/config/GlobalIcon";

const SingleBlogPage = ({ data }) => {
  // console.log(data, "this is for data");

  const [filteredBlog, setFilteredBlog] = useState([]);
  const [shareUrl, setShareUrl] = useState("");

  // ✅ Client-side URL only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

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
          setFilteredBlog([]);
          return;
        }

        // Filter out current article
        const filteredArticles = matchedCategory.articles?.filter(
          (article) => article?.Slug !== currentPage
        );

        setFilteredBlog(filteredArticles);
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
      {/* // Blog Grid One */}
      <section className="blog-single-page inner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="blog-single-wrapper">
                <div className="blog-single-content">
                  <div className="blog-thumb-img">
                    <Image
                      src={`${BACKEND_URL}${data?.Image?.url}`}
                      alt=""
                      width={823}
                      height={384}
                    />
                  </div>
                  <div className="blog-info">
                    <div className="blog-admin-info">
                      <i className="fa-solid fa-user"></i>
                      {data?.Author?.name}
                      <div className="blog-date">
                        {data?.createdAtFormatted}
                      </div>
                    </div>
                    <h2 className="title">{data?.Title}</h2>

                    {data?.blocks &&
                      data?.blocks?.map((data, index) => {
                        if (data?.__component === "shared.description") {
                          return <p key={index}>{data?.Description}</p>;
                        } else if (data?.__component === "shared.block-quote") {
                          return (
                            <blockquote className="blockqoute" key={index}>
                              {data?.Title}
                            </blockquote>
                          );
                        } else if (data?.__component === "shared.image") {
                          return (
                            <div className="row" key={index}>
                              {data?.Image &&
                                data?.Image?.map((item, index) => {
                                  return (
                                    <div
                                      className="col-12 col-md-6"
                                      key={index}
                                    >
                                      <Image
                                        src={`${BACKEND_URL}${item?.url}`}
                                        alt=""
                                        width={399}
                                        height={186}
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        }
                      })}

                    <div className="blog-details-tags">
                      <Link href="#" className="share-icon">
                        <Image
                          src="/assets/images/share-icon.svg"
                          alt="share icon"
                          width={18}
                          height={20}
                        />
                      </Link>
                      <ul className="blog-tags">
                        <li>
                          <Link href="#">{data?.category?.Name}</Link>
                        </li>
                      </ul>

                      <ul className="social-link">
                        {contentConfig?.Share_icon?.map((icon, index) => (
                          <li key={index}>
                            <Link
                              href={getShareUrl(
                                icon?.name,
                                shareUrl,
                                "Check this case study"
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GlobalIcon name={icon?.name} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 ps-lg-5">
              <SidebarSetting />
            </div>
          </div>

          {filteredBlog?.length > 0 && (
            <div className="row">
              <div className="col-12">
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Related Blogs
                </h2>
              </div>

              {filteredBlog &&
                filteredBlog?.slice(0, 2)?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6" key={index}>
                      <BlogGrid data={item} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
      ;{/* //  Blog Grid Two */}
      {/* <section className="blog-single-page inner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 order-1 order-md-2">
              <div className="blog-single-wrapper">
                <div className="blog-single-content">
                  <div className="blog-thumb-img">
                    <Image
                      src={`${BACKEND_URL}${data?.Image?.url}`}
                      alt=""
                      width={823}
                      height={384}
                    />
                  </div>
                  <div className="blog-info">
                    <div className="blog-admin-info">
                      <div className="blog-date">
                        {data?.createdAtFormatted}
                      </div>
                    </div>

                    <h2 className="title">{data?.Title}</h2>

                    {data?.blocks &&
                      data?.blocks?.map((data, index) => {
                        if (data?.__component === "shared.description") {
                          return <p key={index}>{data?.Description}</p>;
                        } else if (data?.__component === "shared.block-quote") {
                          return (
                            <blockquote className="blockqoute" key={index}>
                              {data?.Title}
                            </blockquote>
                          );
                        } else if (data?.__component === "shared.image") {
                          return (
                            <div className="row" key={index}>
                              {data?.Image &&
                                data?.Image?.map((item, index) => {
                                  return (
                                    <div
                                      className="col-12 col-md-6"
                                      key={index}
                                    >
                                      <Image
                                        src={`${BACKEND_URL}${item?.url}`}
                                        alt=""
                                        width={399}
                                        height={186}
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        }
                      })}

                    <div className="blog-details-tags">
                      <Link href="#" className="share-icon">
                        <Image
                          src="/assets/images/share-icon.svg"
                          alt="share icon"
                          width={18}
                          height={20}
                        />
                      </Link>
                      <ul className="blog-tags">
                        <li>
                          <Link href="#">{data?.category?.Name}</Link>
                        </li>
                      </ul>
                      <ul className="social-link">
                        {contentConfig?.Share_icon?.map((icon, index) => (
                          <li key={index}>
                            <Link
                              href={getShareUrl(
                                icon?.name,
                                shareUrl,
                                "Check this case study"
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GlobalIcon name={icon?.name} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 pe-lg-5 order-2 order-md-1">
              <SidebarSetting />
            </div>
          </div>

          {filteredBlog?.length > 0 && (
            <div className="row">
              <div className="col-12">
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Related Blogs
                </h2>
              </div>

              {filteredBlog &&
                filteredBlog?.slice(0, 2)?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6" key={index}>
                      <BlogGrid data={item} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section> */}
      {/* // Blog Grid Three */}
      {/* <section className="blog-single-page inner-wrapper">
        <div className="container">
          <div className="row mb-5 mb-md-0">
            <div className="col-12">
              <div className="blog-single-wrapper">
                <div className="blog-single-content">
                  <div className="blog-thumb-img">
                    <Image
                      src={`${BACKEND_URL}${data?.Image?.url}`}
                      alt=""
                      width={823}
                      height={384}
                    />
                  </div>
                  <div className="blog-info">
                    <div className="blog-admin-info">
                      <div className="blog-date">
                        {data?.createdAtFormatted}
                      </div>
                    </div>

                    <h2 className="title">{data?.Title}</h2>

                    {data?.blocks &&
                      data?.blocks?.map((data, index) => {
                        if (data?.__component === "shared.description") {
                          return <p key={index}>{data?.Description}</p>;
                        } else if (data?.__component === "shared.block-quote") {
                          return (
                            <blockquote className="blockqoute" key={index}>
                              {data?.Title}
                            </blockquote>
                          );
                        } else if (data?.__component === "shared.image") {
                          return (
                            <div className="row" key={index}>
                              {data?.Image &&
                                data?.Image?.map((item, index) => {
                                  return (
                                    <div
                                      className="col-12 col-md-6"
                                      key={index}
                                    >
                                      <Image
                                        src={`${BACKEND_URL}${item?.url}`}
                                        alt=""
                                        width={611}
                                        height={285}
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        }
                      })}

                    <div className="blog-details-tags">
                      <Link href="#" className="share-icon">
                        <Image
                          src="/assets/images/share-icon.svg"
                          alt="share icon"
                          width={18}
                          height={20}
                        />
                      </Link>
                      <ul className="blog-tags">
                        <li>
                          <Link href="#">{data?.category?.Name}</Link>
                        </li>
                      </ul>
                      <ul className="social-link">
                        {contentConfig?.Share_icon?.map((icon, index) => (
                          <li key={index}>
                            <Link
                              href={getShareUrl(
                                icon?.name,
                                shareUrl,
                                "Check this case study"
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GlobalIcon name={icon?.name} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {filteredBlog?.length > 0 && (
            <div className="row">
              <div className="col-12">
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Related Blogs
                </h2>
              </div>

              {filteredBlog &&
                filteredBlog?.slice(0, 2)?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6" key={index}>
                      <BlogGrid data={item} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section> */}
    </>
  );
};

export default SingleBlogPage;
