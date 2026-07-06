import contentConfig from "@/config/contentConfig";
import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const PortfolioGrid = ({ data }) => {
  return (
    <div className="projects-gallery-box">
      <div className="projects-gallery-img">
        <Image
          src={`${BACKEND_URL}${data?.Image?.url}`}
          alt=""
          width={294}
          height={294}
        />
      </div>
      <div className="projects-gallery-hover">
        <Link href={`portfolio/${data?.Slug}`}>
          <span className="icon">
            <Image
              src={contentConfig.ARROW_BTN.IMAGE}
              alt={contentConfig.ARROW_BTN.ALT}
              width={contentConfig.ARROW_BTN.WIDTH}
              height={contentConfig.ARROW_BTN.HEIGHT}
            />
          </span>
          {data.Title}
        </Link> 
      </div>
    </div>
  );
};

export default PortfolioGrid;
