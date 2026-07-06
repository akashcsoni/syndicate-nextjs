import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const TestimonialGrid = ({ data }) => {
  return (
    <div className="testimonial-item-box">
      <div className="avatar-img">
        <Link href="/testimonial">
          <Image
            src={`${BACKEND_URL}${data?.Image?.url}`}
            alt=""
            width="64"
            height="64"
          />
        </Link>
      </div>

      <div className="testimonial-user">
        <h6>
          <Link href="/testimonial">{data?.Name}</Link>
        </h6>
        <span>{data?.Position}</span>
        <p>{data?.Description}</p>
      </div>
    </div>
  );
};

export default TestimonialGrid;
