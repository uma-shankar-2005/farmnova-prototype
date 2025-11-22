import React from "react";
import { Helmet } from "react-helmet";
const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {/* Add more meta tags as needed */}
  </Helmet>
);
export default SEO;
