import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const BlogGrid = ({ data }) => {
  

  return (
    <div className="blog-grid-style-3">
      <div className="blog-img">
        <Link href={`blog/${data?.Slug}`}>
          <Image
            src={`${BACKEND_URL}${data?.Image?.url}`}
            alt=""
            width="278"
            height="222"
          />
        </Link>
        <div className="blog-date">{data?.createdAtFormatted}</div>
      </div>
      <div className="blog-info">
        {/* <div className="blog-admin-info">
          <i className="fa-solid fa-user"></i> Admin - <span>3</span> comments
        </div> */}
        <h6>
          <Link href={`blog/${data?.Slug}`}>{data.Title}</Link>
        </h6>
        <p>{data?.Short_Description}</p>
        <Link href={`blog/${data?.Slug}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogGrid;
