import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import productManagementRouter from "./routes/productManagement.js";
import siteManagementRouter from "./routes/siteManagement.js";
import warehouseManagementRouter from "./routes/warehouseManagement.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

const swaggerSpecification = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Product Management API",
      version: "0.1.0",
      description:
        "This is simple inventory management system for a small company. It allows you to manage products, warehouses, and sites.",
      contact: {
        name: "Andrew Tait",
        url: "https://decisionmechanics.com",
        email: "Andrew.Tait@decisionmechanics.com",
      },
    },
    externalDocs: {
      description: "swagger.json",
      url: "/swagger.json",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./dist/routes/*.js"],
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecification, {
    explorer: true,
  })
);

app.use("/api/siteinfo", siteManagementRouter);
app.use("/api/warehouses", warehouseManagementRouter);
app.use("/api/products", productManagementRouter);

app.get("/swagger.json", (_, res) => {
  res.json(swaggerSpecification);
});

app.get("/", (_: Request, res: Response) => {
  res.send("Product Management API");
});

app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
