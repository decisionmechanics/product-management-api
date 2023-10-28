# Product Management API

This is a port of the product management Web API app from course 2316 to TypeScript (from C#).

To install and run

```bash
npm install
npm run dev
```

To view the OpenAPI documentation, browse to

```
http://localhost:8080/api-docs/
```

The app is also packaged as a Docker image. To run it

```bash
docker run -p 8080:8080 -d --name product-management-api --rm andrewtait/product-management-api
```
