// pages/swagger/index.jsx
import Head from "next/head";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Swagger = () => {
  return (
    <div>
      <Head>
        <title>NextJS Movie API</title>
        <meta name="description" content="NextJS Movie API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SwaggerUI url="/api/doc" />
    </div>
  );
};
export default Swagger;
