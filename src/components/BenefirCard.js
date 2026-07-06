import { BACKEND_URL } from "@/config/themeConfig";
import Image from "next/image";

const BenefirCard = ({ data }) => {
  return (
    <section className="inner-image-with-text-section content__item">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 pe-md-4">
            <div className="inner-image-box item-overflow">
              {data?.Image?.url &&

                <Image
                  src={`${BACKEND_URL}${data?.Image?.url}`}
                  alt=""
                  className="content-item-zoom"
                  width={599}
                  height={642}
                />
              }
              <div className="d-none content-item-y">d none</div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-with-text-content">
              <h5 className="sub-title">{data?.Hero_Tag}</h5>
              <h2 className="title">{data?.Hero_Title}</h2>
              <p>{data?.Hero_Description}</p>

              <ul className="ul-list">
                {data?.Service_Grid_Section &&
                  data?.Service_Grid_Section?.map((item, index) => {
                    return <li key={index}>{item?.Title}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row icon-box-list">
          {data?.Grid_Section &&
            data?.Grid_Section?.map((item, index) => {
              return (
                <div className="col-6 col-sm-6 col-md-3" key={index}>
                  <div className="icon-box">
                    <span className="box-count">0{index + 1}</span>
                    <div className="icon">
                      {item?.Image?.url &&

                        <Image
                          src={`${BACKEND_URL}${item?.Image?.url}`}
                          alt=""
                          width={35}
                          height={35}
                        />
                      }
                    </div>
                    <h6>{item?.Title}</h6>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default BenefirCard;
