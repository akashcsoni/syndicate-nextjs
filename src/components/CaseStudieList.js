import contentConfig from "@/config/contentConfig";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const CaseStudieList = ({ data, slug }) => {
  const [caseStudie, setCaseStudie] = useState(null);
  const [caseStudieGrid, setCaseStudieGrid] = useState(null);

  const items = caseStudieGrid && caseStudieGrid;

  useEffect(() => {
    const getCaseStudieList = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setCaseStudie(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCaseStudieList();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const getCaseStudieGrid = async () => {
      try {
        const data = await getData(themeConfig.api.case_studies_url);
        setCaseStudieGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCaseStudieGrid();
  }, []);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => {
            return (
              <div className="blog-grid-style-3 case-study" key={index}>
                <div className="blog-img">
                  <Link href={`case-studie/${item?.Slug}`}>
                    {item?.Image?.url && (
                      <Image
                        src={`${BACKEND_URL}${item?.Image?.url}`}
                        alt=""
                        width={576}
                        height={461}
                      />
                    )}
                  </Link>
                </div>
                <div className="blog-info">
                  <div className="blog-date">{item?.createdAtFormatted}</div>
                  <h6>
                    <Link href={`case-studie/${item?.Slug}`}>
                      {item?.Title}
                    </Link>
                  </h6>
                  <p>{item?.Short_Description}</p>
                  <Link
                    href={`case-studie/${item?.Slug}`}
                    className="btn btn-secondary"
                  >
                    {contentConfig.READ_MORE}
                  </Link>
                </div>
              </div>
            );
          })}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
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
        <div className="row">
          <div className="col-12">
            <Items currentItems={currentItems} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pagination-part">
              <nav aria-label="Page navigation example">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
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

  return (
    <section className="blog-grid-section blog-grid-page inner-wrapper">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-12 col-md-6">
            <div className="section-heading inner-heading">
              <h2 className="title">{caseStudie?.Title}</h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="section-heading-des">
              <p>{caseStudie?.Description}</p>
            </div>
          </div>
        </div>
        <PaginatedItems itemsPerPage={parseInt(caseStudie?.Per_Page_Limit)} />
      </div>
    </section>
  );
};

export default CaseStudieList;
