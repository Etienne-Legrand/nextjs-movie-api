import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  apiFolder: "pages/api",
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NextJS Swagger Movie API",
      version: "1.0",
    },
  },
});
export default swaggerHandler();
