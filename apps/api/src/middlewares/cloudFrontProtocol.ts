import type { RequestHandler } from "express";
import { env } from "../config/env";

export const trustCloudFrontProtocol: RequestHandler = (req, _res, next) => {
	const viewerProtocol = req.get("cloudfront-forwarded-proto");

	if (
		env.NODE_ENV === "production" &&
		(viewerProtocol === "http" || viewerProtocol === "https")
	) {
		req.headers["x-forwarded-proto"] = viewerProtocol;
	}

	next();
};
