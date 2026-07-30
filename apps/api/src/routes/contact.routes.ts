import { Router } from "express";
import { contactBodySchema } from "@app/shared";
import { submitContact } from "../controllers/contact.controller";
import { contactSubmissionLimit } from "../middlewares/authRateLimits";
import { requireTrustedOrigin } from "../middlewares/origin";
import { validateBody } from "../middlewares/validate";

export const contactRoutes = Router();

contactRoutes.post(
	"/",
	requireTrustedOrigin,
	contactSubmissionLimit,
	validateBody(contactBodySchema),
	submitContact,
);
