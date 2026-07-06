import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const FeatureBlogGrid = ({ data, count }) => {
  return (
    <div className="blog-grid-style-2">
      <div className="blog-img">
        <Link href={`blog/${data?.Slug}`}>
          <Image
            src={`${BACKEND_URL}${data?.Image?.url}`}
            alt=""
            width={count === 0 ? 605 : 271}
            height={count === 0 ? 351 : 310}
          />
        </Link>
      </div>
      <div className="blog-info">
        <div className="blog-date">
          <span className="btn btn-secondary btn-style-2">
            {data?.createdAtFormatted}
          </span>
          <p>by {data?.Author?.name}</p>
        </div>
        <h5>
          <Link href={`blog/${data?.Slug}`}>{data?.Title}</Link>
        </h5>
        <p>{data?.Short_Description}</p>
      </div>
    </div>
  );
};

export default FeatureBlogGrid;
