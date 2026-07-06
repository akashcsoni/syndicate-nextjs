"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SidebarSetting = () => {
  const [blogGrid, setBlogGrid] = useState(null);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getBlogGrid = async () => {
      try {
        const url =
          searchQuery && searchQuery.trim()
            ? `${themeConfig.api.filtered_article_url}${searchQuery}`
            : themeConfig.api.article_url;
        const data = await getData(url);
        setBlogGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const debounce = setTimeout(() => {
      getBlogGrid();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await getData(themeConfig.api.categories_url);
        setCategory(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="widget search">
        <h5 className="widget-title">Search</h5>
        <div className="search-form-box">
          <div className="search-form" id="search-form">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="widget recent-blogs">
        <h5 className="widget-title">Recent blogs</h5>
        <div className="recent-blogs-list">
          {/* blog grid */}
          {blogGrid &&
            blogGrid?.slice(0, 5)?.map((data, index) => {
              return (
                <div className="recent-post-single" key={index}>
                  <div className="recent-post-img">
                    <Image
                      src={`${BACKEND_URL}${data?.Image?.url}`}
                      alt="thumb"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="recent-post-bio">
                    <h6>
                      <Link href="blog-detail">{data?.Title}</Link>
                    </h6>
                    <span>{data?.createdAtFormatted}</span>
                  </div>
                </div>
              );
            })}

          {/* blog grid */}
        </div>
      </div>

      <div className="widget category">
        <h5 className="widget-title">Categories</h5>
        <ul className="category-list">
          {/* categories grid */}
          {category &&
            category?.slice(0, 5)?.map((data, index) => {
              const articleCount = data?.articles?.length || 0;
              return (
                <li key={index}>
                  <Link href="#">
                    {data?.Name} <span>{articleCount}</span>
                  </Link>
                </li>
              );
            })}
          {/* categories grid */}
        </ul>
      </div>

      <div className="widget sidebar-tag">
        <h5 className="widget-title">Popular Tags</h5>
        <div className="tag-list">
          {category &&
            category.map((data, index) => {
              return (
                <Link href="#" key={index}>
                  {data?.Name}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SidebarSetting;

// "use client";

// import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
// import { getData } from "@/utils/Api";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const SidebarSetting = () => {
//   const [blogGrid, setBlogGrid] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchBlogs = async (query = "") => {
//     try {
//       const encodedQuery = encodeURIComponent(query.trim());
//       const url =
//         query && query.trim()
//           ? `${themeConfig.api.filtered_article_url}${encodedQuery}`
//           : themeConfig.api.article_url;

//       const data = await getData(url);
//       setBlogGrid(data?.data || []);
//     } catch (error) {
//       console.error("Blog fetch failed:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(); // fetch all initially
//   }, []);

//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       fetchBlogs(searchQuery);
//     }, 500);
//     return () => clearTimeout(debounce);
//   }, [searchQuery]);

//   useEffect(() => {
//     const getCategory = async () => {
//       try {
//         const data = await getData(themeConfig.api.categories_url);
//         setCategory(data?.data || []);
//       } catch (error) {
//         console.error("Category fetch failed:", error);
//       }
//     };
//     getCategory();
//   }, []);

//   return (
//     <div className="sidebar">
//       {/* Search */}
//       <div className="widget search">
//         <h5 className="widget-title">Search</h5>
//         <div className="search-form-box">
//           <div className="search-form" id="search-form">
//             <input
//               type="text"
//               className="form-control"
//               name="search"
//               placeholder="Search Here..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit">
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Recent Blogs */}
//       <div className="widget recent-blogs">
//         <h5 className="widget-title">Recent blogs</h5>
//         <div className="recent-blogs-list">
//           {blogGrid?.map((data, index) => (
//             <div className="recent-post-single" key={index}>
//               <div className="recent-post-img">
//                 <Image
//                   src={`${BACKEND_URL}${data?.Image?.url}`}
//                   alt="thumb"
//                   width={56}
//                   height={56}
//                 />
//               </div>
//               <div className="recent-post-bio">
//                 <h6>
//                   <Link href={`/blog-detail/${data?.Slug}`}>{data?.Title}</Link>
//                 </h6>
//                 <span>{data?.createdAtFormatted}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="widget category">
//         <h5 className="widget-title">Categories</h5>
//         <ul className="category-list">
//           {category?.map((data, index) => {
//             const articleCount = data?.articles?.length || 0;
//             return (
//               <li key={index}>
//                 <Link href="#">
//                   {data?.Name} <span>{articleCount}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Popular Tags */}
//       <div className="widget sidebar-tag">
//         <h5 className="widget-title">Popular Tags</h5>
//         <div className="tag-list">
//           {category?.map((data, index) => (
//             <Link href="#" key={index}>
//               {data?.Name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarSetting;
