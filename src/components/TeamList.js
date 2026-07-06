import contentConfig from "@/config/contentConfig";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TeamGrid from "./TeamGrid";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlobalIcon } from "@/config/GlobalIcon";

const TeamList = ({ data, slug }) => {
  const [teamList, setTeamList] = useState(null);
  console.log("team data", teamList);
  const [teamGrid, setTeamGrid] = useState(null);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setTeamList(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTestimonial();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const getServiceGrid = async () => {
      try {
        const data = await getData(themeConfig.api.team_url);
        setTeamGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServiceGrid();
  }, []);

  const incrementInitialPostList = 3;
  const [displayPosts, setDisplayPosts] = useState(0);

  useEffect(() => {
    if (teamList?.Per_Page_Limit) {
      setDisplayPosts(parseInt(teamList.Per_Page_Limit));
    }
  }, [teamList]);

  const loadMore = () => {
    setDisplayPosts(displayPosts + incrementInitialPostList);
  };

  if (teamList?.Type === "Swipper") {
    return (
      <section className="team-members-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading bottom-55 heading-style-2">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {teamList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {teamList?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="our-team-members-slider">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  loop={true}
                  navigation={{
                    nextEl: ".our-team-members-slider .swiper-button-next",
                    prevEl: ".our-team-members-slider .swiper-button-prev",
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    1199: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {teamGrid &&
                    teamGrid?.map((data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="team-members-box">
                            <div className="team-members-img">
                              <Link href={`team/${data?.Slug}`}>
                                <Image
                                  src={`${BACKEND_URL}${data?.Image?.url}`}
                                  alt=""
                                  width="293"
                                  height="234"
                                />
                              </Link>
                            </div>

                            <div className="team-members-info">
                              <span className="founder">{data.Position}</span>
                              <h6>
                                <Link href={`team/${data?.Slug}`}>
                                  {data?.Name}
                                </Link>
                              </h6>
                              <p>{data?.Short_Description}</p>

                              <ul className="social-link">
                                {contentConfig?.Team_Icon &&
                                  contentConfig?.Team_Icon?.map(
                                    (icon, index) => {
                                      return (
                                        <li key={index}>
                                          <Link href={icon?.link}>
                                            <GlobalIcon name={icon?.name} />
                                          </Link>
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="team-members-section our-twam-page inner-wrapper">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-12 col-md-6">
              <div className="section-heading inner-heading">
                <h5 className="sub-title">{teamList?.Title}</h5>
                <h2 className="title">{teamList?.Sub_Title}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="section-heading-des">
                <p>{teamList?.Description}</p>
              </div>
            </div>
          </div>

          <div className="row">
            {teamGrid &&
              teamGrid?.slice(0, displayPosts)?.map((item, index) => {
                return (
                  <div className="col-12 col-sm-6 col-md-4" key={index}>
                    <TeamGrid data={item} />
                  </div>
                );
              })}
          </div>

          {teamGrid && displayPosts < teamGrid.length && (
            <div className="row">
              <div className="col-12">
                <div className="read-more-bottom">
                  <Link
                    href="#"
                    className="btn btn-secondary btn-style-3"
                    onClick={(e) => {
                      e.preventDefault();
                      loadMore();
                    }}
                  >
                    {contentConfig.LEARN_MORE}{" "}
                    <Image
                      src="/assets/images/loader.svg"
                      alt="loader"
                      width={28}
                      height={28}
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default TeamList;
