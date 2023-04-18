import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components/export";
import { client } from "../lib/client";

export default function Home({ product, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>best selling product</h2>
        <p>speaker of many variations</p>
      </div>
      <div key={product._id} className="products-container">
        {product?.map((p) => (
          <Product key={p._id} product={p} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const product = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      product,
      bannerData,
    },
  };
};
