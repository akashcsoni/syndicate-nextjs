import { fetchStrapiPage } from "@/utils/Api";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import PageData from "./[slug]/pagedata";
import PreLoader from "@/components/PreLoader";
import ServerError from "@/components/ServerError";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  try {
    const data = await fetchStrapiPage(themeConfig.api.page_component_url, {
      slug: "home",
    });
    const pageData = data?.data?.Seo_Meta;

    return {
      title: pageData?.metaTitle || "Home-Page Title",
      description: pageData?.metaDescription || "Default Description",
      icons: {
        icon: "/favicon.ico",
      },
      openGraph: {
        images: pageData?.shareImage
          ? [
              {
                url: `${BACKEND_URL}${pageData.shareImage.url}`,
                secureUrl: `${BACKEND_URL}${pageData.shareImage.url}`,
                width: 1200,
                height: 630,
                alt: "Preview Image for home",
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error?.message || error);
    return {
      title: "Server not responding",
      description: "Please start the backend server.",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default async function Page() {
  let data;
  try {
    data = await fetchStrapiPage(themeConfig.api.page_component_url, {
      slug: "home",
    });
  } catch (error) {
    console.error("Page data fetch error:", error?.message || error);
  }

  if (!data || !data.data) {
    return <ServerError />;
  }

  const pageData = data.data;

  return (
    <>
      <PreLoader />
      <PageData data={pageData} slug={"home"} />
    </>
  );
}
