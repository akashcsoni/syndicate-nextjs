import SingleBlogPage from "@/components/SingleBlogPage";
import SingleCaseStudiePage from "@/components/SingleCaseStudiePage";
import SinglePortfolioPage from "@/components/SinglePortfolioPage";
import SingleServicePage from "@/components/SingleServicePage";
import SingleTeamPage from "@/components/SingleTeamPage";

const CollectionConfig = [
  {
    type: "service",
    apiPath: "services",
    componentName: SingleServicePage,
  },
  {
    type: "team",
    apiPath: "teams",
    componentName: SingleTeamPage,
  },
  {
    type: "blog",
    apiPath: "articles",
    componentName: SingleBlogPage,
  },
  {
    type: "case-studie",
    apiPath: "case-studies",
    componentName: SingleCaseStudiePage,
  },
  {
    type: "portfolio",
    apiPath: "portfolios",
    componentName: SinglePortfolioPage,
  },
  
];

export default CollectionConfig;
