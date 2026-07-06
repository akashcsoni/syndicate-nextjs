import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";

const GetAgent = ({ data }) => {
  return (
    <section className="image-with-text-overlay-section content__item">
      <div className="image-overlay-full item-overflow">
        <Image
          src={`${BACKEND_URL}${data?.Image?.url}`}
          alt=""
          className="content-item-zoom"
          width="1835"
          height="445"
        />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="image-text-overlay content-item-y">
              <h2 className="title">{data?.Title}</h2>
              <Link
                href={data?.Button_Link}
                className="btn btn-secondary btn-style-3"
              >
                {data?.Button_Title} <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="call-action-quote">
              <div className="phone-icon">
                <Image
                  src="/assets/images/phone-icon-primary.svg"
                  alt="phone icon"
                  width={51}
                  height={51}
                />
              </div>
              <div className="call-info">
                <p>
                  {data?.Contact_Title}
                  <br />
                  Call:{" "}
                  <Link href={`tel:${data?.Contact_Number}`}>
                    {data?.Contact_Number}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAgent;
