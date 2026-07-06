import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { fetchStrapiPage } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BrandingImage = ({ data, slug }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setImage(resdata?.data);
      } catch (err) {
        setImage(null);
      }
    };

    getHeroData(); // ✅ calling inside useEffect
  }, [slug, data?.id, data?.name]);
  return (
    <section className="logos-section-style-3">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="logos-gallery">
              {image?.Image &&
                image?.Image.map((item, index) => {
                  return (
                    <div className="logos-box" key={index}>
                      <Link href="/">
                        <Image
                          src={`${BACKEND_URL}${item?.url}`}
                          alt=""
                          width="168"
                          height="71"
                        />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingImage;
