export const FRONTEND_URL = "https://syndicate-nextjs-strapi.vercel.app";
export const BACKEND_URL = "https://syndicate-strapi.webbydemo.in";

const themeConfig = {
  apiToken:
    "58217882d2b92f57af1f703c82a8688db6507886b038daef37d8eab5be73f12d03059e3addbff753f92083770f8b7207f5ffbc3e0f18913b75b91a58c241fb657c843434eff2e8885f51471f5c106fdfd1fdb02088fcec64cd33f4859c0bde609178a6c9cf6c366763fdeb18339bafd32f0f31f7648073ef4c4b783948730280",
  organization_name: "Syndicate Business Advisory",
  organization_linkedin: "https://www.linkedin.com/",
  organization_youtube: "https://www.youtube.com/",
  organization_x: "https://x.com/",
  organization_instagram: "https://www.instagram.com/",
  organization_medium: "https://medium.com/",
  organization_facebook: "https://www.facebook.com/",

  api: {
    page_component_url: `${BACKEND_URL}/api/pages/component`,
    subscribes_url: `${BACKEND_URL}/api/subscribes`,
    subscribe_url: `${BACKEND_URL}/api/subscribe-newsletter`,
    newsletter_url: `${BACKEND_URL}/api/subscriptions`,
    cookie_url: `${BACKEND_URL}/api/cookie`,
    page_block_url: `${BACKEND_URL}/api/pages/block`,
    footer_url: `${BACKEND_URL}/api/footer?populate=*`,
    header_url: `${BACKEND_URL}/api/header?populate=*`,
    service_url: `${BACKEND_URL}/api/services?populate=*&sort=createdAt:desc`,
    article_url: `${BACKEND_URL}/api/articles?populate=*&sort=createdAt:desc`,
    team_url: `${BACKEND_URL}/api/teams?populate=*`,
    case_studies_url: `${BACKEND_URL}/api/case-studies?populate=*`,
    categories_url: `${BACKEND_URL}/api/categories?populate=*`,
    portfolio_url: `${BACKEND_URL}/api/portfolios?populate=*`,
    contact_url: `${BACKEND_URL}/api/contact-uses?populate=*`,
    enquirey_url: `${BACKEND_URL}/api/enquiry-forms?populate=*`,
    filtered_article_url: `${BACKEND_URL}/api/articles?populate=*&sort=createdAt:desc&filters[Title][$containsi]=`,
  },
};

export default themeConfig;
