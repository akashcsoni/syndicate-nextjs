import contentConfig from "@/config/contentConfig";
import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const SingleBlogGrid = ({ data }) => {
  return (
    <div className="blog-grid">
      <div className="blog-grid-wrap">
        <div className="blog-img">
          <Link href={`blog/${data?.Slug}`}>
            <Image
              src={`${BACKEND_URL}${data?.Image?.url}`}
              alt=""
              width={399}
              height={399}
            />
          </Link>
        </div>
        <div className="blog-info">
          <h5>
            <Link href={`blog/${data?.Slug}`}>{data?.Title}</Link>
          </h5>
          <p>{data?.Short_Description}</p>
        </div>
      </div>
      <div className="read-more-btn">
        <Link href={`blog/${data?.Slug}`} className="btn btn-primary">
          {contentConfig.READ_MORE}
        </Link>
      </div>
    </div>
  );
};

export default SingleBlogGrid;
