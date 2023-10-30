/**
 * @swagger
 * components:
 *   schemas:
 *     Site:
 *       type: object
 *       required:
 *         - siteId
 *         - siteName
 *         - contactEmail
 *         - contactName
 *       properties:
 *         siteId:
 *           type: integer
 *           description: The site ID
 *           minimum: 1
 *         siteName:
 *           type: string
 *           description: The site name
 *         contactEmail:
 *           type: string
 *           description: The site contact e-mail
 *         contactName:
 *           type: string
 *           description: The site contact name
 *       example:
 *         siteId: 1
 *         siteName: Product Management
 *         contactEmail: "peter.vogel@phvis.com"
 *         contactName: "Peter Vogel"
 */

/**
 * @swagger
 * tags:
 *   name: Site Management
 *   description: The sites managing API
 * /api/siteinfo/{id}:
 *   get:
 *     summary: Returns the site with the specified ID
 *     tags: [Site Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The site ID
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: The site details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 */

import { Request, Response, Router } from "express";
import { fetchSiteBySiteId } from "../repository/siteRepository.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const siteId = Number(req.params.id);
  const site = await fetchSiteBySiteId(siteId);

  res.json(site);
});

export default router;
