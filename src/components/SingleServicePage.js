"use client";

import themeConfig from "@/config/themeConfig";
import { getData } from "@/utils/Api";
import { useEffect, useState } from "react";
import ServiceGrid from "./ServiceGrid";

// Utility: Capitalize dashed/underscored names
const capitalize = (str) =>
  str
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

export default function PageData({ data, slug }) {
  const [components, setComponents] = useState({});

  const [filteredService, setFilteredService] = useState([]);
  console.log(filteredService, "filteredService");

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
          setFilteredService([]);
          return;
        }

        // Filter out current article
        const filteredArticles = matchedCategory.services?.filter(
          (article) => article?.Slug !== currentPage
        );

        setFilteredService(filteredArticles);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, [category, currentPage]);

  useEffect(() => {
    const loadComponents = async () => {
      const loaded = {};

      await Promise.all(
        data?.blocks?.map(async (block) => {
          try {
            const rawName =
              block?.__component?.split(".")[1] || block?.name || "";

            const name = capitalize(rawName.toLowerCase());
            const mod = await import(`@/components/${name}`);
            loaded[rawName] = mod.default;
          } catch (err) {
            console.warn(
              `Could not load component: ${block?.__component}`,
              err
            );
          }
        })
      );

      setComponents(loaded);
    };

    loadComponents();
  }, [data]);

  return (
    <>
      {data?.blocks?.map((block, index) => {
        const rawName = block?.__component?.split(".")[1] || block?.name;
        const Component = components[rawName];
        if (!Component) return null;
        return <Component key={index} data={block} slug={slug} />;
      })}

      <section className="related-services-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="related-services-wrap">
                <div className="row">
                  <div className="col-12">
                    <div className="section-heading">
                      <h2 className="title">Related services</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {filteredService &&
                    filteredService?.slice(0, 3)?.map((item, index) => {
                      return (
                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                          <ServiceGrid data={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// # email = syndicate.strapi@webbycrown.com
// # password = ofQK?087=0L£
