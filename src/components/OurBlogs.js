import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import { useEffect, useState } from "react";
import SingleBlogGrid from "./SingleBlogGrid";
import ReactPaginate from "react-paginate";
import BlogGrid from "./BlogGrid";
import contentConfig from "@/config/contentConfig";
import Link from "next/link";
import Image from "next/image";
import SidebarSetting from "./SidebarSetting";

const OurBlogs = ({ data, slug }) => {
  const [blog, setBlog] = useState(null);
  const [blogGrid, setBlogGrid] = useState(null);

  const items = blogGrid && blogGrid;

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setBlog(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogs();
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

  function Items({ currentItems, type }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => {
            switch (type) {
              case "Blog_Grid_one":
                return (
                  <div className="col-12 col-md-4" key={index}>
                    <SingleBlogGrid data={item} />
                  </div>
                );
              case "Blog_Grid_Two":
                return (
                  <div className="col-12 col-md-6" key={index}>
                    <BlogGrid data={item} />
                  </div>
                );
              case "Blog_Grid_Three":
                return (
                  <div className="blog-grid-style-3 blog-full-grig" key={index}>
                    <div className="blog-img">
                      <Link href={`blog/${item?.Slug}`}>
                        <Image
                          src={`${BACKEND_URL}${item?.Image?.url}`}
                          alt=""
                          width={823}
                          height={411}
                        />
                      </Link>
                    </div>
                    <div className="blog-info">
                      <div className="blog-admin-info">
                        <div className="blog-date">
                          {item?.createdAtFormatted}
                        </div>
                      </div>
                      <h6>
                        <Link href={`blog/${item?.Slug}`}>{item?.Title}</Link>
                      </h6>
                      <p>{item?.Short_Description}</p>
                      <Link
                        href={`blog/${item?.Slug}`}
                        className="btn btn-primary"
                      >
                        {contentConfig.READ_MORE}
                      </Link>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage, type }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items?.length;
      setItemOffset(newOffset);
      scrollTo(0, 0);
    };

    return (
      <>
        {/* active it on blog grid one and two */}
        <div className="row">
          <Items currentItems={currentItems} type={type} />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pagination-part">
              <nav aria-label="Page navigation example">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="Prev"
                  renderOnZeroPageCount={null}
                  pageClassName="page-item"
                  className="pagination justify-content-center"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                />
              </nav>
            </div>
          </div>
        </div>

      </>
    );
  }

  if (blog?.Type === "Blog_Grid_one" || blog?.Type === "Blog_Grid_Two") {
    return (
      <section className="blog-grid-section blog-grid-page inner-wrapper">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-12 col-md-6">
              <div className="section-heading inner-heading">
                <h5 className="sub-title">{blog?.Title}</h5>
                <h2 className="title">{blog?.Sub_Title}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="section-heading-des">
                <p>{blog?.Description}</p>
              </div>
            </div>
          </div>

          <PaginatedItems
            itemsPerPage={parseInt(blog?.Per_Page_Limit)}
            type={blog?.Type}
          />
        </div>
      </section>
    );
  } else if (blog?.Type === "Blog_Grid_Three") {
    return (
      <section className="blog-grid-section blog-grid-page inner-wrapper">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-12 col-md-6">
              <div className="section-heading inner-heading">
                <h5 className="sub-title">{blog?.Title}</h5>
                <h2 className="title">{blog?.Sub_Title}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="section-heading-des">
                <p>{blog?.Description}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <PaginatedItems
              itemsPerPage={parseInt(blog?.Per_Page_Limit)}
              type={blog?.Type}
            />
            <div className="col-12 col-md-4 ps-lg-5">
              <SidebarSetting />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default OurBlogs;

// main change for paginated items
