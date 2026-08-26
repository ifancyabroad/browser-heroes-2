import express from "express";
import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { env } from "../config/env";
import { trustCloudFrontProtocol } from "./cloudFrontProtocol";

const originalNodeEnv = env.NODE_ENV;

afterEach(() => {
	env.NODE_ENV = originalNodeEnv;
});

function buildProtocolApp() {
	const app = express();
	app.set("trust proxy", 1);
	app.use(trustCloudFrontProtocol);
	app.get("/", (req, res) => res.json({ protocol: req.protocol, secure: req.secure }));
	return app;
}

describe("trustCloudFrontProtocol", () => {
	it("uses CloudFront's viewer protocol in production", async () => {
		env.NODE_ENV = "production";

		const response = await request(buildProtocolApp())
			.get("/")
			.set("CloudFront-Forwarded-Proto", "https")
			.expect(200);

		expect(response.body).toEqual({ protocol: "https", secure: true });
	});

	it("ignores unsupported protocol values", async () => {
		env.NODE_ENV = "production";

		const response = await request(buildProtocolApp())
			.get("/")
			.set("CloudFront-Forwarded-Proto", "ftp")
			.expect(200);

		expect(response.body).toEqual({ protocol: "http", secure: false });
	});

	it("does not trust the CloudFront header outside production", async () => {
		env.NODE_ENV = "development";

		const response = await request(buildProtocolApp())
			.get("/")
			.set("CloudFront-Forwarded-Proto", "https")
			.expect(200);

		expect(response.body).toEqual({ protocol: "http", secure: false });
	});
});
