import themeConfig, { BACKEND_URL } from '@/config/themeConfig';
import { fetchStrapiPage } from '@/utils/Api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Error = ({ data, slug }) => {
    const [error, setError] = useState(null);


    useEffect(() => {
        const getError = async () => {
            try {
                const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
                    slug: slug,
                    block: data?.name,
                    id: data?.id,
                });
                setError(resdata?.data);
            } catch (error) {
                console.error(error);
            }
        };
        getError();
    }, [slug, data?.id, data?.name]);
    console.log(error);
    
    return (
        <>
            <section className="not-found-page inner-wrapper">

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="not-found-content">
                                {console.log(error?.Image)
                                }
                                {error?.Image?.url &&

                                    <Image src={`${BACKEND_URL}${error?.Image?.url}`}
                                        width={error?.width || 500}
                                        height={error?.height || 500}
                                        alt="404 error img"
                                    />
                                }

                                <div className="not-found-info">
                                    <h2 className="title">{error?.Title}</h2>
                                    <p>{error?.Short_Description}</p>
                                    <Link href={error?.Button_Link || "/"} className="btn btn-secondary btn-style-2">{error?.Button_Name}</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error
