import contentConfig from "@/config/contentConfig";
import { GlobalIcon } from "@/config/GlobalIcon";
import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const TeamGrid = ({ data }) => {
  return (
    <div className="team-members-box">
      <div className="team-members-img">
        <Link href={`team/${data?.Slug}`}>
          <Image
            src={`${BACKEND_URL}${data?.Image?.url}`}
            alt=""
            width={293}
            height={234}
          />
        </Link>
      </div>

      <div className="team-members-info">
        <span className="founder">{data?.Position}</span>
        <h6>
          <Link href={`team/${data?.Slug}`}>{data?.Name}</Link>
        </h6>
        <p>{data?.Short_Description}</p>

        <ul className="social-link">
          {contentConfig?.Team_Icon &&
            contentConfig?.Team_Icon?.map((icon, index) => {
              return (
                <li key={index}>
                  <Link href={icon?.link}>
                    <GlobalIcon name={icon?.name} />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TeamGrid;
