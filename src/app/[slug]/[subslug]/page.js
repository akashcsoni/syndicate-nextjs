import PreLoader from "@/components/PreLoader";
import CollectionConfig from "@/config/collectionConfig";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { getData } from "@/utils/Api"; // assuming this is where getData is defined
import { permanentRedirect } from "next/navigation";

/* ------------------ SEO METADATA ------------------ */
export async function generateMetadata({ params }) {
  const { slug, subslug } = params;

  const pageInfo = await getSubCollectionPage(slug, subslug);

  if (!pageInfo?.data?.SEO) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const data = pageInfo?.data?.SEO;

  return {
    title: data?.metaTitle || data?.metaTitle || "Default Title",
    description:
      data?.metaDescription || data?.metaDescription || "Default description",

    keywords: data?.SEO_Keywords || "",

    openGraph: {
      title: data?.metaTitle || data?.metaTitle,
      description: data?.metaDescription || data?.metaDescription || "",
      url: `${themeConfig.FRONTEND_URL}/${slug}/${subslug}`,
      images: data?.shareImage?.url
        ? [
            {
              url: `${BACKEND_URL}${data?.shareImage?.url}`,
              width: 1200,
              height: 630,
              alt: data?.metaTitle,
            },
          ]
        : [],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: data?.metaTitle || data?.Title,
      description: data?.metaDescription || data?.Short_Description || "",
      images: data?.shareImage?.url
        ? [`${BACKEND_URL}${data?.shareImage?.url}`]
        : [],
    },
  };
}

export default async function SubPage({ params }) {
  const { slug, subslug } = params;

  const pageInfo = await getSubCollectionPage(slug, subslug);

  if (!pageInfo) {
    return permanentRedirect("/error");
  }

  const PageComponent = pageInfo.componentName;

  return (
    <>
      <PreLoader />
      <PageComponent data={pageInfo.data} slug={subslug} />
    </>
  );
}

async function getSubCollectionPage(slug, subslug) {
  try {
    for (const config of CollectionConfig) {
      if (config.type === slug) {
        const apiUrl = `${BACKEND_URL}/api/${config.apiPath}/${subslug}`;
        const response = await getData(apiUrl);

        if (response?.data) {
          return {
            data: response.data,
            componentName: config.componentName,
          };
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch sub collection page:", error);
    return null;
  }
}
