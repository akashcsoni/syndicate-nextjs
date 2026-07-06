import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const ServiceGrid = ({ data }) => {
  console.log(data, "this is for data");

  return (
    // <div className="what-we-do-service service-style-3">
    //   <div className="icon">
    //     <span>
    //       {data?.Feature_Image?.url && (
    //         <Image
    //           src={`${BACKEND_URL}${data?.Feature_Image?.url}`}
    //           alt=""
    //           width="47"
    //           height="47"
    //         />
    //       )}
    //     </span>
    //   </div>
    //   <div className="our-services-info">
    //     <h6>{data?.Title}</h6>
    //     <p>{data?.Short_Description}</p>
    //     {/* <Link
    //       href={`service/${data?.Slug}`}
    //       className={
    //         btn
    //           ? "btn btn-secondary btn-style-3"
    //           : "btn btn-primary btn-style-3"
    //       }
    //     >
    //       {btn ? contentConfig.LEARN_MORE : contentConfig.READ_MORE}
    //     </Link> */}

    //     <Link
    //       href={`/service/${data?.Slug}`}
    //       className="btn btn-secondary btn-style-3"
    //     >
    //       Learn more
    //     </Link>
    //   </div>
    // </div>
    <div className="what-we-do-service service-style-3">
      <div className="icon">
        {console.log(data?.Feature_Image?.url, "this is for image")}

        <span>
          {data?.Feature_Image?.url && (
            <Image
              src={`${BACKEND_URL}${data?.Feature_Image?.url}`}
              alt=""
              width="47"
              height="47"
            />
          )}
        </span>
      </div>
      <div className="our-services-info">
        <h6>{data?.Title}</h6>
        <p>{data?.Short_Description}</p>
        <Link
          href={`/service/${data?.Slug}`}
          className="btn btn-primary btn-style-3"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default ServiceGrid;
