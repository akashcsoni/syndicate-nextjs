import contentConfig from "@/config/contentConfig";
import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const ServiceGridThree = ({ data }) => {
  return (
    <div className="what-we-do-service">
      <div className="circle-icon">
        <span>
          {data?.Feature_Image?.url && (
            <Image
              src={`${BACKEND_URL}${data?.Feature_Image?.url}`}
              alt=""
              width={46}
              height={46}
            />
          )}
        </span>
      </div>
      <h6>{data?.Title}</h6>
      <p>{data?.Short_Description}</p>
      <Link
        href={`service/${data?.Slug}`}
        className="btn btn-primary btn-style-2"
      >
        {contentConfig.READ_MORE}
      </Link>
    </div>
  );
};

export default ServiceGridThree;
