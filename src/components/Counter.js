import themeConfig from '@/config/themeConfig';
import { fetchStrapiPage } from '@/utils/Api';
import React, { useEffect, useState } from 'react'

const Counter = ({ data, slug }) => {
    const [counter, setCounter] = useState(null);


    useEffect(() => {
        const getCounter = async () => {
            try {
                const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
                    slug: slug,
                    block: data?.name,
                    id: data?.id,
                });
                setCounter(resdata?.data);
            } catch (error) {
                console.error(error);
            }
        };
        getCounter();
    }, [slug, data?.id, data?.name]);

    return (
        <>
            <section className="our-sucess-section-style-2" id="counter">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="our-sucess-box-style-2">
                                <div className="row our-sucess-list">
                                    {counter?.Grid_Section?.map((data, index) => (
                                        <div className="col-6 col-md-3" key={index}>
                                            <div className="our-sucess-service">
                                                <h2><span className="counting" data-count="200">{data?.Count}</span>+</h2>
                                                <p>{data?.Title}</p>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Counter
