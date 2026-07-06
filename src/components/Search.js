"use client";

import themeConfig from "@/config/themeConfig";
import { getData } from "@/utils/Api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SingleBlogGrid from "./SingleBlogGrid";
import BlogGrid from "./BlogGrid";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [blogGrid, setBlogGrid] = useState(null);

  useEffect(() => {
    const getBlogGrid = async () => {
      try {
        const data = await getData(
          `${themeConfig.api.filtered_article_url}${query}`
        );
        setBlogGrid(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        getBlogGrid();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <section className="contact-page inner-wrapper">
      <h2>Search :{query ? query : "No search blog"}</h2>
      <section className="blog-grid-section blog-grid-page inner-wrapper">
        <div className="container">
          {blogGrid &&
            blogGrid.map((data, index) => {
              return (
                <div className="col-12 col-md-4" key={index}>
                  <SingleBlogGrid data={data} />
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
};

export default Search;
