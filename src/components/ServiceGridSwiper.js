import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const ServiceGridSwiper = ({ data }) => {
  return (
    <div className="why-choose-us-grid-style-3">
      <div className="why-choose-image">
        <Link href={`service/${data?.Slug}`}>
          {data?.Image?.url && (
            <Image
              src={`${BACKEND_URL}${data?.Image?.url}`}
              alt=""
              width={368}
              height={239}
            />
          )}
        </Link>
      </div>
      <div className="why-choose-info">
        <div className="circle-icon">
          <span>
            {data?.Feature_Image?.url && (
              <Image
                src={`${BACKEND_URL}${data?.Feature_Image?.url}`}
                alt=""
                width={40}
                height={41}
              />
            )}
          </span>
        </div>

        <h4>
          <Link href={`service/${data?.Slug}`}>{data?.Title}</Link>
        </h4>
        <p>{data?.Short_Description}</p>
      </div>
    </div>
  );
};

export default ServiceGridSwiper;
