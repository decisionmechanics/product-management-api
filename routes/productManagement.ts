/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - inStock
 *         - lastDelivery
 *       properties:
 *         productId:
 *           type: integer
 *           description: The product ID
 *         productName:
 *           type: string
 *           description: The product name
 *         inStock:
 *           type: boolean
 *           description: Whether the product is in stock
 *         lastDelivery:
 *           type: string
 *           format: date
 *           description: The date of the last delivery
 *         totalQuantity:
 *           type: integer
 *           description: The total quantity of the product
 *       example:
 *         productId: 109
 *         productName: Widget
 *         inStock: true
 *         lastDelivery: 2023-10-26
 *         totalQuantity: 100
 */

/**
 * @swagger
 * tags:
 *   name: Product Management
 *   description: The products managing API
 * /api/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Product Management]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Creates a new product
 *     tags: [Product Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /api/products/{id}:
 *   get:
 *     summary: Returns the project with the specified ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The product ID
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   put:
 *     summary: Updates the product with the specified ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The product ID
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   delete:
 *     summary: Deletes the product with the specified ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The product ID
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

import { Request, Response, Router } from "express";
import {
  addProduct,
  deleteProduct,
  fetchProductByProductId,
  fetchProducts,
  updateProduct,
} from "../repository/productRepository.js";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  const warehouses = await fetchProducts();

  res.json(warehouses);
});

router.get("/:id", async (req: Request, res: Response) => {
  const productId = parseFloat(req.params.id);
  const product = await fetchProductByProductId(productId);

  res.json(product);
});

router.post("/", async (req: Request, res: Response) => {
  console.log("product body", req.body);

  const product = await addProduct(req.body);

  console.log("product", product);

  res.status(201).json(product);
});

router.put("/", async (req: Request, res: Response) => {
  const warehouse = await updateProduct(req.body);

  res.json(warehouse);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const warehouseId = parseFloat(req.params.id);
  const warehouse = await deleteProduct(warehouseId);

  res.json(warehouse);
});

export default router;
