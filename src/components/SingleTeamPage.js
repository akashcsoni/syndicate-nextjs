import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTeamPage = ({ data }) => {
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
                  {data?.Name}
                </h1>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {data?.Name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-cms-section inner-wrapper content__item">
        <div className="container">
          <div className="row align-items-center bottom-55">
            <div className="col-12 col-md-6 pe-md-4">
              <div className="inner-image-box item-overflow">
                <Image
                  src={`${BACKEND_URL}${data?.Image?.url}`}
                  alt=""
                  className="content-item-zoom"
                  width={599}
                  height={642}
                />
                <div className="d-none content-item-y">d none</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="image-with-text-content">
                <h5 className="sub-title">{data?.Name}</h5>
                <h2 className="title">{data?.Position}</h2>
                <p>{data?.Decsription}</p>
                <div className="contact-address">
                  {data?.Contact_Detail_Grid &&
                    data?.Contact_Detail_Grid?.map((item, index) => {
                      return (
                        <p key={index}>
                          <span className="icon">
                            <Image
                              src={`${BACKEND_URL}${item?.Image?.url}`}
                              alt=""
                              width={24}
                              height={24}
                            />
                          </span>
                          {item.label && item.label}
                          {item.Grid_Section ? (
                            <span>
                              {item?.Grid_Section &&
                                item?.Grid_Section?.map(
                                  (item_detail, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Link
                                          href={
                                            item_detail?.Value
                                              ? item_detail?.Value
                                              : "/"
                                          }
                                        >
                                          {item_detail?.Title}
                                        </Link>
                                        <br />
                                      </React.Fragment>
                                    );
                                  }
                                )}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {data?.Experience_Grid &&
            data?.Experience_Grid?.map((data, index) => {
              return (
                <div className="row align-items-center bottom-55" key={index}>
                  <div className="col-12">
                    <h2 className="title mb-3">{data?.Title}</h2>
                  </div>
                  <div className="col-12 col-md-6 pe-md-5">
                    <div className="experience-skill-content">
                      {data?.Description &&
                        data?.Description?.map((data, index) => {
                          return <p key={index}>{data?.Description}</p>;
                        })}

                      <ul className="ul-list">
                        {data?.Point_List_Grid &&
                          data?.Point_List_Grid?.map((label, index) => {
                            return <li key={index}>{label?.Title}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 ps-md-5">
                    <div className="skill-progress">
                      {data?.Skill_Grid &&
                        data?.Skill_Grid?.map((item, index) => {
                          const Percentage = parseInt(item?.Value);
                          return (
                            <div className="progress-list" key={index}>
                              <div className="progress-title">
                                <h5>{item?.Title}</h5>
                                <span className="progress-count">
                                  {item?.Value}
                                </span>
                              </div>
                              <div
                                className="progress"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: Percentage + "%" }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="row align-items-center">
            <div className="col-12">
              <div className="qualification-experience-content">
                <h2 className="title">{data?.Detail_Grid_Section?.Title}</h2>
                {data?.Detail_Grid_Section?.Description_Grid &&
                  data?.Detail_Grid_Section?.Description_Grid?.map(
                    (label, index) => {
                      return <p key={index}>{label?.Description}</p>;
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleTeamPage;
