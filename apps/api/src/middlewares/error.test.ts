import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { errorHandler } from "./error";

function createResponse() {
	const json = vi.fn();
	const status = vi.fn(() => ({ json }));

	return {
		response: { status } as unknown as Response,
		status,
		json,
	};
}

describe("errorHandler", () => {
	it("retains intentional client error messages", () => {
		const { response, status, json } = createResponse();
		const error = Object.assign(new Error("Not Found"), { status: 404 });

		errorHandler(error, {} as Request, response, vi.fn() as NextFunction);

		expect(status).toHaveBeenCalledWith(404);
		expect(json).toHaveBeenCalledWith({ error: "Not Found" });
	});

	it("logs server errors without exposing their details", () => {
		const { response, status, json } = createResponse();
		const error = new Error("database connection failed at internal-host");
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

		errorHandler(error, {} as Request, response, vi.fn() as NextFunction);

		expect(status).toHaveBeenCalledWith(500);
		expect(json).toHaveBeenCalledWith({ error: "INTERNAL_SERVER_ERROR" });
		expect(consoleError).toHaveBeenCalledWith(error);
		consoleError.mockRestore();
	});

	it("also hides details from errors with an explicit server status", () => {
		const { response, status, json } = createResponse();
		const error = Object.assign(new Error("upstream service credentials rejected"), {
			status: 503,
		});
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

		errorHandler(error, {} as Request, response, vi.fn() as NextFunction);

		expect(status).toHaveBeenCalledWith(503);
		expect(json).toHaveBeenCalledWith({ error: "INTERNAL_SERVER_ERROR" });
		expect(consoleError).toHaveBeenCalledWith(error);
		consoleError.mockRestore();
	});
});
