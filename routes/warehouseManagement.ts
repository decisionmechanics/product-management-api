/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - country
 *       properties:
 *         street:
 *           type: string
 *           description: The street
 *           minLength: 5
 *           maxLength: 50
 *         city:
 *           type: string
 *           description: The city
 *           minLength: 5
 *           maxLength: 25
 *         country:
 *           type: string
 *           description: The country
 *           minLength: 2
 *           maxLength: 25
 *       example:
 *         street: 123 Main Street
 *         city: Anytown
 *         country: USA
 *     InventoryTransaction:
 *       type: object
 *       required:
 *         - transactionId
 *         - productId
 *         - warehouseId
 *         - transactionType
 *         - amount
 *       properties:
 *         transactionId:
 *           type: integer
 *           description: The transaction ID
 *         productId:
 *           type: integer
 *           description: The product ID
 *         warehouseId:
 *           type: integer
 *           description: The warehouse ID
 *         transactionType:
 *           type: string
 *           enum: [AddStock, RemoveStock]
 *           description: The transaction type
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *       example:
 *         transactionId: 1
 *         productId: 109
 *         warehouseId: 1
 *         transactionType: "AddStock"
 *         amount: 10
 *     Warehouse:
 *       type: object
 *       required:
 *         - warehouseId
 *         - productId
 *         - warehouseName
 *         - international
 *         - address
 *         - qoh
 *       properties:
 *         warehouseId:
 *           type: integer
 *           description: The warehouse ID
 *           minimum: 1
 *         productId:
 *           type: integer
 *           description: The product ID
 *         warehouseName:
 *           type: string
 *           description: The warehouse name
 *           minLength: 5
 *           maxLength: 25
 *         international:
 *           type: boolean
 *           description: Whether the warehouse is outside the US
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         qoh:
 *           type: integer
 *           description: The quantity on hand
 *           minimum: 0
 *           maximum: 1000000
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InventoryTransaction'
 *       example:
 *         warehouseId: 1
 *         productId: 109
 *         warehouseName: Eastern US
 *         international: false
 *         address:
 *           street: 63 Overlea
 *           city: Pittsburgh
 *           country: USA
 *         qoh: 15
 *         transactions:
 *           - transactionId: 1
 *             productId: 109
 *             warehouseId: 1
 *             transactionType: "AddStock"
 *             amount: 10
 */

/**
 * @swagger
 * tags:
 *   name: Warehouse Management
 *   description: The warehouse managing API
 * /api/warehouses:
 *   get:
 *     summary: Returns the list of all the warehouses
 *     tags: [Warehouse Management]
 *     responses:
 *       200:
 *         description: The list of the warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *   post:
 *     summary: Creates a new warehouse
 *     tags: [Warehouse Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       201:
 *         description: The warehouse was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       422:
 *         description: Some warehouse properties are missing or invalid
 * /api/warehouses/{id}:
 *   get:
 *     summary: Returns the warehouse with the specified ID
 *     tags: [Warehouse Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The warehouse ID
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: The warehouse details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *   put:
 *     summary: Updates the warehouse with the specified ID
 *     tags: [Warehouse Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The warehouse ID
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       200:
 *         description: The warehouse was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       422:
 *         description: Some warehouse properties are missing or invalid
 *   delete:
 *     summary: Deletes the warehouse with the specified ID
 *     tags: [Warehouse Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The warehouse ID
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: The warehouse was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 * /api/warehouses/transactions:
 *   post:
 *     summary: Creates a new inventory transaction
 *     tags: [Warehouse Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryTransaction'
 *     responses:
 *       201:
 *         description: The inventory transaction was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryTransaction'
 *       404:
 *         description: Product ID doesn't exist
 *       422:
 *         description: Some inventory transaction properties are missing or invalid
 */

import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import {
  addWarehouse,
  deleteWarehouse,
  fetchWarehouses,
  fetchWarehouseByWarehouseId,
  updateWarehouse,
  transact,
} from "../repository/warehouseRepository.js";
import { fetchProductByProductId } from "../repository/productRepository.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const warehouses = await fetchWarehouses();

  res.json(warehouses);
});

router.get("/:id", async (req: Request, res: Response) => {
  const warehouseId = parseFloat(req.params.id);
  const warehouse = await fetchWarehouseByWarehouseId(warehouseId);

  res.json(warehouse);
});

router.post(
  "/",
  [
    check("warehouseId", "warehouse ID must be >= 1").isInt({ min: 1 }),
    check("productId", "product ID must be >= 1").isInt({ min: 1 }),
    check("warehouseName", "warehouse name must be between 5 and 25 characters")
      .notEmpty()
      .isLength({ min: 5, max: 25 }),
    check("address", "address must be supplied").notEmpty(),
    check("address.street", "street must be between 5 and 50 characters")
      .notEmpty()
      .isLength({ min: 5, max: 50 }),
    check("address.city", "city must be between 5 and 25 characters")
      .notEmpty()
      .isLength({ min: 5, max: 25 }),
    check("address.country", "country must be between 2 and 25 characters")
      .notEmpty()
      .isLength({ min: 2, max: 25 }),
    check("qoh", "quantity on hand must be between 0 and 1m").isInt({
      min: 0,
      max: 1_000_000,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });

      return;
    }

    const warehouse = await addWarehouse(req.body);

    res.status(201).json(warehouse);
  }
);

router.put(
  "/",
  [
    check("warehouseId", "warehouse ID must be >= 1").isInt({ min: 1 }),
    check("productId", "product ID must be >= 1").isInt({ min: 1 }),
    check("warehouseName", "warehouse name must be between 5 and 25 characters")
      .notEmpty()
      .isLength({ min: 5, max: 25 }),
    check("address", "address must be supplied").notEmpty(),
    check("address.street", "street must be between 5 and 50 characters")
      .notEmpty()
      .isLength({ min: 5, max: 50 }),
    check("address.city", "city must be between 5 and 25 characters")
      .notEmpty()
      .isLength({ min: 5, max: 25 }),
    check("address.country", "country must be between 2 and 25 characters")
      .notEmpty()
      .isLength({ min: 2, max: 25 }),
    check("qoh", "quantity on hand must be between 0 and 1m").isInt({
      min: 0,
      max: 1_000_000,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });

      return;
    }

    const warehouse = await updateWarehouse(req.body);

    res.json(warehouse);
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const warehouseId = parseFloat(req.params.id);
  const warehouse = await deleteWarehouse(warehouseId);

  res.json(warehouse);
});

router.post(
  "/transactions",
  [
    check("warehouseId", "warehouse ID must be >= 1").isInt({ min: 1 }),
    check("productId", "product ID must be >= 1").isInt({ min: 1 }),
    check("transactionType", "transaction type must be AddStock").equals(
      "AddStock"
    ),
    check("amount", "amount must be between 0 and 1m").isInt({
      min: 0,
      max: 1_000_000,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });

      return;
    }

    const warehouseId = Number(req.body.warehouseId);
    const productId = Number(req.body.productId);

    const product = await fetchProductByProductId(productId);

    if (!product) {
      res.status(404).json({
        errors: [
          {
            value: req.body.productId,
            msg: "product doesn't exist",
            param: "productId",
            location: "body",
          },
        ],
      });

      return;
    }

    const transaction = await transact(req.body);

    res.status(201).json(transaction);
  }
);

export default router;
