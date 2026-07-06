// import themeConfig from "@/config/themeConfig";
// import { fetchStrapiPage, getData } from "@/utils/Api";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import PortfolioGrid from "./PortfolioGrid";
// import imagesLoaded from "imagesloaded";
// import contentConfig from "@/config/contentConfig";

// let Isotope;
// if (typeof window !== "undefined") {
//   Isotope = require("isotope-layout");
// }

// // Helper to safely convert category names to CSS class names
// const formatCategory = (name) =>
//   name
//     ?.toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-_]/g, "");

// const PortfolioList = ({ data, slug }) => {
//   const [Active, setActive] = useState("All");

//   const [portfolio, setPortfolio] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [portfolioGrid, setPortfolioGrid] = useState(null);
//   const isotope = useRef(null);

//   useEffect(() => {
//     const getPortfolio = async () => {
//       try {
//         const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
//           slug: slug,
//           block: data?.name,
//           id: data?.id,
//         });
//         setPortfolio(resdata?.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getPortfolio();
//   }, []);

//   useEffect(() => {
//     const getCategory = async () => {
//       try {
//         const data = await getData(themeConfig.api.categories_url);
//         setCategory(data?.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCategory();
//   }, []);

//   useEffect(() => {
//     const getPortfolioGrid = async () => {
//       try {
//         const data = await getData(themeConfig.api.portfolio_url);
//         setPortfolioGrid(data?.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getPortfolioGrid();
//   }, []);

//   // Initialize Isotope after images load
//   useEffect(() => {
//     const grid = document.querySelector(".grid");
//     if (grid) {
//       imagesLoaded(grid, () => {
//         isotope.current = new Isotope(grid, {
//           itemSelector: ".grid-item",
//           layoutMode: "fitRows",
//         });
//       });
//     }
//     return () => isotope.current?.destroy();
//   }, [portfolioGrid]);

//   useEffect(() => {
//     if (isotope.current) {
//       if (Active === "All") {
//         isotope.current.arrange({ filter: "*" });
//       } else {
//         isotope.current.arrange({ filter: `.${formatCategory(Active)}` });
//       }
//     }
//   }, [Active]);

//   return (
//     <section className="our-recent-projects-section projects-style-2 inner-wrapper">
//       <div className="container">
//         <div className="row mb-5 align-items-end">
//           <div className="col-12 col-md-6">
//             <div className="section-heading inner-heading">
//               <h5 className="sub-title">{portfolio?.Title}</h5>
//               <h2 className="title">{portfolio?.Sub_Title}</h2>
//             </div>
//           </div>
//           <div className="col-12 col-md-6">
//             <div className="section-heading-des">
//               <p>{portfolio?.Description}</p>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-12">
//             <div className="recent-projects-gallery">
//               <ul className="button-tabs-list button-group" id="filters">
//                 {["All", ...(category || [])].map((list, index) => {
//                   const rawName = typeof list === "string" ? list : list?.Name;
//                   const isActive = Active === rawName;
//                   const filterClass =
//                     rawName === "All" ? "*" : `.${formatCategory(rawName)}`;

//                   return (
//                     <li
//                       className={`button-tab-link ${
//                         isActive ? " current is-checked" : ""
//                       }`}
//                       data-filter={filterClass}
//                       key={index}
//                       onClick={() => setActive(rawName)}
//                     >
//                       {rawName}
//                     </li>
//                   );
//                 })}
//               </ul>

//               <div className="gallery-list">
//                 <div className="row grid">
//                   {portfolioGrid &&
//                     portfolioGrid.map((list, index) => (
//                       <div
//                         key={index}
//                         className={`col-6 col-sm-6 col-md-4 col-lg-3 grid-item ${formatCategory(
//                           list?.category?.Name
//                         )}`}
//                       >
//                         <PortfolioGrid data={list} />
//                       </div>
//                     ))}
//                 </div>
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="read-more-bottom">
//                       <Link href="#" className="btn btn-secondary btn-style-3">
//                         Load more{" "}
//                         <Image
//                           src={contentConfig?.LOADER_IMAGE?.IMAGE}
//                           alt="loader"
//                           width={28}
//                           height={28}
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PortfolioList;

import themeConfig from "@/config/themeConfig";
import { fetchStrapiPage, getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PortfolioGrid from "./PortfolioGrid";
import imagesLoaded from "imagesloaded";
import contentConfig from "@/config/contentConfig";

let Isotope;
if (typeof window !== "undefined") {
  Isotope = require("isotope-layout");
}

// format category for isotope class
const formatCategory = (name) =>
  name
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

const ITEMS_PER_LOAD = 2;

const PortfolioList = ({ data, slug }) => {
  const [Active, setActive] = useState("All");

  const [portfolio, setPortfolio] = useState(null);
  const [category, setCategory] = useState([]);
  const [portfolioGrid, setPortfolioGrid] = useState([]);

  // 🔥 important states
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);

  const isotope = useRef(null);
  const gridRef = useRef(null);

  /* ---------------- Fetch Data ---------------- */

  useEffect(() => {
    const getPortfolio = async () => {
      const res = await fetchStrapiPage(themeConfig.api.page_block_url, {
        slug,
        block: data?.name,
        id: data?.id,
      });
      setPortfolio(res?.data);
    };
    getPortfolio();
  }, [slug, data?.id, data?.name]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await getData(themeConfig.api.categories_url);
      setCategory(res?.data || []);
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getPortfolioGrid = async () => {
      const res = await getData(themeConfig.api.portfolio_url);
      setPortfolioGrid(res?.data || []);
    };
    getPortfolioGrid();
  }, []);

  /* ---------------- Initial Items ---------------- */

  useEffect(() => {
    if (portfolioGrid.length) {
      setVisibleItems(portfolioGrid.slice(0, ITEMS_PER_LOAD));
    }
  }, [portfolioGrid]);

  /* ---------------- Isotope Init ---------------- */

  useEffect(() => {
    if (!gridRef.current) return;

    imagesLoaded(gridRef.current, () => {
      isotope.current = new Isotope(gridRef.current, {
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
      });
    });

    return () => isotope.current?.destroy();
  }, []);

  /* ---------------- Filter ---------------- */

  useEffect(() => {
    if (!isotope.current) return;

    if (Active === "All") {
      isotope.current.arrange({ filter: "*" });
    } else {
      isotope.current.arrange({
        filter: `.${formatCategory(Active)}`,
      });
    }
  }, [Active]);

  /* ---------------- Load More ---------------- */

  const loadMore = () => {
    const nextPage = page + 1;
    const nextItems = portfolioGrid.slice(0, nextPage * ITEMS_PER_LOAD);

    setPage(nextPage);
    setVisibleItems(nextItems);

    // 🔥 tell isotope new items added
    setTimeout(() => {
      isotope.current?.reloadItems();
      isotope.current?.arrange();
    }, 50);
  };

  const hasMore = visibleItems.length < portfolioGrid.length;

  /* ---------------- Render ---------------- */

  return (
    <section className="our-recent-projects-section projects-style-2 inner-wrapper">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-12 col-md-6">
            <div className="section-heading inner-heading">
              <h5 className="sub-title">{portfolio?.Title}</h5>
              <h2 className="title">{portfolio?.Sub_Title}</h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="section-heading-des">
              <p>{portfolio?.Description}</p>
            </div>
          </div>
        </div>

        <div className="recent-projects-gallery">
          {/* Filters */}
          <ul className="button-tabs-list button-group">
            {["All", ...category].map((item, index) => {
              const name = typeof item === "string" ? item : item?.Name;
              return (
                <li
                  key={index}
                  className={`button-tab-link ${
                    Active === name ? "current is-checked" : ""
                  }`}
                  onClick={() => setActive(name)}
                >
                  {name}
                </li>
              );
            })}
          </ul>

          {/* Grid */}
          <div className="row grid" ref={gridRef}>
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className={`col-6 col-sm-6 col-md-4 col-lg-3 grid-item ${formatCategory(
                  item?.category?.Name
                )}`}
              >
                <PortfolioGrid data={item} />
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="row">
              <div className="col-12">
                <div className="read-more-bottom">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="btn btn-secondary btn-style-3"
                  >
                    Load more{" "}
                    <Image
                      src={contentConfig?.LOADER_IMAGE?.IMAGE}
                      alt="loader"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioList;
