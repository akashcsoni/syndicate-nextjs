"use client";

import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import SidebarSetting from "./SidebarSetting";
import Link from "next/link";
import contentConfig from "@/config/contentConfig";
import { GlobalIcon } from "@/config/GlobalIcon";
import { getShareUrl } from "@/config/ShareUrl";
import { useEffect, useState } from "react";

const SingleCaseStudiePage = ({ data }) => {
  const [shareUrl, setShareUrl] = useState("");

  // ✅ Client-side URL only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <section className="inner-hero-section content__item">
        <div className="inner-banner-img item-overflow">
          <Image
            src="/assets/images/inner-banner-img.jpg"
            alt="inner banner img"
            className="content-item-zoom"
            width={1835}
            height={550}
          />
          <div className="d-none content-item-y">d none</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inner-hero-content">
                <h1
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {data?.Title}
                </h1>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {data?.Title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                      height={549}
                    />
                  </div>
                  <div className="blog-info">
                    <div className="case-study-info">
                      <table className="info">
                        <tbody>
                          {/* {Data.info &&
                          Data.info.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th>{item.label}:</th>
                                <td>{item.value}</td>
                              </tr>
                            );
                          })} */}
                        </tbody>
                      </table>
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
                        } else if (
                          data?.__component === "shared.case-studie-steps"
                        ) {
                          return (
                            <div className="case-study-steps" key={index}>
                              <div className="row">
                                <h2>{data?.Title}</h2>
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
                                          height={295}
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                              <ul>
                                {data?.Grid_Section &&
                                  data?.Grid_Section?.map(
                                    (item_step, index) => {
                                      return (
                                        <li className="step" key={index}>
                                          <h3>
                                            <span>0{index + 1}</span>
                                            {item_step.Title}
                                          </h3>
                                          {item_step?.Description &&
                                            item_step?.Description?.map(
                                              (data, index) => {
                                                return (
                                                  <p key={index}>
                                                    {data?.Description}
                                                  </p>
                                                );
                                              }
                                            )}
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </div>
                          );
                        }
                      })}

                    {/* <p>{Data.last_label}</p> */}

                    <div className="blog-details-tags">
                      <div className="share-icon">
                        <Image
                          src="/assets/images/share-icon.svg"
                          alt="share icon"
                          width={18}
                          height={20}
                        />
                      </div>
                      <ul className="blog-tags">
                        <li>
                          <Link href="#">{data?.Category?.Name}</Link>
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
        </div>
      </section>
    </>
  );
};

export default SingleCaseStudiePage;
