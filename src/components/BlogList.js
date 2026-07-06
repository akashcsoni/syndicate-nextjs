import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlogGrid from "./BlogGrid";
import SingleBlogGrid from "./SingleBlogGrid";
import FeatureBlogGrid from "./FeatureBlogGrid";
import Image from "next/image";

const BlogList = ({ data, slug }) => {
  const [blogList, setBlogList] = useState(null);
  const [blogGrid, setBlogGrid] = useState(null);
  

  useEffect(() => {
    const getBlogList = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setBlogList(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogList();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const getBlogGrid = async () => {
      try {
        const data = await getData(themeConfig.api.article_url);
        setBlogGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogGrid();
  }, []);

  const limit = Number(blogList?.Per_Page_Limit);

  const [visibleCount, setVisibleCount] = useState(limit);
  +useEffect(() => {
    if (!isNaN(limit)) {
      setVisibleCount(limit);
    }
  }, [limit]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (blogList?.Type === "MultiGrid") {
    return (
      <section className="blog-articles-section-style-3">
        <div className="container">
          <div className="row align-items-end mb-4 mb-sm-5">
            <div className="col-12 col-md-8">
              <div className="section-heading bottom-55">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {blogList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {blogList?.Sub_Title}
                </h2>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="read-more-right">
                {blogList?.Button_Link && (
                  <Link
                    href={blogList?.Button_Link}
                    className="btn btn-primary"
                  >
                    {blogList?.Button_Name}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {blogGrid &&
              blogGrid?.slice(0, 4)?.map((item, index) => {
                return (
                  <div className="col-12 col-md-6" key={index}>
                    <BlogGrid data={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else if (blogList?.Type === "SingleGrid") {
    return (
      <section className="blog-articles-section">
        <div className="container">
          <div className="row align-items-end mb-4 mb-sm-5">
            <div className="col-12 col-md-8">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {blogList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {blogList?.Sub_Title}
                </h2>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="read-more-right">
                {blogList?.Button_Link && (
                  <Link
                    href={blogList?.Button_Link}
                    className="btn btn-primary"
                  >
                    {blogList?.Button_Name}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {blogGrid &&
              blogGrid.slice(0, visibleCount).map((item, index) => (
                <div className="col-12 col-md-4" key={index}>
                  <SingleBlogGrid data={item} />
                </div>
              ))}

            {visibleCount < blogGrid?.length && (
              <div className="col-12">
                <div className="read-more-bottom">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="btn btn-secondary btn-style-3"
                  >
                    Load more{" "}
                    <Image
                      src="/assets/images/loader.svg"
                      alt="loader"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } else if (blogList?.Type === "FeatureGrid") {
    return (
      <section className="blog-posts-section-style-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {blogList?.Title}
                </h5>
                <h2
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {blogList?.Sub_Title}
                </h2>
              </div>
            </div>
          </div>

          <div className="row row-custome">
            {blogGrid &&
              blogGrid?.slice(0, 3)?.map((item, index) => {
                let class_name = "col-md-4";
                if (index === 0) {
                  class_name = "col-md-6";
                }
                return (
                  <div className={`col-12 ${class_name}`} key={index}>
                    <FeatureBlogGrid data={item} count={index} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
};

export default BlogList;
